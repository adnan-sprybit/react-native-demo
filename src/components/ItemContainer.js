import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DefaultImage} from '../config/BaseSettings';

export default function ItemContainer(props) {
  const {ItemDetails, onItemClick, onUpdatePress, onDeletePress, isVisible} =
    props;
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={onItemClick}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: ItemDetails?.image ? ItemDetails?.image : DefaultImage,
            }}
            style={{
              width: 80,
              height: 80,
              marginTop: 10,
              resizeMode: 'contain',
            }}
          />
          <View style={{marginLeft: 15, flex: 1}}>
            <Text style={styles.title}>{ItemDetails?.name}</Text>
            <Text style={styles.price}>₹: {ItemDetails?.price}</Text>
            <Text style={styles.description}>{ItemDetails?.description}</Text>
            <Text style={styles.category}>{ItemDetails?.category}</Text>
          </View>
        </View>
        {isVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {marginEnd: 8}]}
              onPress={onUpdatePress}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: '#F44336', marginStart: 8},
              ]}
              onPress={onDeletePress}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    paddingVertical: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    flex: 1,
    fontSize: 15,
    marginVertical: 8,
    marginRight: 20,
  },
  category: {
    fontSize: 16,
    color: 'green',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'flex-end',
    width: Platform.OS == 'web' ? '50%' : '100%',
  },
  button: {
    backgroundColor: '#3F51B5',
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
