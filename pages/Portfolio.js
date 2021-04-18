import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, FlatList, TouchableOpacity, Button, Dimensions } from 'react-native';
import { VictoryCandlestick, VictoryChart } from 'victory-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { global_user } from './LoginActivity';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';

const screen = Dimensions.get("screen");
let list;
let portfolio = {StocksOwned:""};


const ListSearchCard = ({ company }) => {
  const [isSearchStockModalVisible, setSearchStockModalVisible] = useState(false);
  const toggleSearchStockModal = () => {
    setSearchStockModalVisible(!isSearchStockModalVisible);
  };
  let [buyAmount, setBuyAmount] = React.useState(null);
  const [graphBuy, setGraphBuy] = useState([]);

  const getGraphChart = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/stock/getChart', {
        "Company": company.Company
      })
      .then(function (response) {
        let res = response.data;
        console.log(res);
        let dataGraph = [];
        for (var i = 0; i < res.c.length; i++) {
          let temp = { x: new Date(res.t[i]), open: res.o[i], close: res.c[i], high: res.h[i], low: res.l[i] };

          dataGraph.push(temp);
        }

        setGraphBuy(dataGraph);
      })
      .catch(function (error) {
        alert(error);
      });
  
};
  const buyStock = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/buyStock', {
        "Login": global_user,
        "Company": company.Company,
        "Amount": buyAmount,
        "Price": company.Company.c
      })
      .then(function (response) {
        let res = response.data;
        alert(JSON.stringify(res));
      })
      .catch(function (error) {
        alert(error);
      });
  };

  let [sellAmount, setSellAmount] = React.useState(null);

  const sellStock = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/sellStock', {
        "Login": global_user,
        "Company": company.name,
        "Amount": sellAmount,
        "Price": company.price
      })
      .then(function (response) {
        let res = response.data;
        alert(JSON.stringify(res));
      })
      .catch(function (error) {
        alert(error);
      });
  };
  return (
    <TouchableOpacity onPress={()=>{getGraphChart(); toggleSearchStockModal();}}>
      <View style={styles.cardContainer}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ color: 'rgb(24,104,217)', fontSize: 25 }}>{company.Company}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: 'green', fontSize: 25 }}>${company.Quote.c}</Text>
        </View>
      </View>
      <View >
        <Modal isVisible={isSearchStockModalVisible}>
            <View style={styles.companySearchModal}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ color: 'rgb(24,104,217)', fontSize: 35 }}>{company.Company}</Text>
                <Text style={{color: 'black'}}> - </Text>
                <Text style={{color: 'black'}}>$ {company.Quote.c}</Text>
              </View>
              <VictoryChart>
                <VictoryCandlestick
                    data={graphBuy}
                  />
              </VictoryChart>
              <TextInput
                style={{ borderWidth: 1, width: 50 }}
                placeholder="Buy"
                textAlign='center'
                onChangeText={setBuyAmount}
                value={buyAmount}/>
              <TouchableOpacity styles={styles.BuySellClose} onPress={buyStock}>
                <Text>Buy</Text>
              </TouchableOpacity>
              <TextInput
                style={{ borderWidth: 1, width: 50 }}
                placeholder="Sell"
                textAlign='center'
                onChangeText={setSellAmount}
                value={sellAmount}>
                
              </TextInput>
              <TouchableOpacity styles={styles.BuySellClose} onPress={sellStock}>
                <Text>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity styles={styles.BuySellClose} onPress={toggleSearchStockModal}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
        </Modal>
      </View>
    </TouchableOpacity>
  )
}


