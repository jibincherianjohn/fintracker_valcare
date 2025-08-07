import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './src/pages/Auth/loginpage';
import App from './src/App';
import Register from './src/pages/Auth/registerpage';
import Home from './src/pages/dashboard/home';
import TransactionHistory from './src/compoenets/transcations';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isLogged");
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const Approute = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
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
            </Routes>
        </BrowserRouter>
    )
}

export default Approute
