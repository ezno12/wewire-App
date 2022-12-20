import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import logo from '../../assat/wewire.png'
import logOutIcon from '../../assat/logout.png'
import { Link } from 'react-router-dom'

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
  const user = JSON.parse(localStorage.getItem('user') as any);
  

  const HandleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <nav className={css(styles.navStyle)}>
  <Link to={'/'}><img src={logo} alt="Wewire company logo" /></Link>

  <div>
    <ul className={css(styles.listStyle)}>
      <li>
        <Link to={'/Adduser'} className={css(styles.linkStyle)}>Add user</Link>
      </li>
      <li>
        <a href="" className={css(styles.linkStyle)} >Profile</a>
      </li>
      <li>
        <Link to={'/login'} onClick={HandleLogOut} className={css(styles.linkStyle)}> Log Out <img src={logOutIcon} className={css(styles.logOutIconStyle)} /></Link>
      </li>
    </ul>
  </div>
</nav>
  )
}
