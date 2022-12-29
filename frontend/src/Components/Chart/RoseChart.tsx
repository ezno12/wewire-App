import React, { useState, useEffect } from 'react';
import { Rose } from '@ant-design/plots';
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    chartStyle: {
        maxWidth: "40rem",
        marginInline: "auto",
        margin: '2rem auto 6rem auto'
    }
})

const RoseChart = () => {
  const data = [
    {
      type: 'RH',
      value: 27,
    },
    {
      type: 'IT ',
      value: 25,
    },
    {
      type: 'Management',
      value: 18,
    },
    {
      type: 'Env',
      value: 15,
    },
    {
      type: 'Security',
      value: 10,
    },
    {
      type: 'Marwen',
      value: 25,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: {
      position: 'bottom',
    },
  };
  return <Rose {...config as any} className={css(styles.chartStyle)}/>;
};

export default RoseChart;
