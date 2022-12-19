import React from 'react';
import Main from '../Pages/Main';
import AddUser from '../Pages/AddUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Pages/Login';
import ChangeData from '../Pages/ChangeData';
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom';
import Table from '../Components/Table/Table'



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/" exact component={Main}/>
        <Route path="/Adduser" exact component={AddUser}/>
        <Route path="/table" exact component={Table} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
