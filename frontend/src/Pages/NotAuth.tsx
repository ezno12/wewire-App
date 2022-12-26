import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  containerStyle: {
      margin: '3rem 0',
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'center',
      alignItems: 'center'
  },
  titleStyle: {
      'font-size': '12rem',
      'font-weight': 600,
      display: 'inline-block',
      color: 'black',
      margin: 0
  },
  parStyle: {
      fontStyle: 'normal',
      fontFamily: 'Roboto, sans-serif',
      fontSize: '8rem',
      fontWeight: 'bold'
  }
})


const NotAuth = () => {
  return (
    <>
    <NavBar />
    <div className={css(styles.containerStyle)}>
        <h2 className={css(styles.titleStyle)}>
        <FontAwesomeIcon icon={faLinkSlash} style={{color: 'red'}} />
        <span>4</span><span style={{color: 'red'}} >0</span><span>1</span>
        </h2>
        <p className={css(styles.parStyle)}>Not Found</p>
    </div>
    </>
  )
}

export default NotAuth;