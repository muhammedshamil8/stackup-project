import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout(){
   
    return (
        <div>
          <div className="login-signup-form">
            <Outlet />
            </div>
          </div>
    )
}
