import React, { useState, useReducer, useEffect} from 'react';
import { Button, message, Steps, Card, Segmented } from 'antd';
//import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Form from 'react-bootstrap/Form';
import {css, StyleSheet } from 'aphrodite';
import axios from 'axios';
import '../../style/global.css'
import AddTable from '../Table/AddChartTable'
import pie from '../../assat/pie.webp';
import bar from '../../assat/bar.webp';
import rose from '../../assat/rose.webp'
import { useAppDispatch, useAppSelector} from '../../Redux/ReduxHooks'
import {
  incrementChartId,
  incrementChartDataId,
  setChartId,
  setChartDatatId,
  setChartTitle,
  setChartType,
} from '../../Redux/ChartRedux'



type stepsStatusType = "error" | "wait" | "process" | "finish" | undefined



const { Meta } = Card;

const styles = StyleSheet.create({
    containerStyle: {
        maxWidth: '80%',
        marginInline: 'auto',
    },
    contentStyle : {
        height: 'auto',
        paddingBottom: '4rem',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.45)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: '.5rem',
        border: '1px dashed rgb(217, 217, 217)',
        marginTop: '1rem'
    },
    formItemStyle : {
      margin: '2rem 0'
    },
    cardImgStyle: {
      maxWidth: 190,
      maxHeight: 190,
      marginInline: 'auto'
    },
    stepBtnNextStyle: {
      width: '5.891rem',
      backgroundColor: 'rgb(255, 26, 26)',
      ':hover': {
        backgroundColor: 'rgba(255, 26, 26, .8)',
      }
    },
    stepBtnPrevStyle: {
      margin: '0 .5rem',
      ':hover': {
        color: 'rgb(255, 26, 26)',
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderColor: 'rgb(255, 26, 26)',
      }
    },
    segmentedStyle: {
      margin: '1.5rem 0'
    }
})

// Component of First Step
const FistStep: React.FC = () => {
  const [valid, setValid] = useState<boolean>()
  const initialState = {title: "", depar: ""}
  const dispatch = useAppDispatch()
  const [TitleState, updateState] = useReducer(
    (state: any, updates: any) => {
      dispatch(setChartTitle({ ...state, ...updates }))
      return ({ ...state, ...updates })},
    initialState
  )
  

 
  const handleValidation = () => {
    if(TitleState.title === "" || TitleState.depar === "") {
      setValid(false)
    }
    else if (TitleState.title.length < 5) {
      setValid(false)
    }
    else if (TitleState.depar === "Choose Departements") {
      setValid(false)
    }else {
      setValid(true)
    }
  }

  
  return (
    
    <>
    <Form validated={valid} onChange={handleValidation}>
    <Form.Group className="mb-3" onChange={(e: any)=>updateState({ title: e.target.value})}>
      <Form.Control placeholder="Please Add chart title" />
    </Form.Group>
    <Form.Group className="mb-3" onChange={(e: any)=>updateState({ depar: e.target.value})}>
      <Form.Select>
      <option >Choose Departements</option>
        <option >Management</option>
        <option>Quality</option>
        <option>Environment</option>
        <option>Logistic</option>
        <option>Production</option>
        <option>RH</option>
        <option>IT</option>
      </Form.Select>
    </Form.Group>
    </Form>
    {/*<Form name="dynamic_form_item">
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('You Need to Add Chart Title'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <div className={css(styles.formItemStyle)}>
            {fields.map((field, index) => (
              <>
              <Form.Item
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please Add Valide Chart Title.",
                    },
                  ]}
                  noStyle
                >
                <Input
                  placeholder="Add Chart Title"
                  style={{ width: '24rem', height: '2.5rem' }}
                  onChange={(e)=> handleTitleValue(e.target.value)}
                  />
                </Form.Item>
                {fields.length >= 1 ? (
                  <MinusCircleOutlined
                    style={{marginLeft: '0.3rem', fontSize: '1.3rem', color: 'red'}}
                    twoToneColor={"#FF0000"}
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
              <Form.Item style={{marginTop: '24px', maxWidth: '94%'}}>
                {fields.length === 1 &&
                <Select
                onSelect={(slectedData)=> handleDeparValue(slectedData)}
                size="large"
                placeholder="Select a Departements"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'Management', label: 'Management'}, { value: 'Maintenance', label: 'Maintenance'},
                  { value: 'Quality', label: 'Quality'}, { value: 'Security', label: 'Security'},
                  { value: 'Environment', label: 'Environment'}, { value: 'IE', label: 'IE'},
                  { value: 'Logistic', label: 'Logistic'}, { value: 'IT', label: 'IT'},
                  { value: 'Production', label: 'Production'}, { value: 'RH', label: 'RH'},
                ]}
              />}
              </Form.Item>
              </>
            ))}
            { fields.length < 1 ? (<Form.Item style={{width: '24rem'}}>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '90%', marginLeft: '19.5px' }}
                icon={<PlusOutlined />}
                size="large"
              >
                Add KPI
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>)
            : null
            }
          </div>
        )}
      </Form.List>
          </Form> */}
  </>
    
  );
}

