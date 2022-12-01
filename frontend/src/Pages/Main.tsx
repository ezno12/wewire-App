import React from 'react';
import Cards from '../Components/Card/Cards';
import NavBar from '../Components/NavBar/NavBar';


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