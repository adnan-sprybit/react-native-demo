import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DefaultImage} from '../config/BaseSettings';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//This will be used for image popup display
const isWeb = Platform.OS === 'web';
export default function FlexImageModal(props) {
  const {visible, onPressCancel, imageUrl} = props;

  return (
    <View style={styles.centeredView}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        style={{flex: 1, backgroundColor: 'red'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000070',
            alignItems: isWeb ? 'center' : 'flex-starts',
            justifyContent: 'center',
            padding: !isWeb && 16,
          }}>
          <TouchableOpacity style={[styles.button]} onPress={onPressCancel}>
            <Text style={styles.buttonText}>❌</Text>
          </TouchableOpacity>
          <View style={styles.modalView}>
            <Image
              source={{uri: imageUrl ? imageUrl : DefaultImage}}
              style={{
                height: windowHeight,
                width: windowWidth,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#00000080',
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    right: 0,
    top: 0,
    margin: 15,
    width: 35,
    height: 35,
    padding: 8,
    zIndex: 8,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
