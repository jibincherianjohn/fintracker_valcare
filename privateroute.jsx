import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './src/pages/auth/loginpage';
import App from './src/App';
import Register from './src/pages/auth/registerpage';
import Home from './src/pages/dashboard/home';
import TransactionHistory from './src/compoenets/transcations';
import Notfound from './src/pages/notfound/notfound';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isLogged");
    return isAuthenticated ? children : <Navigate to="/login" />;
};
const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isLogged");
    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

const Approute = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
                <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
                {/* privateroutes */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <App />
                        </PrivateRoute>
                    }

                >
                    <Route index element={<Navigate to={'/dashboard'} replace />} />
                    <Route path='dashboard' element={<Home/>} />
                    <Route path='/transactions' element={<TransactionHistory/>} />
                </Route>
                <Route path='/*' element={<Notfound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Approute
