import {
  Dimensions,
  FlatList,
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

const ImageList = [
  'https://media.istockphoto.com/id/1392794266/photo/dark-and-moody-blue-ocean-wave-crashing-into-sea.jpg?s=1024x1024&w=is&k=20&c=so5o6eK2MdUIFi8ZaovFH0lvmNQoAWQgqf4blERKZZk=',
  'https://media.istockphoto.com/id/1373234500/photo/close-up-detail-of-powerful-teal-blue-wave-breaking-in-open-ocean-on-a-bright-sunny-afternoon.jpg?s=612x612&w=0&k=20&c=I2Qq26bvRM8-GcAOi3xH2ie1972lldnp6DEwXW0g8hU=',
  'https://media.istockphoto.com/id/1455038582/photo/rain-drop.jpg?s=1024x1024&w=is&k=20&c=mvnF49jBxzMW0vAhm35lhF2PraoOX6PcemprgF4liwI=',
  'https://media.istockphoto.com/id/943359068/photo/water-splash-with-bubbles-air-water-wave.jpg?s=612x612&w=0&k=20&c=kqV5kodR51N7nxAh_Wd_uSnkJnlGIB8jc6Pf0KjbFJY=',
  'https://media.istockphoto.com/id/1400648314/photo/powerful-storm-generated-ocean-swell-exploding-dangerously-on-the-shoreline-with-soft-golden.jpg?s=1024x1024&w=is&k=20&c=a49K1yanHPh0ckd-fJbEgNU6Qw9HpwmXIsQ9lEjTXVw=',
  'https://media.istockphoto.com/id/1403278751/photo/abstract-particle-background.jpg?s=1024x1024&w=is&k=20&c=qz3fhoupejTDCu9yywrPN2J7JB2BmJqjIe7fiseUKco=',
];

const width = Dimensions.get('window').width;

//This function gives multiple image galary
const isWeb = Platform.OS === 'web';
const ImageGalleryModal = props => {
  const {visible, onSelectImage, onPressCancel} = props;
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
            <Text style={styles.selectImageText}>Select Image</Text>

            <FlatList
              data={ImageList}
              numColumns={2}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity onPress={() => onSelectImage(item)}>
                      <Image
                        source={{uri: item ? item : DefaultImage}}
                        style={styles.listImage}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageGalleryModal;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#00000080',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: Platform.OS == 'web' ? 32 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 10,
  },
  button: {
    right: 0,
    top: 0,
    margin: 15,
    width: 35,
    height: 35,
    zIndex: 8,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
  },
  buttonText: {
    color: '#fff',
    left: isWeb ? 1 : 0,
    bottom: isWeb ? 1 : 0,
  },
  listImage: {
    width: isWeb ? 200 : width / 2 - 40,
    height: 200,
    resizeMode: 'contain',
    margin: 5,
  },
  selectImageText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
  },
});
