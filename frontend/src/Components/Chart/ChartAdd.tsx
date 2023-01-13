import React, { useState } from 'react';
import { Button, message, Steps, Form, Input, Radio, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {css, StyleSheet } from 'aphrodite'
import type { RadioChangeEvent } from 'antd';

const styles = StyleSheet.create({
    containerStyle: {
        maxWidth: '80%',
        marginInline: 'auto',
    },
    contentStyle : {
        height: '40rem',
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
      margin: '4rem 0'
    },
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

// Component of First Step
const SecondStep: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
    <Radio.Group onChange={onChange} value={value} size="large">
      <Radio value={1}>
      </Radio>
      <Radio value={2}></Radio>
      <Radio value={3}></Radio>
      <Radio value={4}></Radio>
    </Radio.Group>
     { value === 2 &&
     <Card
     hoverable
     style={{ width: 240, marginTop: '2rem' }}
     cover={<img alt="Pie Chart Image" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
     />}
     { value ===3 &&
     <Card
     hoverable
     style={{ width: 240, marginTop: '2rem' }}
     cover={<img alt="Pie Chart Image" src="https://media.geeksforgeeks.org/wp-content/uploads/20220914112521/PieChart.png" />}
     />}
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
    content: <FistStep />,
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
    await message.success('Processing complete!')
      .then(() => setPercent(100)) 
  }
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className={css(styles.containerStyle)}>
      <Steps current={current} items={items} percent={precent}/>
      <div className={css(styles.contentStyle)}>
          {/* Progress Buttons in Steps */}
          <div style={{ margin: '3rem 8rem 0 0', alignSelf: 'flex-end'}}>
            {current > 0 && (
              <Button size='large' style={{ margin: '0 .5rem' }} onClick={() => prev()} >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button 
                size='large'
                style ={{width: '5.891rem'}}
                type="primary" onClick={() => next()}
                >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                size='large'
                style ={{width: '5.891rem'}}
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
