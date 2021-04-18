import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const LeaderBoard = ({ navigation }) => {

  const [leaders, setLeaders] = useState([]);

  React.useEffect(() => {
    const getLeaderboard = navigation.addListener('focus', () => {
      axios
        .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/leaderboard', {})
        .then(function (response) {
          var res = response.data;

          console.log(res.length);

          var leaderData = [];

          for (var i = 0; i < res.length; i++) {
            var temp = { username: res[i].Login, accBalance: res[i].AccountBalance.toFixed(2) };

            leaderData.push(temp);
          }

          setLeaders(leaderData);
          console.log(leaderData);
        })
        .catch(function (error) {
          alert(error);
        });
    });
    return getLeaderboard;
  }, [navigation]);

  return (
    <LinearGradient
      colors={['rgba(  0, 92, 222   ,0.9)', 'rgba(  0, 0, 0 ,0.9)']}
      style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Top Investors on StockHub</Text>

      </View>
      <View style={styles.leaderboardContainer}>
        <FlatList
          data={leaders}
          renderItem={({ item }) => <ListCard username={item.username} accBalance={item.accBalance} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </LinearGradient>
  )
}

const ListCard = ({ username, accBalance }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ color: 'blue', fontSize: 20 }}>{username}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: 'green', fontSize: 20 }}>${accBalance}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15
  },

  header: {
    flex: 1,
    fontSize: 35,
    textAlign: 'center',
    color: 'white'
  },

  leaderboardContainer: {
    flex: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#95949a',
    margin: 10,
    borderRadius: 10,
    top: '-3%'
  },

  cardContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    margin: 10,
  }
});

export default LeaderBoard;