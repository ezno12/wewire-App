import React, {useState, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes} from 'react-router-dom';
import { AdminRoute } from '../Hooks/ProtectedRoute';
import Main from '../Pages/Main';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import UserList from '../Pages/UserList'
import AddUser from '../Pages/AddUser';
import Error from '../Pages/Error';
import Chart from '../Pages/ChartData';



function App() {
  //const user = JSON.parse(localStorage.getItem("user") as any)
  const [user, setUser] = useState();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
      <Routes>
        {/* Public Routing */}
        <Route path="login"  element={<Login />}/>
        <Route path="chart" element={<Chart />} />

        {/* Admin Routing */}
          <Route element={<AdminRoute />}>
            <Route path="/" element={<Main />}/> 
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/users" element={<UserList/>} />
            <Route path="/adduser" element={<AddUser/>} /> 
          </Route>
        <Route path="*" element={<Error />} />
      </Routes>
  );
}

export default App;
