import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableHighlight, Dimensions } from 'react-native';
import axios from 'axios';
import Portfolio from './Portfolio';
import Account from './Account';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './LoginActivity';
import { global_user } from './LoginActivity';
import HomeCharts from './HomeCharts';
import LeaderBoard from './LeaderBoard';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';


const screen = Dimensions.get("screen");

const Tabs = createMaterialTopTabNavigator();

const MoneyInvested = (money) => {

  return (
    <View style={styles.header}>
      <Text style={{ color: '#F671FF', fontSize: 25 }}>Welcome, {global_user}</Text>
      <Text style={{ color: 'lime', fontSize: 15 }}>Cash Balance: ${money.cashBalance}</Text>
      <Text style={{ color: '#FFE900', fontSize: 15 }}>Holdings: ${money.holdings}</Text>
    </View>
  )
}

const HomeScreen = ({ navigation }) => {
  const [cashBalance, setCashBalance] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/getPortfolio', {
          "Login": global_user
        })
        .then(function (response) {
          let res = response.data;
          setCashBalance(res.Cash.toFixed(2));
          setHoldings(res.Holdings.toFixed(2));

          var barData = [];
          var pieData = [];

          for (var i = 0; i < res.StocksOwned.length; i++) {

            var barTemp = { x: res.StocksOwned[i].Company, y: res.StocksOwned[i].Amount };
            var pieTemp = { x: res.StocksOwned[i].Company, y: res.StocksOwned[i].TotalValue };

            barData.push(barTemp);
            pieData.push(pieTemp);
          }

          setBarChartData(barData);
          setPieChartData(pieData);

        })
        .catch(function (error) {
          alert(error);
        });
    }, [])
  );


  return (
    <LinearGradient
      colors={['rgba(  0, 92, 222   ,0.9)', 'rgba(  0, 0, 0 ,0.9)']}
      style={styles.container}>

      <View style={styles.container}>
        <StatusBar hidden={false} />
        <MoneyInvested cashBalance={cashBalance} holdings={holdings} />
        <HomeCharts barChartData={barChartData} pieChartData={pieChartData} />
      </View >
    </LinearGradient>
  )
}

function Home() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBarOptions={{ labelStyle: { fontSize: 8 } }}
    >
      <Tabs.Screen name="Leaderboard" component={LeaderBoard} />
      <Tabs.Screen name="Portfolio" component={Portfolio} />
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Account" component={Account} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screen.height,
  },

  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  graphArea: {
    alignItems: 'center',
    flex: 6,
    paddingLeft: 25
  },
});

export default Home;