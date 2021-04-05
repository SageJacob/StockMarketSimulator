import React from 'react';
import { Text, StyleSheet, View, TextInput, FlatList } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search a stock..."
        placeholderTextColor="black"
        style={styles.search}
      />
    </View>
  )
}

const StockList = () => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={[
          { key: 'StockCard' },
          { key: 'StockCard' },
          { key: 'StockCard' },
          { key: 'StockCard' },
          { key: 'StockCard' },
          { key: 'StockCard' },
          { key: 'StockCard' },
          { key: 'StockCard' },
          { key: 'StockCard' },
        ]}
        renderItem={({ item }) => (
          <StockCard />
        )}
      />
    </View>
  )
}

const StockCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ color: 'blue', fontSize: 25 }}>AMZ</Text>
        <Text style={{ color: 'black', fontSize: 12 }}>3 Shares</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: 'green', fontSize: 25 }}>$3,067.53</Text>
        <Text style={{ color: 'red', fontSize: 12 }}>-0.27%</Text>
      </View>
    </View>
  )
}

const Portfolio = () => {
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
  }
});

export default Portfolio;