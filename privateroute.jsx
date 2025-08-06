import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './src/pages/Auth/loginpage';
import App from './src/App';
import Register from './src/pages/Auth/registerpage';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("Is_logged");
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


                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Approute
