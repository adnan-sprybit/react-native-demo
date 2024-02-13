import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {DefaultImage} from '../config/BaseSettings';

const CloudinaryImage = () => {
  const [photo, setPhoto] = useState(DefaultImage);

  const cloudinaryUpload = photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'ilehfdef');
    data.append('cloud_name', 'dm7wqfxnu');
    fetch('https://api.cloudinary.com/v1_1/dm7wqfxnu/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        setPhoto(data.secure_url);
      })
      .catch(err => {
        console.log(':::::::::::::::', err);
        alert('An Error Occured While Uploading');
      });
  };

  const selectPhotoTapped = async () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchImageLibrary(options);
    const response = result.assets[0];
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const uri = response.uri;
      const type = response.type;
      const name = response.fileName;
      const source = {
        uri,
        type,
        name,
      };
      cloudinaryUpload(source);
      console.log('Image ', source);
    }
  };
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={{uri: photo}} style={styles.backgroundImage} />
      </View>
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={selectPhotoTapped}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CloudinaryImage;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height / 2,
  },
  backgroundImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
    fontFamily: 'Roboto',
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
});
