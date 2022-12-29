import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    chartStyle: {
        maxWidth: "40rem",
        marginInline: "auto",
        margin: '2rem auto 6rem auto'
    }
})

const DualAxesChart = () => {
  const data = [
    {
      time: '2019-03',
      value: 350,
      count: 800,
    },
    {
      time: '2019-04',
      value: 900,
      count: 600,
    },
    {
      time: '2019-05',
      value: 300,
      count: 400,
    },
    {
      time: '2019-06',
      value: 450,
      count: 380,
    },
    {
      time: '2019-07',
      value: 470,
      count: 220,
    },
  ];
  const config = {
    data: [data, data],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return <DualAxes {...config} className={css(styles.chartStyle)}/>;
};

export default DualAxesChart;
