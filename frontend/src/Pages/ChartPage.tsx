import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/global.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { css, StyleSheet } from 'aphrodite';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Spin, Popconfirm, message } from 'antd';
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
    fontWeight: 900,
    ':active': {
      color: 'white'
    }
  },
  spinDivStyle: {
    height:'20rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})


const ChartPage: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(true)
    const [delKey, setDelKey] = useState<number>();

    const getChartKey = (id: number) => {
      setDelKey(id)
    }
    // eslint-disable-next-line
    const handleDeleteChart = async  () => {
      const res = await axios.delete(`http://localhost:5100/api/v1/deletechart?id=${delKey}`)
      if(!res.data.error) {
        message.success("Chart Deleted successfully")
      }
    }

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
          setLoading(false)
        }
        getData()
        
    }, [handleDeleteChart])

    return (
    <>
    <NavBar />
    {loading
    ? <div className={css(styles.spinDivStyle)}>
      <Spin size="large" tip="LOADING"/>
      </div>
     : <Tabs
      onChange={(key) => console.log("Clicked",key)}
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
              title={
              <>{title}
              <Popconfirm
                title="Are you sure to delete this Chart?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={handleDeleteChart}
              >
                <span className={css(styles.btnClose)} onClick={() => getChartKey(Number(id))}>&times;</span>
              </Popconfirm>
              </>}
              >
              {CompChartList[Type]}
            </Tab>
        )
      })}
      <Tab title={<PlusOutlined />} eventKey='add'>
        <AddChart />
      </Tab>
    </Tabs>}
    </>
  )
}


export default ChartPage;