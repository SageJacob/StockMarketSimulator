import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, FlatList, TouchableOpacity, Button, Dimensions} from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { global_user } from './LoginActivity';
import Modal from 'react-native-modal';
const screen = Dimensions.get("screen");
const SearchBar = () => {
  const postCall = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/stock/search', {
        "Query": query
      })
      .then(function (response) {
        let res = response.data;
        alert(JSON.stringify(res));
      })
      .catch(function (error) {
        alert(error);
      });
  };

  let [query, onChangeQuery] = React.useState(null);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search a stock..."
        placeholderTextColor="black"
        style={styles.search}
        onChangeText={onChangeQuery}
        value={query}
        onSubmitEditing={postCall}
      />
    </View>
  )
}

const StockList = () => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ListCard company={item} />}
      />
    </View>
  )
}

const DATA = [
  {
    name: 'AMZ',
    shares: '3',
    price: '3,067.53',
    change: '-0.27',
    key: '1'
  },

  {
    name: 'AAPL',
    shares: '4',
    price: '132.03',
    change: '-1.79',
    key: '2'
  },

  {
    name: 'AAPL',
    shares: '4',
    price: '132.03',
    change: '-1.79',
    key: '3'
  },

  {
    name: 'AAPL',
    shares: '4',
    price: '132.03',
    change: '-1.79',
    key: '4'
  },

  {
    name: 'AAPL',
    shares: '4',
    price: '132.03',
    change: '-1.79',
    key: '5'
  },

  {
    name: 'AAPL',
    shares: '4',
    price: '132.03',
    change: '-1.79',
    key: '6'
  },
  {
    name: 'AAPL',
    shares: '4',
    price: '132.03',
    change: '-1.79',
    key: '7'
  }
]

const ListCard = ({ company }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <TouchableOpacity onPress={toggleModal}>
      <View style={styles.cardContainer}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ color: 'blue', fontSize: 25 }}>{company.name}</Text>
          <Text style={{ color: 'black', fontSize: 12 }}>{company.shares} Shares</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: 'green', fontSize: 25 }}>${company.price}</Text>
          <Text style={{ color: 'red', fontSize: 12 }}>{company.change}%</Text>
        </View>
      </View>
      <View >
          <Modal isVisible={isModalVisible}>
            <View>
              <View style={styles.companyModal}>
                <Text>{company.name}</Text>
                <Button  title="Yes, reset balance"/>
                <Button onPress={toggleModal}  title="No"/>
              </View>
            </View>
          </Modal>
        </View>
    </TouchableOpacity>
  )
}

const Portfolio = ({ navigation }) => {

  React.useEffect(() => {

    const postCall = navigation.addListener('focus', () => {
      axios
        .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/getPortfolio', {
          "Login": "Jacob"
        })
        .then(function (response) {
          let res = response.data;
          alert(JSON.stringify(res));
        })
        .catch(function (error) {
          alert(error);
        });
    });

    return postCall;
  }, [navigation]);


  return (
    <View style={styles.container}>
      <SearchBar />
      <StockList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1eff1'
  },

  searchContainer: {
    flex: 1,
    backgroundColor: '#f1eff1',
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  search: {
    borderWidth: 2,
    borderColor: '#95949a',
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 30,
    width: '90%',
    borderRadius: 50
  },

  listContainer: {
    flex: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#95949a',
    margin: 10,
    borderRadius: 10
  },

  cardContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    margin: 10,
  },
  companyModal:{
    backgroundColor: 'white',
    height: (screen.height / 10) * 3,

  },
});

export default Portfolio;