// Component of Second Step
const SecondStep: React.FC = ({ handleTypeData }: any) => {
  const value = useAppSelector((state) => state.newCharts.chartType)
  const dispatch = useAppDispatch()
  
  const onChange = (item: any) => {
    dispatch(setChartType({type: item.split(' ')[0].toLocaleLowerCase()}))
  }

  return (
    <>
    <Segmented
    className={css(styles.segmentedStyle)}
    size='large'
    options={['Pie Chart', 'Rose Chart', 'Bar Chart']}
    onChange={(item) => { onChange(item)}}
    />
    { value === 'pie' &&
     <Card
     hoverable
     style={{ width: 240, margin: '2rem 0 1rem 0' }}
     cover={<img className={css(styles.cardImgStyle)} alt="Pie Chart Example" src={pie} />}
     >
      <Meta title="Pie Chart" style={{textAlign: 'center'}}/>
      </Card>}
     { value === 'rose' &&
     <Card
     hoverable
     style={{ width: 240, margin: '2rem 0 1rem 0' }}
     cover={<img className={css(styles.cardImgStyle)} alt="Rose Chart Example" src={rose} />}
     ><Meta title="Rose Chart" style={{textAlign: 'center'}}/>
     </Card>}
     { value === 'bar' &&
     <Card
     hoverable
     style={{ width: 240, margin: '2rem 0 1rem 0' }}
     cover={<img className={css(styles.cardImgStyle)} alt="Bar Chart Example" src={bar} />}
     ><Meta title="Bar Chart" style={{textAlign: 'center'}}/>
     </Card>}
   </>
  );
}


const AddChart: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [precent, setPercent] = useState<number>(8)
  const [status, setStatus] = useState<stepsStatusType>("process")
  const chartTitle = useAppSelector((state) => state.newCharts.chartTitle)
  const chartType = useAppSelector((state) => state.newCharts.chartType)
  const chartID = useAppSelector((state) => state.newCharts.chartId)
  const ChartData = useAppSelector((state) => state.newCharts.chartData)
  const dispatch = useAppDispatch()



  useEffect(() => {
    const oldChartData = async () => {
      let lgChartId: number = 0
      let lgChartDataId: number = 0
      const res = await axios("http://localhost:5100/api/v1/chart/")
      // eslint-disable-next-line
      res.data.data.map((chart: any) => {
        Number(chart.id) >= lgChartId && (lgChartId = Number(chart.id))
        // eslint-disable-next-line
        chart.ChartData.map(({id}: any) => {
          id >= lgChartDataId && (lgChartDataId = id)
  
        })
        dispatch(setChartId({id: lgChartId + 1}))
        dispatch(setChartDatatId({dataId: lgChartDataId + 1}))
      
      })
    }
    oldChartData()
  // eslint-disable-next-line
  },[])
  

  const steps = [
    {
      title: 'Chart Title',
      content: <FistStep />,
    },
    {
      title: 'Chart Type',
      content: <SecondStep />,
    },
    {
      title: 'Chart Data',
      content: <AddTable />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
    setPercent(precent + 40)
  };

  const prev = () => {
    setCurrent(current - 1);
    setPercent(precent - 40)
  };
  const handleClick = async () => {
   
    try {
      const res:any = await axios.post("http://localhost:5100/api/v1/addchart", {
        id: chartID.toString(),
        title: chartTitle.title,
        Type: chartType,
        departements: chartTitle.depar,
        ChartData: ChartData
      })
      if(!res.data.error) {
        dispatch(incrementChartId())
        dispatch(incrementChartDataId())
        message.success('Processing complete!')
        setTimeout(() => {
        setPercent(100)
        setStatus("finish")}, 800)
      } else {
        setStatus("error")
        message.error('Error Adding Chart, Please Try again!')
        setStatus("error")
      }
      

    } catch(err) {
      console.log(err)
    }
    
  }
  

  useEffect(() => {
    const oldChartData = async () => {
      let lgChartId: number = 0
      let lgChartDataId: number = 0
      const res = await axios("http://localhost:5100/api/v1/chart/")
      res.data.data.map((chart: any) => {
        chart.id >= lgChartId && (lgChartId = chart.id)
        chart.ChartData.map(({id}: any) => {
          id >= lgChartDataId && (lgChartDataId = id)
          return lgChartDataId
        })
        
        return lgChartId
      })
    }
    oldChartData()
  },[])

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className={css(styles.containerStyle)}>
      <Steps current={current} items={items} percent={precent} status={status}/>
      <div className={css(styles.contentStyle)}>
          {/* Progress Buttons in Steps */}
          <div style={{ margin: '3rem 8rem 0 0', alignSelf: 'flex-end'}}>
            {current > 0 && (
              <Button size='large' className={css(styles.stepBtnPrevStyle)} onClick={() => prev()} >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button 
                size='large'
                className={css(styles.stepBtnNextStyle)}
                type="primary" onClick={() => next()}
                >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                size='large'
                className={css(styles.stepBtnNextStyle)}
                type="primary"
                htmlType="submit"
                onClick={handleClick}
                >
                Done
              </Button>
            )}
          </div>
          {/* Content in Steps */}
          {steps[current].content}
        </div>
    </div>
  );
};



export default AddChart;
