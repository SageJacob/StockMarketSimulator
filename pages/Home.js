import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableHighlight, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import axios from 'axios';
import Portfolio from './Portfolio';
import Account from './Account';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './LoginActivity';
import { global_user } from './LoginActivity';
import HomeCharts from './HomeCharts';
import LeaderBoard from './LeaderBoard';

const screen = Dimensions.get("screen");

const Tabs = createMaterialTopTabNavigator();

const MoneyInvested = (money) => {

  // const [cashBalance, setCashBalance] = useState([]);
  // const [holdings, setHoldings] = useState([]);


  // useEffect(() => {
  //   axios
  //     .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/getPortfolio', {
  //       // remember to use global_user  
  //       "Login": global_user
  //     })
  //     .then(function (response) {
  //       let res = response.data;
  //       setCashBalance(res.Cash.toFixed(2));
  //       setHoldings(res.Holdings.toFixed(2));
  //     })
  //     .catch(function (error) {
  //       alert(error);
  //     });
  // }, []);


  return (
    <View style={styles.header}>
      <Text style={{ color: 'blue', fontSize: 25 }}>Welcome, {global_user}</Text>
      <Text style={{ color: 'black', fontSize: 15 }}>Cash Balance: ${money.cashBalance}</Text>
      <Text style={{ color: 'forestgreen', fontSize: 15 }}>Holdings: ${money.holdings}</Text>
    </View>
  )
}




// const MoneyGraph = () => {
//   return (
//     <View style={styles.graphArea}>
//       <VictoryChart
//         theme={VictoryTheme.material}
//         width={400}
//         height={400}
//         padding={60}
//         style={{
//           background: { fill: "#f1eff1" }
//         }}
//       >

//         <VictoryAxis
//           label='Time'
//           style={{
//             axis: { stroke: "black" },
//             grid: { stroke: "none" },
//             axisLabel: { padding: 40, fill: 'black' },
//             tickLabels: { fill: 'black' }
//           }}
//         />
//         <VictoryAxis
//           dependentAxis
//           label='Earnings ($)'
//           style={{
//             axis: { stroke: "black" },
//             grid: { stroke: "none" },
//             axisLabel: { padding: 35, fill: 'black' },
//             tickLabels: { fill: 'black' }
//           }}
//         />
//         <VictoryLine
//           data={data}
//           style={{
//             data: { stroke: "lime", strokeWidth: 3 },
//           }}
//         />
//       </VictoryChart>
//       <TimeIntervals />

//     </View>
//   )
// }

const TimeIntervals = () => {

  const [selectedButton, setSelectedButton] = useState('');

  const toggleSelectedButton = (selection) => {
    console.log('button before: ' + selectedButton);
    setSelectedButton(selection);
    console.log('button after: ' + selectedButton);
  }

  return (
    <View style={styles.intervals}>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => toggleSelectedButton('day')}>
        <View>
          <Text style={{ color: 'white' }}>1D</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => toggleSelectedButton('week')}>
        <View>
          <Text style={{ color: 'white' }}>1W</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => toggleSelectedButton('month')}>
        <View>
          <Text style={{ color: 'white' }}>1M</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => toggleSelectedButton('year')}>
        <View>
          <Text style={{ color: 'white' }}>1Y</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const HomeScreen = ({ navigation }) => {
  const [cashBalance, setCashBalance] = useState([]);
  const [holdings, setHoldings] = useState([]);

  React.useEffect(() => {
    const getPortfolio = navigation.addListener('focus', () => {
      axios
        .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/getPortfolio', {
          // remember to use global_user  
          "Login": global_user
        })
        .then(function (response) {
          let res = response.data;
          setCashBalance(res.Cash.toFixed(2));
          setHoldings(res.Holdings.toFixed(2));
        })
        .catch(function (error) {
          alert(error);
        });
    });

    return getPortfolio;
  }, [navigation]);


  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <MoneyInvested cashBalance={cashBalance} holdings={holdings} />
      <HomeCharts />
    </View >
  )
}

function Home() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBarOptions={{ labelStyle: { fontSize: 10 } }}
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
    backgroundColor: '#8C8C8C',
    height: screen.height
  },

  header: {
    flex: 2,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center'
  },

  graphArea: {
    backgroundColor: '#f1eff1',
    alignItems: 'center',
    flex: 6,
    paddingLeft: 25
  },

  intervals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    backgroundColor: '#51A3A3',
    padding: 15,
    borderRadius: 30
  }
});

export default Home;