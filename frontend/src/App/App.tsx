import React, {useState, useMemo} from 'react';
import Main from '../Pages/Main';
import AddUser from '../Pages/AddUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Pages/Login';
//import ChangeData from '../Pages/ChangeData';
import { Route, Routes} from 'react-router-dom';
import Table from '../Components/Table/Table'
import Error from '../Pages/Error';
import { AdminRoute } from '../Hooks/ProtectedRoute';


function App() {
  //const user = JSON.parse(localStorage.getItem("user") as any)
  const [user, setUser] = useState();
  console.log("user is: ",user)
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  console.log("value is:", value)
  return (
      <Routes>
        {/* Public Routing */}
        <Route path="login"  element={<Login />}/>

        {/* Admin Routing */}
          <Route element={<AdminRoute />}>
            <Route path="/" element={<Main />}/> 
            <Route path="/adduser" element={<AddUser/>}/>
            <Route path="/users" element={<Table/>} /> 
          </Route>
        <Route path="*" element={<Error />} />
      </Routes>
  );
}

export default App;
