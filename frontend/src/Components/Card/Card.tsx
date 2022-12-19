import React from 'react'
import {Card }from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite'
import { type } from '@testing-library/user-event/dist/type';


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
  }
})

type cardProps = {
  img: string,
  title: string
}


const card = ({img, title}: cardProps) => {
  
  return (
    <>
    <Card className={css(styles.cardStyle)} >
      <Card.Img variant="top" className={css(styles.cardImg)} src={img}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
    </>
  )
}
export default card
