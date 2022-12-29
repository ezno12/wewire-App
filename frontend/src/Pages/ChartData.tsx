import React, { useRef, useState } from 'react';
import { Tabs, Button } from 'antd';
import "../style/global.css"
import { css, StyleSheet } from 'aphrodite';
import NavBar from '../Components/NavBar/NavBar';
import ChartData from '../Components/Chart/col';
import PieChart from '../Components/Chart/PieChart';
import RoseChart from '../Components/Chart/RoseChart';
import  AreaRadar from '../Components/Chart/AreaRadar';
import HeatmapChart from '../Components/Chart/HeatChart'
import AnnoLine from '../Components/Chart/LineAnnotation'
import DualAxes from '../Components/Chart/DualAxes';

const styles = StyleSheet.create({
    tabsContainer: {
        maxWidth: '90%',
        marginInline: 'auto',
        marginTop: '.8rem',
    },
    BtnStyle: {
      margin: '0.5rem 1rem',
      padding: '',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      ':hover': {
          color: 'white',
          backgroundColor: 'red',
          'border-color': 'red',
          
      },
  },
  TabsStyle: {
    color: 'red',
    'border-radius': 0
  }
})
const ColChartData = <ChartData />
const PieChartData = <PieChart />
const RoseChartData = <RoseChart />
const AreaRadarData = <AreaRadar />
const HeatmapChartData = <HeatmapChart />
const AnnoLineData = <AnnoLine />
const DualAxesData = <DualAxes />

const initialItems = [

  { label: 'Best Team', children: ColChartData, key: '1', closable: false, },
  { label: 'Best Supplier', children: PieChartData , key: '2', closable: false,},
  { label: 'Accidents', children: RoseChartData, key: '3', closable: false, },
  { label: 'Bara Hawes', children: AreaRadarData, key: '4', closable: false, },
  { label: 'Productivity ', children: HeatmapChartData, key: '5', closable: false, },
  { label: 'Profits', children: AnnoLineData, key: '6', closable: false, },
  { label: 'Departments', children: DualAxesData, key: '7', closable: false, },
  
];

const operations = {
  left: <Button size={'large'}  className={css(styles.BtnStyle)}>Change View</Button>
}

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey } as any);
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <>
    <NavBar />

    <Tabs
      tabBarExtraContent={operations}
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit as any}
      items={items}
      className= {css(styles.tabsContainer)}
      >
    </Tabs>
    
    </>
  );
};

export default App;
