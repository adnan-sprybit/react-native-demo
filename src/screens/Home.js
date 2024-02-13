import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions
} from 'react-native';
import React, { useEffect, useState,useMemo } from 'react';
import ItemContainer from '../components/ItemContainer';
import AddUpdateModal from '../components/AddUpdateModal';
import { BaseSettings } from '../config/BaseSettings';
import { fetchApi } from '../config/apiUtil';
import ConfirmPopupModal from '../components/ConfirmPopupModal';

const window = Dimensions.get('window').width;

export default function Home({ navigation, route }) {
  const { width } = useWindowDimensions();
  //below parameter is used for user permissions
  const { isUser } = route.params;
  const [showAddModal, setshowAddModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [filteredList, setfilteredList] = useState([]);
  const [modalType, setmodalType] = useState('add');
  const [selectedItem, setselectedItem] = useState({});
  const [searchValue, setsearchValue] = useState('');
  const [isVisibleConfirm, setisVisibleConfirm] = useState({ isVisible: false, value: '' });

  const numCol = useMemo(() => {
    return width >= 689 ? 2 : 1;
  }, [width]);

  useEffect(() => {
    getItem();
  }, []);

  //This function fetches data
  const getItem = async () => {

    fetchApi(
      'get',
      BaseSettings.endpoints.getItemList,
      {},
      {
        Authorization: `Bearer a8e0930e`,
      },
    )
      .then(res => {
        setItemList(res);
        setfilteredList(res);
      })
      .catch(err => {
        console.log('🚀 ~ getItem ~ err:', err);
      });
  };

  //This function invokes delete item
  const deleteItem = async id => {
    fetchApi(
      'delete',
      BaseSettings.endpoints.deleteItem(id),
      {},
      {
        Authorization: `Bearer a8e0930e`,
      },)
      .then(res => {
        setisVisibleConfirm({ isVisible: false, value: '' });
        getItem();
      })
      .catch(err => {
        console.log('🚀 ~ getItem ~ err:', err);
      });
  };

  useEffect(() => {
    //Search item withing state value
    const filteredData = itemList.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    const displayData = searchValue === '' ? itemList : filteredData;
    setfilteredList(displayData);
  }, [searchValue]);

  return (
    <View style={styles.container}>
      <View style={styles.logout}>
        <TouchableOpacity
           style={[styles.buttonOuter, { width: width <= 689 ? '40%' : '10%' }]}
          onPress={() => {
            navigation.navigate('Login')
          }}>
          <Text style={styles.buttonTextOuter}>Logout</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.rowContainer}>
        <Text style={styles.screenTitle}>Item Listing</Text>
        {isUser && <TouchableOpacity
          style={[styles.button, { width: width <= 689 ? '40%' : '10%' }]}
          onPress={() => {
            setshowAddModal(true);
          }}>
          <Text style={styles.buttonText}>Add New Item</Text>
        </TouchableOpacity>}



      </View>
      <View style={styles.rowContainer}>
        <TextInput
          placeholder="Search"
          onChangeText={setsearchValue}
          style={styles.input}
          placeholderTextColor={'gray'}
        />
      </View>
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={numCol}
        key={numCol}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardView}>
              <ItemContainer
                ItemDetails={item}
                isVisible={isUser}
                onItemClick={() => {
                  navigation.navigate('ItemDetailScreen', { itemID: item.id });
                }}
                onDeletePress={() => {
                  setisVisibleConfirm({ isVisible: true, value: item?.id });
                }}
                onUpdatePress={() => {
                  setmodalType('update');
                  setselectedItem(item);
                  setshowAddModal(true);
                }}
              />
            </View>
          );
        }}
      />

      <AddUpdateModal
        visible={showAddModal}
        onCloseModal={() => {
          setshowAddModal(false);
          setmodalType('add');
          setselectedItem({});
        }}
        type={modalType}
        onAddSuccess={() => {
          setshowAddModal(false);
          getItem();
        }}
        onUpdateSuccess={() => {
          setshowAddModal(false);
          getItem();
          setmodalType('add');
          setselectedItem({});
        }}
        ItemDetails={selectedItem}
      />

      <ConfirmPopupModal
        visible={isVisibleConfirm.isVisible}
        onPressCancel={() => {
          setisVisibleConfirm({ isVisible: false, value: '' });
        }}
        onPressOk={() => {
          deleteItem(isVisibleConfirm.value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logout: {
    justifyContent: 'flex-end',
    alignItems: "flex-end"
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E8EAF6',
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: '#000000',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: 'green',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  buttonOuter:{
    borderColor: '#273361',
    borderWidth:1,
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: window >= 700 ? '40%' : '10%', // Adjust the width based on your preference
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#273361',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: window >= 700 ? '40%' : '10%', // Adjust the width based on your preference
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
  buttonTextOuter: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
  cardView: {
    flex: Platform.OS == 'web' ? 0.5 : 1,
    marginHorizontal: Platform.OS == 'web' ? 5 : 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 15,
  },
});
