import React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import Portfolio from './Portfolio';
import Account from './Account';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as SecureStore from 'expo-secure-store';
import {getToken} from './LoginActivity';

const Tabs = createMaterialTopTabNavigator();

const MoneyInvested = () => {
  return (
    <View style={styles.money}>
      <Text style={{ color: 'blue', fontSize: 25 }}>Money Invested</Text>
      <Text style={{ color: 'black', fontSize: 25 }}>$15,000</Text>
      <Text style={{ color: 'forestgreen', fontSize: 20 }}>(+$1,000)</Text>
    </View>
  )
}


const data = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
];

const MoneyGraph = () => {
  return (
    <View style={styles.graphArea}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={400}
        height={400}
        padding={60}
        style={{
          background: { fill: "#f1eff1" }
        }}
      >

        <VictoryAxis
          label='Time'
          style={{
            axis: { stroke: "black" },
            grid: { stroke: "none" },
            axisLabel: { padding: 40, fill: 'black' },
            tickLabels: { fill: 'black' }
          }}
        />
        <VictoryAxis
          dependentAxis
          label='Earnings ($)'
          style={{
            axis: { stroke: "black" },
            grid: { stroke: "none" },
            axisLabel: { padding: 35, fill: 'black' },
            tickLabels: { fill: 'black' }
          }}
        />
        <VictoryLine
          data={data}
          style={{
            data: { stroke: "lime", strokeWidth: 3 },
          }}
        />
      </VictoryChart>
      <TimeIntervals />

    </View>
  )
}

const TimeIntervals = () => {
  return (
    <View style={styles.intervals}>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => { console.log(1) }}>
        <View>
          <Text style={{ color: 'white' }}>1D</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => { 1 }}>
        <View>
          <Text style={{ color: 'white' }}>1W</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => { 1 }}>
        <View>
          <Text style={{ color: 'white' }}>1M</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#A4303F'} style={styles.button} onPress={() => { 1 }}>
        <View>
          <Text style={{ color: 'white' }}>1Y</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <MoneyInvested />
      <MoneyGraph />
    </View >
  )
}

function Home() {
  return (

    <Tabs.Navigator initialRouteName="Home">
      <Tabs.Screen name="Portfolio" component={Portfolio} />
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Account" component={Account} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C8C8C'
  },

  money: {
    flex: 5,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center'
  },

  graphArea: {
    backgroundColor: '#f1eff1',
    alignItems: 'center',
    flex: 12,
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