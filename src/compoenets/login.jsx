import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiHide, BiShow } from 'react-icons/bi';
import { FaCheck, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginInterface() {
    const [formData, setFormData] = useState({ email: '', password: '' ,name:""});
    const [rememberMe, setRememberMe] = useState(true);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const registerUser = localStorage.getItem("registerdata") ? JSON.parse(localStorage.getItem("registerdata")) : {}
    const handleshow = () => {
        setShow(!show)
    }
    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    console.log(registerUser, "reg");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
             const newUser = {
        id: Date.now().toString(),
        name:registerUser? registerUser.username:"",
        email:formData.email,
        password:formData.password,
        createdAt: new Date().toISOString()
      };
      
            if (registerUser?.email == formData.email && registerUser?.password == formData.password) {
                toast.success('Login successful!');
                localStorage.setItem("isLogged", true)
                localStorage.setItem("userdata", JSON.stringify(newUser))
                setIsSubmitting(false);
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
            else {
                setIsSubmitting(false);
                toast.error('Password Or Email is Not Vaild');
            }

        } else {
            setIsSubmitting(false);
            toast.error('Something Went Wrong!!!');
        }
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };
    return (
        <div className="bg-gray-100 flex items-center justify-center p-4 min-h-screen">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2">

                {/* Left Side - Login Form */}
                <div className="p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-lg font-semibold text-gray-800">FinTrac</span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello,</h1>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back</h2>
                    </div>

                    <div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="space-y-6">
                                <div>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`w-full px-4 py-4 border rounded-xl focus:outline-none focus:ring-2 text-gray-900 transition-colors ${errors.email
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:ring-purple-500 focus:border-transparent'
                                            }`}
                                        placeholder="Email address"
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className='relative'>
                                    <input
                                        type={show ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`w-full px-4 py-4 pr-[35px border rounded-xl focus:outline-none focus:ring-2 text-gray-900 transition-colors ${errors.password
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:ring-purple-500 focus:border-transparent'
                                            }`}
                                        placeholder="Password"
                                    />
                                    <div
                                        onClick={handleshow}
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                                    >
                                        {show ? <BiShow className="w-5 h-5 text-gray-400" /> : <BiHide className="w-5 h-5 text-gray-400" />}
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${rememberMe
                                            ? 'bg-purple-600 border-purple-600'
                                            : 'border-gray-300 hover:border-purple-400'
                                            }`}>
                                            {rememberMe && <FaCheck className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="ml-3 text-gray-700">Remember me</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors ${isSubmitting
                                            ? 'bg-purple-400 text-white cursor-not-allowed'
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                        }`}
                                >
                                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link to={"/register"}>
                            <button className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Side - Illustration */}
                <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 p-12 flex items-center justify-center relative overflow-hidden">
                    {/* Background Clouds */}
                    <div className="absolute top-8 left-8 w-20 h-12 bg-white bg-opacity-30 rounded-full"></div>
                    <div className="absolute top-12 left-20 w-16 h-10 bg-white bg-opacity-20 rounded-full"></div>
                    <div className="absolute top-16 right-12 w-24 h-14 bg-white bg-opacity-25 rounded-full"></div>
                    <div className="absolute top-8 right-24 w-18 h-11 bg-white bg-opacity-30 rounded-full"></div>
                    <div className="absolute bottom-20 left-6 w-22 h-13 bg-white bg-opacity-20 rounded-full"></div>
                    <div className="absolute bottom-24 left-16 w-16 h-10 bg-white bg-opacity-25 rounded-full"></div>
                    <div className="absolute bottom-16 right-8 w-20 h-12 bg-white bg-opacity-30 rounded-full"></div>

                    {/* Main Illustration Container */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Success Checkmark */}
                        <div className="absolute -top-16 -left-8 bg-white rounded-full p-3 shadow-lg">
                            <FaCheck className="w-6 h-6 text-green-500" />
                        </div>

                        {/* Phone Mockup */}
                        <div className="bg-pink-400 rounded-3xl p-6 transform rotate-12 shadow-2xl relative">
                            <div className="bg-pink-300 rounded-2xl p-8 w-48 h-80 relative">
                                {/* Phone Screen Content */}
                                <div className="absolute top-4 right-4 w-6 h-6 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Character */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                            {/* Character Body */}
                            <div className="relative">
                                {/* Head */}
                                <div className="w-16 h-16 bg-amber-100 rounded-full relative mb-2">
                                    <div className="absolute top-3 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                                    <div className="absolute top-3 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-amber-800 rounded-full"></div>
                                </div>

                                {/* Body */}
                                <div className="w-20 h-24 bg-yellow-400 rounded-2xl relative">
                                    <div className="absolute top-2 left-2 w-4 h-16 bg-yellow-500 rounded-full"></div>
                                    <div className="absolute top-2 right-2 w-4 h-16 bg-yellow-500 rounded-full"></div>
                                </div>

                                {/* Arms */}
                                <div className="absolute top-16 -left-6 w-12 h-6 bg-yellow-400 rounded-full transform -rotate-12"></div>
                                <div className="absolute top-14 -right-8 w-16 h-6 bg-yellow-400 rounded-full transform rotate-45"></div>

                                {/* Legs */}
                                <div className="absolute bottom-0 left-2 w-6 h-12 bg-gray-200 rounded-full"></div>
                                <div className="absolute bottom-0 right-2 w-6 h-12 bg-gray-200 rounded-full"></div>

                                {/* Feet */}
                                <div className="absolute -bottom-2 left-0 w-8 h-4 bg-gray-800 rounded-full"></div>
                                <div className="absolute -bottom-2 right-0 w-8 h-4 bg-gray-800 rounded-full"></div>

                                {/* Backpack */}
                                <div className="absolute top-8 -right-2 w-8 h-12 bg-gray-800 rounded-lg"></div>
                            </div>
                        </div>

                        {/* Security Lock */}
                        <div className="absolute bottom-12 right-8 bg-white rounded-2xl p-4 shadow-lg">
                            <FaLock className="w-8 h-8 text-purple-600" />
                            <div className="w-4 h-2 bg-purple-600 rounded-full mt-1 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}