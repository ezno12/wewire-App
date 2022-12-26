import React, {useEffect, useState} from 'react'
import Card from './Card'
import { StyleSheet, css } from 'aphrodite'
import maImg from '../../assat/departements/management.webp'
import mainImg from '../../assat/departements/maintenance.webp'
import quaImg from '../../assat/departements/quality.webp'
import secImg from '../../assat/departements/security.webp'
import envImg from '../../assat/departements/enviroment.webp'
import engImg from '../../assat/departements/engineering.webp'
import logImg from '../../assat/departements/logistics.webp'
import itImg from '../../assat/departements/it.webp'
import prodImg from '../../assat/departements/production.webp'
import  rhImg from '../../assat/departements/humanresource.webp'



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
    const DeparImg = [rhImg, prodImg, itImg, logImg, engImg, envImg, secImg, quaImg, mainImg, maImg]
    const [Departements, setDepar] = useState<any[]>();
    useEffect(() =>{
      const cardsItem = async () => {
        const res = await fetch("http://localhost:5100/api/v1/DeparList")
        const data = await res.json()
        setDepar(data)
      }
      cardsItem();
    }, [])

    return (
      <>
      <h1 className={css(styles.headerText)}>CHOOSE YOUR <span className={css(styles.headerTextSpan)}>SECTION</span></h1>
      <div className={css(styles.cardStyle)}> 
      
        {Departements && Departements.slice(0,10).map((items, index) => {
          return <Card key={items.id} title={items.title + " - " + items.arTitle} img={DeparImg[index]}/>
        })
        }
    </div>
      </>
    )
  }



export default Cards

