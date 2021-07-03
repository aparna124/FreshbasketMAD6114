import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';

class ProductList extends React.Component {
  state = { products: ''}

  initCategory() {
    console.log("initProducts")
    const db = firebaseApp.firestore();
    const storage = firebaseApp.storage();
    
    var products = [];
    var dataPromisies = [];
    db.collection("products").get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        dataPromisies.push(
          storage.ref(doc.data().image).getDownloadURL().then((url) => {
            products = [ ...products, { id: doc.id, imagePath: url, ...doc.data() }];
          }).catch(() => {
            products = [ ...products, { id: doc.id, ...doc.data() }];
          })
        );
      })
      Promise.all(dataPromisies).then(() => {
        this.setState({products: products})
      })  
    });
  }

  componentDidMount(){
    this.initCategory()
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <FlatList
          data={this.state.products}
          extraData={this.state}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('ProductDetail')}>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>$ 2.5</Text>
              {/* <Ionicons style={styles.rightIcon} name="add-outline" size={24} color="black" /> */}
              <Button style={styles.button} title="Add" color='#2ECC71' />
            </TouchableOpacity>
          )}/>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  safeAreaViewStyle: {
    width: '100%',
  },
  item: {
    padding: 15,
    borderColor: '#000',
    // backgroundColor: '#e2ffd4',
    borderWidth: 1,
    borderRadius: 5,
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    // shadowColor: '#000',
    // shadowRadius: 6,
    // shadowOpacity: 1,  
  },
  itemText: {
    marginLeft: 10,
    marginTop: 3,
    flexGrow: 2,
    fontSize: 25,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageView: {
    display: 'flex',
    width: 120, 
    height: 120,
    padding: 10,
    borderWidth: 2,
    borderColor: 'tomato',
    backgroundColor: '#FFF',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'center'
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#75C34D',
    borderWidth: 1,
    backgroundColor: '#75C34D'
  }
});

export default ProductList;