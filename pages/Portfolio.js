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
  const [graphBuy, setGraphBuy] = useState([]);
  let buyAmount = '';
  let sellAmount = '';

  const handleBuy = (text) => {
  buyAmount = text;
  }

  const handleSell = (text) => {
  sellAmount = text;
  }

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
          let temp = { x: new Date(res.t[i] * 1000), open: res.o[i], close: res.c[i], high: res.h[i], low: res.l[i] };

          dataGraph.push(temp);
        }

        setGraphBuy(dataGraph);
      })
      .catch(function (error) {
        alert('There was an error obtaining the chart.');
      });
  
};
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
        toggleSearchStockModal();
      })
      .catch(function (error) {
        alert('There was an error trying to buy.');
      });
  };

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
        toggleSearchStockModal();
      })
      .catch(function (error) {
        alert('There was an error trying to sell.');
      });
  };
  return (
    <TouchableOpacity onPress={()=>{getGraphChart(); toggleSearchStockModal();}}>
      <View style={styles.cardContainer}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ color: 'rgb(24,104,217)', fontSize: 25 }}>{company.Company}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: 'green', fontSize: 25 }}>${parseFloat(company.Quote.c).toFixed(2)}</Text>
        </View>
      </View>
      <View >
        <Modal isVisible={isSearchStockModalVisible}>
            <View style={styles.companySearchModal}>
              <View style={{flexDirection: 'row', top: 5}}>
                <Text style={{ color: 'rgb(24,104,217)', fontSize: 35 }}>{company.Company}</Text>
                <Text style={{color: 'black', fontSize: 35 }}> - </Text>
                <Text style={{color: 'black', fontSize: 35 }}>${parseFloat(company.Quote.c).toFixed(2)}</Text>
              </View>
              <View style={{left: '4%'}}>
              <VictoryChart>
                <VictoryCandlestick
                    data={graphBuy}
                    candleColors={{ positive: 'lime', negative: 'red' }}
                  />
              </VictoryChart>
              </View>
              <View style={{flexDirection: 'row', paddingBottom: '5%'}}>
                <TextInput
                  style={styles.buySellBox}
                  placeholder="Buy"
                  textAlign='center'
                  onChangeText={handleBuy}/>
                <TouchableOpacity style={styles.BuySellClose} onPress={buyStock}>
                  <Text style={{color: 'white', fontSize: 20}}>Buy</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row',}}>
                <TextInput
                  style={styles.buySellBox}
                  placeholder="Sell"
                  textAlign='center'
                  onChangeText={handleSell}/>
                <TouchableOpacity style={styles.BuySellClose} onPress={sellStock}>
                  <Text style={{color: 'white', fontSize: 20}}>Sell</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.BuySellCloseSubmit} onPress={toggleSearchStockModal}>
                <Text style={{color: 'white', fontSize: 20, top: -2}}>Close</Text>
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
          alert('There was an error obtaining your portfolio.');
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
        alert('There was an error while searching.');
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
            removeClippedSubviews={false}
          />
        </View>
        <View>
          <Modal isVisible={searchBool}>
            <View style={styles.listSearchContainer}>
            <FlatList
                data={list}
                renderItem={({ item }) => <ListSearchCard company={item} />}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={false}
              />

            <TouchableOpacity style={styles.searchButton} onPress={()=>{toggleSearch();}}>
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
  let buyAmount = '';
  let sellAmount = '';

  const handleBuy = (text) => {
    buyAmount = text;
  }

  const handleSell = (text) => {
    sellAmount = text;
  }

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
          let temp = { x: new Date(res.t[i]*1000), open: res.o[i], close: res.c[i], high: res.h[i], low: res.l[i] };

          dataGraph.push(temp);
        }

        setGraph(dataGraph);
      })
      .catch(function (error) {
        alert('There was an error obtaining the chart.');
      });
  
};


  // const unixTime = time[0];
  // const date = new Date(unixTime * 1000);
  // alert(date.toLocaleDateString("en-US"));

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
        toggleModal();
      })
      .catch(function (error) {
        alert('There was an error trying to buy.');
      });
  };

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
        toggleModal();
        
      })
      .catch(function (error) {
        alert('There was an error trying to sell.');
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
          <Text style={{ color: 'green', fontSize: 25, top: '15%' }}>${parseFloat(company.TotalValue).toFixed(2)}</Text>
        </View>
      </View>
      <View >
        <Modal isVisible={isModalVisible}>
            <View style={styles.companyModal}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ color: 'rgb(24,104,217)', fontSize: 35 }}>{company.Company}</Text>
                <Text style={{color: 'black', fontSize: 35 }}> - </Text>
                <Text style={{color: 'black', fontSize: 35 }}>${parseFloat(company.StockValue).toFixed(2)}</Text>
              </View>
              <View style={{left: '4%'}}>
              <VictoryChart>
                <VictoryCandlestick
                    data={graph}
                    candleColors={{ positive: 'lime', negative: 'red' }}
                  />
              </VictoryChart>
              </View>
              <Text style={{top: -10}}>Shares owned: {company.Amount}</Text>
              <View style={{flexDirection: 'row', paddingBottom: '5%', top: -5}}>
                <TextInput
                  style={styles.buySellBox}
                  placeholder="Buy"
                  textAlign='center'
                  onChangeText={handleBuy}/>
                <TouchableOpacity style={styles.BuySellClose} onPress={buyStock}>
                  <Text style={{color: 'white', fontSize: 20, top: -2}}>Buy</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', top: -5}}>
                <TextInput
                  style={styles.buySellBox}
                  placeholder="Sell"
                  textAlign='center'
                  onChangeText={handleSell}/>
                <TouchableOpacity style={styles.BuySellClose} onPress={sellStock}>
                  <Text style={{color: 'white', fontSize: 20, top: -2}}>Sell</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.BuySellCloseOwnedSubmit} onPress={toggleModal}>
                <Text style={{color: 'white', fontSize: 20, top: -2}}>Close</Text>
              </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: '#95949a',
    margin: 10,
    borderRadius: 10,
    top: '7%',
  },

  cardContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
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
    alignItems: 'center',
    borderRadius: 20,
    width: '30%',
    height: '90%',
    left: '30%',
    top: 2
  },
  BuySellCloseSubmit: {
    backgroundColor: 'rgb(24,104,217)',
    width: '50%',
    alignItems: 'center',
    borderRadius: 20,
    height: '5%',
    top: '10%'
  },

  buySellBox: {
    borderWidth: 1, width: (screen.width / 10) * 5, borderRadius: 20, left: '-25%', height: '100%',
  },

  BuySellCloseOwnedSubmit: {
    backgroundColor: 'rgb(24,104,217)',
    width: '50%',
    alignItems: 'center',
    borderRadius: 20,
    height: '5%',
  },

});

export default Portfolio;
