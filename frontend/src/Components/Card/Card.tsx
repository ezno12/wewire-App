import React from 'react'
import {Card }from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router-dom';


const styles = StyleSheet.create({
  cardImg: {
    height: '6.5rem',
    width: '10.5rem',
    padding: '1rem',
    marginLeft: '4%'
  },
  cardStyle: {
    width: '12rem',
    ':hover': {
      backgroundColor: 'red'
    }
  },
  cardTitleStyle: {
    color: 'black',
    textDecoration: 'none',
    lineHeight: '3rem',
    fontSize: '1rem'
  }
})

type cardProps = {
  img: string,
  title: string,
  deparName: string
}


const card = ({img, title, deparName}: cardProps) => {
  
  return (
    <>
    <Link to={`/chart/:${deparName}`} className={css(styles.cardTitleStyle)}>
    <Card className={css(styles.cardStyle)}>
      <Card.Img variant="top" className={css(styles.cardImg)} src={img}/>
      <Card.Body>
        <Card.Title className={css(styles.cardTitleStyle)}>{title}</Card.Title>
      </Card.Body>
    </Card>
    </Link>
    </>
  )
}
export default card

