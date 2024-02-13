import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const isWeb = Platform.OS === 'web';
export default function ConfirmPopupModal(props) {
  const {visible, onPressOk, onPressCancel} = props;

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
          <View style={styles.modalView}>
            <Text style={styles.addNewItem}>Alert</Text>
            <Text style={styles.label}>
              Are you sure you want to delete this item?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                style={[styles.button, {marginEnd: 8, flex: 1}]}
                onPress={onPressOk}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  {marginStart: 8, width: 150, backgroundColor: '#F44336'},
                ]}
                onPress={onPressCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  button: {
    backgroundColor: '#3F51B5',
    padding: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: 150,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
