import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import logo from '../../assat/wewire.png'
import logOutIcon from '../../assat/logout.png'

const styles = StyleSheet.create({
    navStyle: {
        display: 'flex',
        'justifyContent': 'space-between',
        alignItems: 'center',
        padding: '1.5rem 4rem',
        position: 'relative'
    },
    listStyle: {
        display: 'flex',
        gap: '5rem',
        alignItems: 'center',
        listStyleType: 'none',
    },
    logOutIconStyle: {
        maxWidth: '1rem',
        maxHeight: '1rem',
        marginLeft: 5
    },
    linkStyle: {
        textDecoration: 'none',
        color: 'black',
        fontFamily: ["Roboto", "sans-serif"],
        fontStyle:  'normal',
        padding: '0.7rem',
        ':hover': {
          cursor: 'pointer',
          border:  '2px solid #ff1a1a',
          borderRadius: '1.6rem',
          
        }
    }
})

export default function NavBar() {
  return (
    <nav className={css(styles.navStyle)}>
  <a><img src={logo} alt="Wewire company logo" /></a>

  <div>
    <ul className={css(styles.listStyle)}>
      <li>
        <a href="" className={css(styles.linkStyle)}>Add user</a>
      </li>
      <li>
        <a href="" className={css(styles.linkStyle)} >Profile</a>
      </li>
      <li>
        <a href="" className={css(styles.linkStyle)}>Log Out <img src={logOutIcon} className={css(styles.logOutIconStyle)} /></a>
      </li>
    </ul>
  </div>
</nav>
  )
}
