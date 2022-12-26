import { Outlet, Navigate, useLocation} from 'react-router-dom'
import  jwt_decode from "jwt-decode"


export const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user") as any)
    const access: any = jwt_decode(user)
    const location = useLocation();

    return (access.isAdmin ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />)
}

