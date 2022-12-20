import React from 'react';
import Cards from '../Components/Card/Cards';
import NavBar from '../Components/NavBar/NavBar';
//import { VerticalBar } from '../Components/Chart/VerticalBar';


export class Main extends React.Component {
  render() {
    return (
      <>
      <NavBar />
      <Cards />
      </>
    )
  }
}

export default Main