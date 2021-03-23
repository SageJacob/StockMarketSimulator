import React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';

const Header = () => {
  return (
    <View style={styles.welcome}>
      <Text style={{ color: 'white' }}>Welcome, **Username**</Text>
    </View>
  )
}

const MoneyInvested = () => {
  return (
    <View style={styles.money}>
      <Text style={{ color: 'black', fontSize: 15 }}>Money Invested</Text>
      <Text style={{ color: 'white', fontSize: 15 }}>$15,000</Text>
      <Text style={{ color: 'lime', fontSize: 10 }}>(+$1,000)</Text>
    </View>
  )
}

const MoneyGraph = () => {
  return (
    <View style={styles.graphArea}>
      <Text style={{ color: 'white' }}>Graph</Text>
      <View style={styles.graph}>
        {/* Place graph here */}
      </View>
      <TimeIntervals />
    </View>
  )
}

const TimeIntervals = () => {
  return (
    <View style={styles.intervals}>
      <TouchableHighlight underlayColor={'green'} style={styles.button} onPress={() => { 1 }}>
        <View>
          <Text>1D</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'green'} style={styles.button} onPress={() => { 1 }}>
        <View>
          <Text>1W</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'green'} style={styles.button} onPress={() => { 1 }}>
        <View>
          <Text>1M</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'green'} style={styles.button} onPress={() => { 1 }}>
        <View>
          <Text>1Y</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Header />
      <MoneyInvested />
      <MoneyGraph />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C8C8C',
  },

  welcome: {
    backgroundColor: 'blue'
  },

  money: {
    flex: 1,
    backgroundColor: 'slategrey',
    justifyContent: 'center',
    alignItems: 'center'
  },

  graphArea: {
    flex: 4,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },

  graph: {
    flex: 10,
    marginTop: 10,
    width: '90%',
    backgroundColor: 'white'
  },

  intervals: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    width: '90%'
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    borderWidth: 1,
    padding: 5
  }
});

export default Home;