const Portfolio = ({ navigation }) => {
  const [searchBool, setSearchModal] = useState(false);
  const [portfolioBool, setPortfolio] = useState([]);
  const toggleSearch = () => {
    setSearchModal(!searchBool);
  };



  React.useEffect(() => {

    const postCall = navigation.addListener('focus', () => {
      axios
        .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/getPortfolio', {
          "Login": global_user
        })
        .then(function (response) {
          portfolio = response.data.StocksOwned;
          setPortfolio(portfolio);
        })
        .catch(function (error) {
          alert(error);
        });
    });

    return postCall;
  }, [navigation]);

  let query1 = '';
  const onChangeQuery = (text) => {
    query1 = text;
  }
  const search = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/stock/search', {
        "Query": query1
      })
      .then(function (response) {
        list = response.data;
        toggleSearch();
      })
      .catch(function (error) {
        alert(error);
      });
  };
  


  return (
    <LinearGradient
          colors={['rgba(  0, 92, 222   ,0.9)', 'rgba(  0, 0, 0 ,0.9)']}
          style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search a stock..."
            placeholderTextColor="black"
            style={styles.search}
            onChangeText={onChangeQuery}
          />
        <TouchableOpacity style={styles.searchBarButton}onPress={()=>{search();}}>
          <Text style={{ color: 'white', fontSize: 20 }}>Search</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={portfolio}
            renderItem={({ item }) => <ListCard company={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View>
          <Modal isVisible={searchBool}>
            <View style={styles.listSearchContainer}>
            <FlatList
                data={list}
                renderItem={({ item }) => <ListSearchCard company={item} />}
                keyExtractor={(item, index) => index.toString()}
              />

            <TouchableOpacity style={styles.searchButton} title='close' onPress={()=>{toggleSearch();}}>
              <Text
                style={{color: 'white', top: '5%', fontSize: 20}}>Close</Text>
            </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </LinearGradient>
  );
}
const ListCard = ({ company }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [chartData, setChartData] = useState({});
  const [open, setOpen] = useState([]);
  const [close, setClose] = useState([]);
  const [low, setLow] = useState([]);
  const [high, setHigh] = useState([]);
  const [time, setTime] = useState([]);
  const [graph, setGraph] = useState([]);

  const getChart = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/stock/getChart', {
        "Company": company.Company
      })
      .then(function (response) {
        let res = response.data;
        console.log(res);
        let dataGraph = [];
        for (var i = 0; i < res.c.length; i++) {
          let temp = { x: new Date(res.t[i]), open: res.o[i], close: res.c[i], high: res.h[i], low: res.l[i] };

          dataGraph.push(temp);
        }

        setGraph(dataGraph);
      })
      .catch(function (error) {
        alert(error);
      });
  
};


  // const unixTime = time[0];
  // const date = new Date(unixTime * 1000);
  // alert(date.toLocaleDateString("en-US"));

  let [buyAmount, setBuyAmount] = React.useState(null);

  const buyStock = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/buyStock', {
        "Login": global_user,
        "Company": company.Company,
        "Amount": parseInt(buyAmount),
      })
      .then(function (response) {
        let res = response.data;
        buyAmount = '';
        alert(JSON.stringify(res));
      })
      .catch(function (error) {
        alert(error);
      });
  };

  let [sellAmount, setSellAmount] = React.useState(null);
  const sellStock = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/sellStock', {
        "Login": global_user,
        "Company": company.Company,
        "Amount": parseInt(sellAmount),
      })
      .then(function (response) {
        let res = response.data;
        sellAmount = '';
        alert(JSON.stringify(res));
      })
      .catch(function (error) {
        alert(error);
      });
  };


  return (
    <TouchableOpacity onPress={() => { toggleModal(); getChart(); }}>
      <View style={styles.cardContainer}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ color: 'rgb(24,104,217)', fontSize: 25 }}>{company.Company}</Text>
          <Text style={{ color: 'black', fontSize: 12 }}>{company.Amount} Shares</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: 'green', fontSize: 25 }}>${parseFloat(company.TotalValue).toFixed(2)}</Text>
          <Text style={{ color: 'red', fontSize: 12 }}>%</Text>
        </View>
      </View>
      <View >
        <Modal isVisible={isModalVisible}>
            <View style={styles.companyModal}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ color: 'rgb(24,104,217)', fontSize: 35 }}>{company.Company}</Text>
                <Text style={{color: 'black'}}> - </Text>
                <Text style={{color: 'black'}}>$ {parseFloat(company.StockValue).toFixed(2)}</Text>
              </View>
              <VictoryChart>
                <VictoryCandlestick
                    data={graph}
                  />
              </VictoryChart>
              <Text>Shares owned: {company.Amount}</Text>
              <TextInput
                style={{ borderWidth: 1, width: 50 }}
                placeholder="Buy"
                textAlign='center'
                onChangeText={setBuyAmount}
                value={buyAmount}
                onSubmitEditing={buyStock}
              />
              <TextInput
                style={{ borderWidth: 1, width: 50 }}
                placeholder="Sell"
                textAlign='center'
                onChangeText={setSellAmount}
                value={sellAmount}
                onSubmitEditing={sellStock}>
                
              </TextInput>
                <Button onPress={toggleModal} title="Close" />
            </View>
        </Modal>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    width: '90%',
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    left: '3%'
  },

  search: {
    borderWidth: 2,
    borderColor: '#95949a',
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 30,
    width: '100%',
    borderRadius: 50,
    top: '10%',
    height: '90%'
  },

  listContainer: {
    flex: 0.85,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#95949a',
    margin: 10,
    borderRadius: 10,
    top: '7%'
  },

  cardContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    margin: 0,
  },
  companyModal: {
    backgroundColor: 'white',
    height: (screen.height / 10) * 7,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  ModalSearch: {
    position: 'absolute',
    flex: 1

  },
  listSearchContainer: {
    flex: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#95949a',
    margin: 10,
    borderRadius: 10,
  },
  
  searchButton: {
    backgroundColor: 'rgb(24,104,217)',
    height: '5%',
    width: '60%',
    alignItems: 'center',
    borderRadius: 20,
    top: -4,
  },
  searchBarButton: {
    backgroundColor: 'rgb(24,104,217)',
    height: '60%',
    width: '30%',
    alignItems: 'center',
    borderRadius: 20,
    top: '10.2%',
    left: '-210%',
  },

  searchButtonText: {
    color: 'white',
  },

  companySearchModal: {
    backgroundColor: 'white',
    height: (screen.height / 10) * 7,
    alignItems: 'center'
  },

  BuySellClose: {
    backgroundColor: 'rgb(24,104,217)',
    height: 50
  },
});

export default Portfolio;
