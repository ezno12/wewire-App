import React from 'react';
import Main from '../Pages/Main';
import AddUser from '../Pages/AddUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Pages/Login';
import ChangeData from '../Pages/ChangeData';
import { BrowserRouter , Switch, Route} from 'react-router-dom';
import Table from '../Components/Table/Table'



function App() {
  const user = localStorage.getItem('user');
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}/>
        {user ? <Route path="/" exact component={Main} /> : <Login />}
        <Route path="/Adduser" exact component={AddUser}/>
        <Route path="/table" exact component={Table} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
