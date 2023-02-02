import { Outlet, Navigate, useLocation } from 'react-router-dom'


const user = JSON.parse(localStorage.getItem("user") as any)
    
const AuthVerify = () => {
    const location = useLocation();
    
    return (user ? <Outlet />
                        : <Navigate to="/login"  state={{ from: location }} replace />)
} 

export default AuthVerify;