import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
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
import jwtDecode from 'jwt-decode';


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
  },
  hideTabStyle: {
    display: 'none'
  },
  showTabStyle: {
    visibility: 'visible'
  },
  
})
 const deparCode: any = {
0: 'Regular User', 1: 'Management', 2: 'Maintenance',
 3: 'Quality', 4: 'Security', 5: 'Environment',
 6: 'IE', 7: 'Logistic', 8: 'IT',
 9: 'Production', 10: 'RH'
}

const ChartPage: React.FC = () => {
    const user: any = jwtDecode(JSON.parse(localStorage.getItem('user') as any));
    const [items, setItems] = useState<any[]>([]);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(true)
    const [delKey, setDelKey] = useState<number>();
    let { deparName } = useParams<string>()
    const effectRun = useRef(false);

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
        let isMounted = true;
        const controller = new AbortController();
        if (effectRun.current === true) {
        const getData = async () => {
            let newId: number = 0
            const res = await axios.get(`http://localhost:5100/api/v1/chart/?name=${deparName?.slice(1,)}`, {
              signal: controller.signal
            })
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
        
        
      }
      return () => {
        isMounted = false;
        controller.abort();
        effectRun.current = true;
      }
    }, [deparName])

    return (
    <>
    <NavBar />
    {loading
    ? <div className={css(styles.spinDivStyle)}>
      <Spin size="large" tip="LOADING"/>
      </div>
     : <Tabs
      onChange={(key) => console.log("Clicked",key)}
      defaultActiveKey ={deparCode[user.permission] ===  deparName?.slice(1,) || user.isAdmin ? 'update' : 0}
      transition={false}
      id="noanim-tab-example"
      className={css(styles.tabsStyle)}
    >
      {/* Button to update chart data*/}
      <Tab
        title="Update Data" eventKey='update'
        tabClassName={ deparCode[user.permission] ===  deparName?.slice(1,) || user.isAdmin ? css(styles.showTabStyle) : css(styles.hideTabStyle)}
        disabled={deparCode[user.permission] ===  deparName?.slice(1,) || user.isAdmin ? false : true}
        >
        <ChartUpdate items={items} lastId={lastId}/>
      </Tab> 
      {/* Charts */}
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
                className={ deparCode[user.permission] ===  deparName?.slice(1,) || user.isAdmin ? css(styles.showTabStyle) : css(styles.hideTabStyle)}
                disabled={deparCode[user.permission] ===  deparName?.slice(1,) || user.isAdmin ? false : true}
              >
                <span className={css(styles.btnClose)} onClick={() => getChartKey(Number(id))}>&times;</span>
              </Popconfirm>
              </>}
              >
              {CompChartList[Type]}
            </Tab>
        )
        })}
      <Tab
        title={<PlusOutlined />} eventKey='add'
        tabClassName={ deparCode[user.permission] ===  deparName?.slice(1,) || user.isAdmin ? css(styles.showTabStyle) : css(styles.hideTabStyle)}
        disabled={ deparCode[user.permission] ===  deparName?.slice(1,) || user.isAdmin ? false : true}
      >
        <AddChart />
    </Tab>
    </Tabs>}
    </>
  )
}


export default ChartPage;