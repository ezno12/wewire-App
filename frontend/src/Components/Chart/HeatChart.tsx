import React, { useState, useEffect } from 'react';
import { Heatmap } from '@ant-design/plots';
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    chartStyle: {
        maxWidth: "40rem",
        marginInline: "auto",
        margin: '2rem auto 6rem auto'
    }
})

const HeatmapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/polar-heatmap.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'time',
    yField: 'week',
    colorField: 'value',
    legend: true,
    color: '#BAE7FF-#1890FF-#1028ff',
    coordinate: {
      
      type: 'polar',

      cfg: {
        innerRadius: 0.2,
      },
    },
    heatmapStyle: {
      stroke: '#f5f5f5',
      opacity: 0.8,
    },
    meta: {
      time: {
        type: 'cat',
      },
      value: {
        min: 0,
        max: 1,
      },
    },
    xAxis: {
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 12,
        style: {
          fill: '#666',
          fontSize: 12,
          textBaseline: 'top',
        },
      },
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 0,
        style: {
          fill: '#fff',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    },
    tooltip: {
      showMarkers: false,
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return <Heatmap {...config as any} className={css(styles.chartStyle)}/>;
};

export default HeatmapChart;
