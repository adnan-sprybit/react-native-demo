import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchApi } from '../config/apiUtil';
import { BaseSettings, DefaultImage } from '../config/BaseSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageGalleryModal from './ImageGalleryModal';

const width = Dimensions.get('window').width;
const isWeb = Platform.OS === 'web';
export default function AddUpdateModal(props) {
  const {
    visible,
    onCloseModal,
    type,
    ItemDetails,
    onUpdateSuccess,
    onAddSuccess,
  } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(false);
  const [rating, setRating] = useState('');
  const [photo, setPhoto] = useState(DefaultImage);
  const [isVisibleImageGallery, setIsVisibleImageGallery] = useState(false);

  useEffect(() => {
    let isUpdate = type !== 'add';
    if (isUpdate) {
      setName(ItemDetails.name);
      setDescription(ItemDetails.description);
      setPrice(ItemDetails.price.toString());
      setCategory(ItemDetails.category);
      setInStock(ItemDetails.inStock);
      setRating(ItemDetails.rating.toString());
      setPhoto(ItemDetails?.image);
    }
  }, [ItemDetails, type]);

  const handleSubmit = () => {
    // Validate the form data before submitting
    if (!name || !description || !price || !category || rating === '') {
      alert('Please fill in all fields.');
      return;
    }

    const priceValue = parseInt(price);
    // Validate the rating
    if (isNaN(priceValue) || priceValue < 1) {
      alert('The price must be a number rather than 0');
      return;
    }

    // Convert rating to a number
    const ratingNumber = parseInt(rating);

    // Validate the rating
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      alert('Rating must be a number between 1 and 5.');
      return;
    }

    // Create an item object with the form data
    const newItem = {
      name,
      description,
      price,
      category,
      inStock,
      rating: ratingNumber,
      image: photo,
    };

    // Pass the new item to the onSubmit callback
    if (type === 'add') {
      addItem(newItem);
    } else {
      updateItem(newItem);
    }

    // Reset the form fields
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setInStock(false);
    setRating('');
  };

  const updateItem = async newItem => {
    fetchApi(
      'put',
      BaseSettings.endpoints.updateItem(ItemDetails.id),
      newItem,
      {
        Authorization: `Bearer a8e0930e`,
      },
    )
      .then(() => {
        onUpdateSuccess();
      })
      .catch(err => {
        console.log('🚀 ~ addItem ~ err:', err);
      });
  };

  const addItem = async newItem => {
    fetchApi('post', BaseSettings.endpoints.createItem, newItem, {
      Authorization: `Bearer a8e0930e`,
    })
      .then(() => {
        onAddSuccess();
      })
      .catch(err => {
        console.log('🚀 ~ addItem ~ err:', err);
      });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        style={{ flex: 1, backgroundColor: 'red' }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000070',
            alignItems: isWeb ? 'center' : 'flex-starts',
            justifyContent: 'center',
            padding: !isWeb && 16,
          }}>
          <View style={styles.modalView}>
            <Text style={styles.addNewItem}>
              {type === 'add' ? 'Add New Item' : 'Update Item'}
            </Text>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter name"
              placeholderTextColor={'gray'}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={text => setDescription(text)}
              placeholder="Enter description"
              placeholderTextColor={'gray'}
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              placeholder="Enter price"
              keyboardType="numeric"
              placeholderTextColor={'gray'}
            />

            <Text style={styles.label}>Category:</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={text => setCategory(text)}
              placeholder="Enter category"
              placeholderTextColor={'gray'}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.inStockLabel}>In Stock:</Text>
              <Switch
                value={inStock}
                onValueChange={value => setInStock(value)}
              />
            </View>

            <Text style={styles.label}>Rating:</Text>
            <TextInput
              style={styles.input}
              value={rating}
              onChangeText={text => setRating(text)}
              placeholder="Enter rating (1-5)"
              keyboardType="numeric"
              placeholderTextColor={'gray'}
            />

            {photo && (
              <View>
                <Image
                  source={{
                    uri: photo,
                  }}
                  style={styles.backgroundImage}
                />
              </View>
            )}

            <TouchableOpacity onPress={() => setIsVisibleImageGallery(true)}>
              <Text style={styles.chooseImageBtnText}>Choose image here</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.button, { marginEnd: 8, flex: 1 }]}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                  {type === 'add' ? 'Add Item' : 'Update Item'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  { marginStart: 8, flex: 1, backgroundColor: '#F44336' },
                ]}
                onPress={onCloseModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ImageGalleryModal
          visible={isVisibleImageGallery}
          onPressCancel={() => setIsVisibleImageGallery(false)}
          onSelectImage={item => {
            setPhoto(item);
            setIsVisibleImageGallery(false);
          }}
        />
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#00000080',
  },
  modalMainView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: Platform.OS == 'web' ? width / 2 : width,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: Platform.OS == 'web' ? 32 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addNewItem: {
    color: '#273361',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    width: '100%',
    marginBottom: 4,
    textAlign: 'left',
    color: '#000000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: Platform.OS == 'web' ? width / 2.3 : width / 1.3,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3F51B5',
    padding: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  inStockLabel: {
    fontSize: 16,
    color: '#000000',
    marginEnd: 16,
  },
  UploadImageMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ChooseImageBtn: {
    backgroundColor: '#dedcdc',
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 16,
    resizeMode: 'contain',
  },
  backgroundImage: {
    height: 45,
    width: '93%',
    resizeMode: 'contain',
  },
  chooseImageBtnText: {
    color: '#58a2db',
    fontSize: 18,
    fontWeight: '500',
  },
});