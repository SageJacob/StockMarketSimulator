import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryPie, VictoryAxis } from 'victory-native';
import axios from 'axios';
import { global_user } from './LoginActivity';

const screen = Dimensions.get("screen");
const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];

const HomeCharts = () => {

  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  //const [dummyPieChartData, setDummyPieChartData] = useState([]);

  useEffect(() => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/getPortfolio', {
        // remember to use global_user  
        "Login": global_user
      })
      .then(function (response) {
        var res = response.data;

        console.log(res);

        var barData = [];
        var pieData = [];
        //var dummyPieData = [];

        for (var i = 0; i < res.StocksOwned.length; i++) {

          var barTemp = { x: res.StocksOwned[i].Company, y: res.StocksOwned[i].Amount };
          var pieTemp = { x: res.StocksOwned[i].Company, y: res.StocksOwned[i].TotalValue };
          //var dummyTemp = { x: res.StocksOwned[i].Company, y: 0 };

          barData.push(barTemp);
          pieData.push(pieTemp);
          //dummyPieData.push(dummyTemp);
        }

        setBarChartData(barData);
        setPieChartData(pieData);
        //setDummyPieChartData(dummyPieData);
      })
      .catch(function (error) {
        alert(error);
      });

  }, []);

  const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
  //const wantedGraphicData = pieChartData; // Data that we want to display
  //const defaultGraphicData = dummyPieChartData; // Data used to make the animate prop work

  //const [graphicData, setGraphicData] = useState(defaultGraphicData);

  // useEffect(() => {
  //   setGraphicData(pieChartData); // Setting the data that we want to display
  // }, []);

  return (
    <View style={styles.container}>
      <VictoryChart
      //theme={VictoryTheme.material}
      //domainPadding={10}
      >

        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          data={barChartData}
        />


      </VictoryChart>

      <VictoryChart>
        <VictoryPie
          //animate={{ easing: 'exp' }}
          data={pieChartData}
          width={250}
          height={250}
          colorScale={graphicColor}
          innerRadius={50}
        />
        <VictoryAxis style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
          tickLabels: { fill: "transparent" }
        }} />
      </VictoryChart>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: '#f1eff1'
  }
});

export default HomeCharts;