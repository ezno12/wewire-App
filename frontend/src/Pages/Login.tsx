import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assat/wewire.png'
import profile from '../assat/add.png'

const styles = StyleSheet.create({
    formStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        'margin-inline': 'auto',
        padding: '2rem'
    },
    rembermeStyle: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5rem'
    },
    inputStyle: {
        marginTop: '0.2rem',
        borderRadius: '1.6rem',
        padding: '.5rem',
        width: '20rem',
        borderColor: 'grey',
        backgroundColor: '#c8c8c8 ',
        ':focus': {
            outline: 'none',
            borderColor: '#ff1a1a'
        }
    },
    buttonStyle: {
        padding: '0.6rem 8.6rem',
        borderRadius: '1.6rem',
        backgroundColor: '#ff1a1a',
        border: 'none',
        ':hover':{
            backgroundColor: '#ff4d4d'
            
        },
    },
    forgetStyle: {
        color: '#ff1a1a' ,
        textDecoration: 'none',
    },
    profileImgeStyle: {
      height: '6rem',
      display: 'flex',
      justifyContent: 'center'
    }
})


export class Login extends Component {
  render() {
    return (
      <>
       
        <form className={css(styles.formStyle)}>
        <div className={css(styles.profileImgeStyle)}><img src={profile} alt="" /></div>
          <h1>Sign in</h1>
          <div>
            <label htmlFor="username">User name</label>
            <div>
            <input type="text" id="username" className={css(styles.inputStyle)}/>
            </div>
          </div>

          <div data-validate="Password is required">
            <label htmlFor="pass">Password</label>
            <div>
            <input type="password" id="pass" className={css(styles.inputStyle)}/>
            </div>
          </div>

          <div className={css(styles.rembermeStyle)}>
            <div>
              <input type="checkbox" value="lsRememberMe" id="rememberMe" style={{accentColor: 'red'}}/>
              <label htmlFor="rememberMe" style={{padding: 5}}>Remember me</label>
            </div>

            <div>
              <a href="#" className={css(styles.forgetStyle)}>
                Forget Password?
              </a>
            </div>
          </div>

          <div>
            <Button className={css(styles.buttonStyle)} type="submit">
              Login
            </Button>
          </div>
          <div>
            <img src={logo} alt="company logo" />
          </div>
        </form>
      </>
    );
  }
}

export default Login