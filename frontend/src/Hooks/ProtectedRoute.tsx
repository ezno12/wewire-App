import { Outlet, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import  jwt_decode from "jwt-decode"
import { useEffect } from 'react'

let access: any = {}
const user = JSON.parse(localStorage.getItem("user") as any)
    try {
        access = jwt_decode(user)
    } catch(err) {
        console.log('Please Login, You Need to Have Access Token')
    }
export const AdminRoute = () => {
    const location = useLocation();
    useEffect(()=> {
      if (access.exp * 1000 < Date.now()) {
        localStorage.clear()
      }
    },[location])
    return (access.isAdmin ? <Outlet />
                        : <Navigate to="/login"  state={{ from: location }} replace />)
} 

