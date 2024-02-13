// Import necessary libraries
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { fetchApi } from '../config/apiUtil';
import { BaseSettings, DefaultImage } from '../config/BaseSettings';
import FlexImageModal from '../components/FlexImageModal';

// Detail screen component
const ItemDetailScreen = ({ route }) => {
  const { itemID } = route.params;
  const [itemDetails, setItemDetails] = useState({});
  const [isImageShow, setIsImageShow] = useState(false);

  useEffect(() => {
    getItemDetails();
  }, []);

  //This function shows details of perticular item
  const getItemDetails = async () => {
    fetchApi(
      'get',
      BaseSettings.endpoints.getItemDetails(itemID),
      {},
      {
        Authorization: `Bearer a8e0930e`,
      },
    )
      .then(res => {
        setItemDetails(res);
      })
      .catch(err => {
        console.log('🚀 ~ getItemDetails ~ err:', err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
        <TouchableOpacity onPress={() => setIsImageShow(true)}>
          <Image
            source={{
              uri: itemDetails?.image ? itemDetails?.image : DefaultImage,
            }}
            style={{
              width: 100,
              height: 100,
              marginTop: 15,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          {itemDetails?.name ? (
            <>
              <Text style={styles.title}>{itemDetails?.name}</Text>
              <Text style={styles.price}>Price: {itemDetails?.price}</Text>
              <Text style={styles.description}>{itemDetails?.description}</Text>
              <Text style={styles.shipping}>{itemDetails?.category}</Text>
              <Text style={styles.inStock}>
                {itemDetails?.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
              <Text style={styles.rating}>Rating: {itemDetails?.rating}</Text>
            </>
          ) : (
            <Text>No Detail Found</Text>
          )}
        </View>
      </View>
      <FlexImageModal
        visible={isImageShow}
        imageUrl={itemDetails?.image}
        onPressCancel={() => {
          setIsImageShow(false);
        }}
      />
    </ScrollView>
  );

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8EAF6',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  shipping: {
    fontSize: 16,
    color: '#28a745',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  inStock: {
    fontSize: 16,
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#f39c12', // Orange color for rating
    marginBottom: 8,
  },
});


export default ItemDetailScreen;
