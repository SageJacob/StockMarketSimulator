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
import { LinearGradient } from 'expo-linear-gradient';


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
    <LinearGradient
      colors={['rgba(  0, 92, 222   ,0.9)', 'rgba(  0, 0, 0 ,0.9)']}
      style={styles.container}>

      <View style={styles.container}>
        <StatusBar hidden={false} />
        <MoneyInvested cashBalance={cashBalance} holdings={holdings} />
        <HomeCharts />
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
    //backgroundColor: '#8C8C8C',
    height: screen.height,
    //marginBottom: 10
  },

  header: {
    flex: 2,
    //backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  graphArea: {
    //backgroundColor: '#f1eff1',
    alignItems: 'center',
    flex: 6,
    paddingLeft: 25
  },
});

export default Home;