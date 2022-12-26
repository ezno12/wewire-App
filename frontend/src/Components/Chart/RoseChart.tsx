import React, { useState, useEffect } from 'react';
import { Rose } from '@ant-design/plots';

const RoseChart = () => {
  const data = [
    {
      type: 'Data 1',
      value: 27,
    },
    {
      type: 'Data 2',
      value: 25,
    },
    {
      type: 'Data 3',
      value: 18,
    },
    {
      type: 'Data 4',
      value: 15,
    },
    {
      type: 'Data 5',
      value: 10,
    },
    {
      type: 'Data 6',
      value: 5,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
  };
  return <Rose {...config} />;
};

export default RoseChart;
