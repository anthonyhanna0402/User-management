import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const RequireAuth = ({isAuth=null, isAdmin, children}) => {
  const [cookies] = useCookies(['userLogin']);
  
  if(cookies.userLogin) {
    if(isAuth) {
      return <Navigate to="/" />
    }
    if(!isAuth && userLogin?.email !=='admin@admin.com') {
      return children
    }
    if(isAdmin && userLogin?.email==='admin@admin.com') {
      return children
    } else {
      return isAuth ?children:<Navigate to='/login' />
    }
  }
};

export default RequireAuth;