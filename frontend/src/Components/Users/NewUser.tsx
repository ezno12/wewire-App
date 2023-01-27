import React, { useState, useReducer, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Input, Progress, Alert, message } from 'antd';
import {css, StyleSheet} from 'aphrodite'
import '../../style/global.css'
import axios, { AxiosResponse } from 'axios';

const styles = StyleSheet.create({
  InputContainer: {
    display: 'flex',
    gap: '1rem',
    maxHeight: '3.5rem',
    height: '3.5rem',
  }, 
  InputStyle: {
    width: '17.5rem',
    maxWidth: '17.5rem',
  },
  selectStyle: {
    width: '17.5rem',
    maxWidth: '17.5rem',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 6,
    border: '1px solid rgb(217, 217, 217)',
    ':hover': {
      borderColor: '#4096ff',
      borderInlineEndWidth: 1
    },
  },
  addUserBtnStyle: {
    backgroundColor: 'rgba(255, 26, 26)',
    borderColor: 'rgba(255, 26, 26)',
    ':hover': {
      backgroundColor: 'rgba(255, 26, 26, 0.8)'
    }
  },
  saveUserBtnStyle: {
    backgroundColor: 'green',
    borderColor: 'green',
    ':hover': {
      backgroundColor: '#52c41a',
      borderColor: '#52c41a',
    }
  },
  showAlertStyle: {
    visibility: 'visible'
  },
  hideAlertStyle : {
    display: 'none',
    
  }
})


const departements = [
  {key: 0, value: 'Regular User'}, {key: 1, value: 'Management'} , {key: 2, value: 'Maintenance'},
  {key: 3, value: 'Quality'}, {key: 4, value: 'Security'} , {key: 5, value: 'Environment'},
  {key: 6, value: 'IE'}, {key: 7, value: 'Logistic'} , {key: 8, value: 'IT'},
  {key: 9, value: 'Production'}, {key: 10, value: 'RH'}
]



function NewUser() {
  const user = JSON.parse(localStorage.getItem('user') as any);
  const [show, setShow] = useState(false);
  const [percent, setPercent] = useState<number>()
  const initialState = {username: "", permission: "", email: "", phone: "", password: "", Cpassword: ""}
  const errInitialState = { err: false, message: ""}
  const [errorCheck, setErrorCheck] = useReducer(
    (state: any, updates: any) => ({ ...state, ...updates }), errInitialState )
  const [userState, updateUserState] = useReducer(
    (state: any, updates: any) => ({ ...state, ...updates }), initialState)

  const handleClose = () => {
      setShow(false)
      updateUserState({username: "", permission: "", email: "", phone: "", password: "", Cpassword: ""})
      setErrorCheck({ err: false, message: ""})
      setPercent(0)
    };
  const handleShow = () => setShow(true);

  useEffect(()=> {
    let num = 5
    console.log("user state", userState)
    Object.values(userState).every((item) =>{
      item !== "" && (num += 15)
      console.log("num",num, item)
      return num
    })
    setPercent(num)
  }, [userState])

  const handleAddUser = () => {
    
          if( userState.password === userState.Cpassword) {
            try{
              axios.post("http://localhost:5100/api/v1/adduser",
              {
                permission: userState.permission,
                username: userState.username,
                email: userState.email,
                phone: userState.phone,
                password: userState.password,
                isAdmin: false
              },
              { headers: {
                Authorization: `Bearer ${user}` 
              },
            })
              .then((res: AxiosResponse<any>) => {
                if(!res.data.err) {
                  setErrorCheck({err: false, message: ""})
                  setPercent(100)
                  setTimeout(()=>{
                    handleClose()
                    message.success('User added successfully!')
                  }, 2000)
                  
                } else if (res.data.err) {
                  setErrorCheck({err: res.data.err, message: res.data.message})
                } else {
                  setErrorCheck({ err: true, message: "Error while Adding User"})
                }
              })
              
            }catch(err) {
              console.log(err)
            }
    
          }
    
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={css(styles.addUserBtnStyle)}>
        New User
      </Button>

      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton>
          <Modal.Title>
            {!errorCheck.err ? null
            : <Alert
                showIcon closable message={errorCheck.message}
                className={ errorCheck.err ? css(styles.showAlertStyle) : css(styles.hideAlertStyle)}
                type="error"/>}
            </Modal.Title>
        </Modal.Header>
        <Progress
          percent={percent}
          width={80}
          strokeColor={{ '0%': 'green', '100%': '#52c41a' }}
          style={{maxWidth:'98%', marginInline: 'auto'}}
          />
        <Modal.Body style={{maxHeight: '17.5rem', height: '17.5rem'}}>
        <Form>
        <div className={css(styles.InputContainer)} style={{marginBottom: '1.5rem'}}>
        <Form.Item
        name="username"
        label="Username"
        labelAlign="right"
        rules={[{ required: true, message: 'Please add a username!', whitespace: false }]}
      >
        <Input className={css(styles.InputStyle)} onChange={(e) => updateUserState({username: e.target.value})}/>
      </Form.Item>
      <Form.Item
        name="departement"
        label="Departement"
        rules={[{ required: true, message: 'Please Choose a Option!', whitespace: false }]}
      >
        <select 
                className={css(styles.selectStyle)}
                onChange={(e) => updateUserState({permission: e.target.value})}
            >
          <option key={100}></option>
          {departements.map((item)=> {
            return <option value={item.key} key={item.key}>{item.value}</option>
          })}
        </select>
      </Form.Item>
      </div>
      <div className={css(styles.InputContainer)} style={{marginBottom: '1.5rem'}}>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please add your E-mail!',
          },
        ]}
      >
        <Input className={css(styles.InputStyle)} onChange={(e) => updateUserState({email: e.target.value})}/>
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        labelAlign="right"
        rules={[
          {
            pattern: /[0-9]{8}/,
            max: 8,
            message: 'The input is not valid Phone Number!',
          },
          { required: true, message: 'Please add a Phone Number!', whitespace: false }
        ]}
      >
        <Input className={css(styles.InputStyle)} onChange={(e) => updateUserState({phone: e.target.value})}/>
      </Form.Item>
      </div>
      <div className={css(styles.InputContainer)}>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            pattern: /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!?@#$%^&*()\-__+.]){1,}).{8,}$/,
            message: 'Need length of 8, 2 uppercase letters, 1 special letter, 2 digits, 3 lowercase letters.'
          },
          {
            required: true,
            message: 'Please add your Password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password className={css(styles.InputStyle)} onChange={(e) => updateUserState({password: e.target.value})}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('You entered two different passwords!'));
            },
          }),
        ]}
      >
        <Input.Password className={css(styles.InputStyle)} onChange={(e) => updateUserState({Cpassword: e.target.value})}/>
      </Form.Item>
      </div>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Cancel
          </Button>
          <Button
              variant="primary"
              onClick={handleAddUser}
              className={css(styles.saveUserBtnStyle)}
              >
            Save user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewUser;