import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children, redirectTo}) {

    const { isLoggedIn } = useContext(AuthContext)
    return isLoggedIn ? children : <Navigate to={redirectTo} />
}
