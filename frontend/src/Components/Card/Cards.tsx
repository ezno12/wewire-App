import React from 'react'
import Card from './Card'
import { StyleSheet, css } from 'aphrodite'
import { Departements } from '../../data'


const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center'
    },
    headerTextSpan: {
        color: 'red'
    },
    cardStyle: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexFlow: 'row wrap',
      margin:'5rem 2rem'
    }
})

const Cards = () => {

    return (
      <>
      <h1 className={css(styles.headerText)}>CHOOSE YOUR <span className={css(styles.headerTextSpan)}>SECTION</span></h1>
      <div className={css(styles.cardStyle)}> 
        {Departements.map((items) => {
          return <Card key={items.id} img={items.img} title={items.title}/>
        })}
    </div>
      </>
    )
  }



export default Cards

