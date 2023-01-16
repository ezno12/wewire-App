import React, { useState } from 'react';
import { Button, message, Steps, Form, Input, Card, Segmented } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {css, StyleSheet } from 'aphrodite';
import '../../style/global.css'
import AddTable from '../Table/AddChartTable'
import pie from '../../assat/pie.webp';
import bar from '../../assat/bar.webp';
import rose from '../../assat/rose.webp'

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
      display: 'flex',
      flexFlow: 'row wrap',
      margin: '0.5rem 0'
    }
})

// Component of First Step
const FistStep: React.FC = () => {

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };
  
  return (
    <Form name="dynamic_form_item"  onFinish={onFinish}>
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('You Need to Add Departement'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <div className={css(styles.formItemStyle)}>
            {fields.map((field, index) => (
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
                      message: "Please Add Valide Text.",
                    },
                  ]}
                  noStyle
                >
                <Input placeholder="Add Text here" style={{ width: '24rem', height: '2.5rem' }} />
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
            ))}
            { fields.length <= 1 ? (<Form.Item style={{width: '24rem'}}>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '90%', marginLeft: '19.5px' }}
                icon={<PlusOutlined />}
                size="large"
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>)
            : null
            }
          </div>
        )}
      </Form.List>
    </Form>
  );
}

// Component of Second Step
const SecondStep: React.FC = () => {
  const [value, setValue] = useState('Pie Chart');

  const onChange = (item: any) => {
    setValue(item);
  };


  return (
    <>
    <Segmented
    className={css(styles.segmentedStyle)}
    size='large'
    options={['Pie Chart', 'Rose Chart', 'Bar Chart']}
    onChange={(item) => onChange(item)}
    />
    { value === 'Pie Chart' &&
     <Card
     hoverable
     style={{ width: 240, margin: '2rem 0 1rem 0' }}
     cover={<img className={css(styles.cardImgStyle)} alt="Pie Chart Example" src={pie} />}
     >
      <Meta title="Pie Chart" style={{textAlign: 'center'}}/>
      </Card>}
     { value === 'Rose Chart' &&
     <Card
     hoverable
     style={{ width: 240, margin: '2rem 0 1rem 0' }}
     cover={<img className={css(styles.cardImgStyle)} alt="Rose Chart Example" src={rose} />}
     ><Meta title="Rose Chart" style={{textAlign: 'center'}}/>
     </Card>}
     { value === 'Bar Chart' &&
     <Card
     hoverable
     style={{ width: 240, margin: '2rem 0 1rem 0' }}
     cover={<img className={css(styles.cardImgStyle)} alt="Bar Chart Example" src={bar} />}
     ><Meta title="Bar Chart" style={{textAlign: 'center'}}/>
     </Card>}
   </>
  );
}


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

const AddChart: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [precent, setPercent] = useState<number>(8)

  const next = () => {
    setCurrent(current + 1);
    setPercent(precent + 40)
  };

  const prev = () => {
    setCurrent(current - 1);
    setPercent(precent - 40)
  };
  const handleClick = async () => {
    message.success('Processing complete!')
    setTimeout(() => setPercent(100), 800)
  }
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className={css(styles.containerStyle)}>
      <Steps current={current} items={items} percent={precent}/>
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
