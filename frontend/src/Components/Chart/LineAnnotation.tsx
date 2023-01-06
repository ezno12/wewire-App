import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    chartStyle: {
        maxWidth: "40rem",
        marginInline: "auto",
        margin: '2rem auto 6rem auto'
    }
})


const AnnoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const maxValue = Math.max(...data.map((d: any) => d.scales));
  const averageValue = data.map((d: any) => d.scales).reduce((a, b) => a + b, 0) / data.length;
  const config: any = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
    annotations: [
      {
        type: 'line',

        
        start: ['min', maxValue],
        end: ['max', maxValue],
        text: {
          content: 'Top Benfits',
          position: 'right',
          offsetY: 18,
          style: {
            textAlign: 'right',
          },
        },
        style: {
          stroke: 'blue',
        },
      },
    ],
  };

  return <Line {...config as any} className={css(styles.chartStyle)}/>;
};


export default AnnoLine;