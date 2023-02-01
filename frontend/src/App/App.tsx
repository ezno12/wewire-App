import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes} from 'react-router-dom';
import { AdminRoute } from '../Hooks/ProtectedRoute';
import Main from '../Pages/Main';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import UserList from '../Pages/UserList'
import Error from '../Pages/Error';
import Chart from '../Pages/ChartPage';



function App() {
  
  return (
      <>
      <Routes>
        {/* Public Routing */}
        <Route path="login"  element={<Login />}/>

        {/* Admin Routing */}
          <Route element={<AdminRoute />}>
            <Route path="/" element={<Main />}/> 
            <Route path="chart"  element={<Chart />}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/users" element={<UserList/>} />
          </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      </>
  );
}

export default App;
