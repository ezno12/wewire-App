import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/global.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { css, StyleSheet } from 'aphrodite';
import { PlusOutlined } from '@ant-design/icons';
import NavBar from '../Components/NavBar/NavBar';
import { PieChart, RoseChart, ColChart } from '../Components/Chart/charts';
import  ChartUpdate from '../Components/Chart/ChartUpdate'
import  AddChart from '../Components/Chart/ChartAdd'


const styles = StyleSheet.create({
    tabsStyle: {
      maxWidth: '90%',
      marginInline: 'auto',
      marginTop: '.8rem',
      marginBottom: '2rem',
    },
  btnClose: {
    fontSize: '1.2rem',
    fontWeight: 600,
    ':active': {
      color: 'white'
    }
  }
})


const ChartPage: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [lastId, setLastId] = useState(0);
    

    useEffect(()=> {
        const getData = async () => {
            let newId: number = 0
            const res = await axios("http://localhost:5100/api/v1/chart/")
            setItems(res.data.data)
            // ChartData last ID for new row count
            res.data.data.map((chart: any) =>  {
              chart.ChartData.map(({ id }: any) => {
                  if( newId <= id) newId = id
                  return newId
              })
              return newId
          })
          setLastId(newId)
        }
        getData()
        
    }, [])

    return (
    <>
    <NavBar />
    <Tabs
      defaultActiveKey ={'update'}
      transition={false}
      id="noanim-tab-example"
      className={css(styles.tabsStyle)}
    >
      {/* Button to update chart data*/}
      <Tab title="Update Data" eventKey='update' >
      <ChartUpdate items={items} lastId={lastId}/>
      
      {/* Charts */}
      </Tab>
      
      { items.map(({id, title, Type, ChartData})=> {
        const CompChartList: any = {
            'pie': <PieChart dataItem={ChartData}/>,
            'rose': <RoseChart  dataItem={ChartData}/>,
            'col': <ColChart dataItem={ChartData}/>
          }
          
        return  (
            <Tab 
              eventKey={id}
              key={id}
              title={<>{title} <span className={css(styles.btnClose)}>&times;</span></>}
              >
              {CompChartList[Type]}
            </Tab>
        )
      })}
      <Tab title={<PlusOutlined />} eventKey='add'>
        <AddChart />
      </Tab>
    </Tabs>
    </>
  )
}


export default ChartPage;