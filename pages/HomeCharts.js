import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryPie, VictoryAxis, VictoryLabel } from 'victory-native';

const screen = Dimensions.get("screen");

const HomeCharts = (data) => {

  const graphicColor = ['#A032B6', '#60D394', '#E56B6F', '#FFBF46', '#0FA3B1'];

  return (
    <View style={styles.container}>

      <View style={styles.barContainer}>

        <VictoryChart
          domainPadding={{ x: 15 }}
        >

          <VictoryBar
            style={{ data: { fill: "#6FDCBB" }, tickLabels: { fill: 'white' } }}
            data={data.barChartData}

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
            data={data.pieChartData}
            labels={({ datum }) => datum.x + '\n' + ((datum.y / data.holdings) * 100).toFixed(2) + '%'}
            width={250}
            height={250}
            colorScale={graphicColor}
            innerRadius={60}
            style={{ labels: { fill: 'white', fontSize: 10 } }}
            padAngle={4}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" }
            }}
          />
        </VictoryChart>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
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