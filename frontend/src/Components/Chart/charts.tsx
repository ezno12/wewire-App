import React from 'react';
import { Pie, Rose, Column } from '@ant-design/plots';
import { css, StyleSheet } from 'aphrodite'


const styles = StyleSheet.create({
  chartStyle: {
      maxWidth: "40rem",
      marginInline: "auto",
      margin: '2rem auto 6rem auto'
  }
})


export const PieChart = ({ dataItem }: any) => {
  const data: any[] = [];
  dataItem.map(({xField, yField}: any) => {
    return data.push({
      type: xField,
      value: Number(yField)
    })
  })
  
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
      {
        type: 'element-highlight-by-color',
      }
    ],
  };
  return <Pie {...config} className={css(styles.chartStyle)}/>;
};

export const RoseChart = ({ dataItem }: any) => {
    const data: any[] = [];
    dataItem.map(({xField, yField}: any) => {
      return data.push({
        type: xField,
        value: Number(yField)
      })
    })
  
    const config = {
      data,
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      radius: 0.9,
      legend: {
        position: 'bottom',
      },
      interactions: [
        {
          type: 'element-highlight-by-color',
        },]
    };
    return <Rose {...config as any} className={css(styles.chartStyle)}/>;
  };


  export const ColChart = ({ dataItem }: any) => {
    const data: any[] = [];
  
    dataItem.map(({xField, yField, zField}: any) => {
        return data.push({
        name: zField,
        axeX: yField,
        axeY: Number(xField)
      })
    })
    
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
  
  
