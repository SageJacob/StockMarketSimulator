import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryPie, VictoryAxis, VictoryLabel } from 'victory-native';
import axios from 'axios';
import { global_user } from './LoginActivity';
import { LinearGradient } from 'expo-linear-gradient';

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

  const graphicColor = ['#A032B6', '#60D394', '#E56B6F', '#FFBF46', '#0FA3B1']; // Colors
  //const wantedGraphicData = pieChartData; // Data that we want to display
  //const defaultGraphicData = dummyPieChartData; // Data used to make the animate prop work

  //const [graphicData, setGraphicData] = useState(defaultGraphicData);

  // useEffect(() => {
  //   setGraphicData(pieChartData); // Setting the data that we want to display
  // }, []);

  return (
    <View style={styles.container}>

      <View style={styles.barContainer}>

        <VictoryChart
          domainPadding={{ x: 15 }}
        >

          <VictoryBar
            style={{ data: { fill: "#6FDCBB" }, tickLabels: { fill: 'white' } }}
            data={barChartData}

          />

          <VictoryAxis
            dependentAxis
            tickFormat={(t) => Math.floor(t)}
            label='Shares Owned'
            style={{
              axis: { stroke: 'white' },
              axisLabel: { padding: 30, fill: 'white' },
              tickLabels: { fill: 'white' }
            }}
          />

          <VictoryAxis
            offsetY={50}
            style={{
              axis: { stroke: 'white' },
              tickLabels: { fill: 'white', fontSize: 10 }
            }}
          />

        </VictoryChart>
      </View>

      <View style={styles.pieContainer}>

        <VictoryChart>
          <VictoryPie
            //animate={{ easing: 'exp' }}
            data={pieChartData}
            width={250}
            height={250}
            colorScale={graphicColor}
            innerRadius={60}
            style={{ labels: { fill: 'white' } }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" }
            }}
          />

          {/* <VictoryLabel
          textAnchor='middle'
          x={205} y={150}
          text='$5000000'
        /> */}

        </VictoryChart>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    //backgroundColor: '#f1eff1',
    height: screen.height,
  },

  barContainer: {
    flex: 1,
    marginLeft: 5,
    marginBottom: 20
  },

  pieContainer: {
    flex: 1,
    paddingBottom: 15,
  }
});

export default HomeCharts;