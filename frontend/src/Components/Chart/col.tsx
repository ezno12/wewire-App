import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    chartStyle: {
        maxWidth: "40rem",
        marginInline: "auto",
        margin: '2rem auto 6rem auto'
    }
})

const DemoColumn = () => {
  const data = [
    {
      name: 'London',
      axeX: 'Jan.',
      axeY: 18.9,
    },
    {
      name: 'London',
      axeX: 'Feb.',
      axeY: 28.8,
    },
    {
      name: 'London',
      axeX: 'Mar.',
      axeY: 39.3,
    },
    {
      name: 'London',
      axeX: 'Apr.',
      axeY: 81.4,
    },
    {
      name: 'London',
      axeX: 'May',
      axeY: 47,
    },
    {
      name: 'London',
      axeX: 'Jun.',
      axeY: 20.3,
    },
    {
      name: 'London',
      axeX: 'Jul.',
      axeY: 24,
    },
    {
      name: 'London',
      axeX: 'Aug.',
      axeY: 35.6,
    },
    {
      name: 'Berlin',
      axeX: 'Jan.',
      axeY: 12.4,
    },
    {
      name: 'Berlin',
      axeX: 'Feb.',
      axeY: 23.2,
    },
    {
      name: 'Berlin',
      axeX: 'Mar.',
      axeY: 34.5,
    },
    {
      name: 'Berlin',
      axeX: 'Apr.',
      axeY: 99.7,
    },
    {
      name: 'Berlin',
      axeX: 'May',
      axeY: 52.6,
    },
    {
      name: 'Berlin',
      axeX: 'Jun.',
      axeY: 35.5,
    },
    {
      name: 'Berlin',
      axeX: 'Jul.',
      axeY: 37.4,
    },
    {
      name: 'Berlin',
      axeX: 'Aug.',
      axeY: 42.4,
    },
    {
      name: 'Tunisia',
      axeX: 'Aug.',
      axeY: 35.6,
    },
    {
      name: 'Tunisia',
      axeX: 'Apr.',
      axeY: 35.6,
    },
    {
      name: 'Tunisia',
      axeX: 'Mar.',
      axeY: 35.6,
    },
    {
      name: 'Tunisia',
      axeX: 'Feb.',
      axeY: 35.6,
    }
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'axeX',
    yField: 'axeY',
    seriesField: 'name',

   
    //color: ['#1ca9e6', '#f88c24'],

    // marginRatio: 0.1,
    label: {
      layout: [

        {
          type: 'interval-adjust-position',
        }, 
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return <Column {...config}  className={css(styles.chartStyle)}/>;
};

export default DemoColumn;
