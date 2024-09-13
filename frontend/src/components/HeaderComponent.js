import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle function for the mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [currentUser, setCurrentUser] = useState();
    const [registrationToggle, setRegistrationToggle] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        client.get("campaigns/user")
            .then(function (res) {
                setCurrentUser(true);
            })
            .catch(function (error) {
                setCurrentUser(false);
            });
    }, []);

    function update_form_btn() {
        if (registrationToggle) {
            document.getElementById("form_btn").innerHTML = "Register";
            setRegistrationToggle(false);
        } else {
            document.getElementById("form_btn").innerHTML = "Log in";
            setRegistrationToggle(true);
        }
    }

    function submitRegistration(e) {
        e.preventDefault();
        client.post(
            "campaigns/register",
            {
                email: email,
                username: username,
                password: password
            }
        ).then(function (res) {
            client.post(
                "campaigns/login",
                {
                    email: email,
                    password: password
                }
            ).then(function (res) {
                setCurrentUser(true);
            });
        });
    }

    function submitLogin(e) {
        e.preventDefault();
        client.post(
            "campaigns/login",
            {
                email: email,
                password: password
            }
        ).then(function (res) {
            setCurrentUser(true);
        });
    }

    function submitLogout(e) {
        e.preventDefault();
        client.post(
            "campaigns/logout",
            { withCredentials: true }
        ).then(function (res) {
            setCurrentUser(false);
        });
    }

    if (currentUser) {
        return (
            <nav className="bg-white md:px-14 p-4 max-w-screen-2xl mx-auto text-primary">
                <div className="text-lg container mx-auto flex justify-between items-center font-medium">
                    {/* Logo Section */}
                    <div className="flex space-x-14 items-center">

                        <h2 className="text-2xl font-bold">
                            <span className="text-black">Social</span>{" "}
                            <span className="text-blue-500">Awareness</span>
                        </h2>



                        {/* Desktop Menu */}
                        <ul className="md:flex space-x-12 hidden">
                            <li><Link  to="/home-campaign" className="block text-base hover:text-gray-300">Home</Link></li>
                            <li><Link to="/home-campaign" className="block text-base hover:text-gray-300">Campaigns</Link></li>
                            <li>
                                <Link to="/create-campaign" className="block text-base hover:text-gray-300">Create Campaign</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Desktop Login and Registration */}
                    <div className="space-x-12 hidden md:flex items-center text-base">
                        <Navbar.Text>
                            <form onSubmit={e => submitLogout(e)}>
                                <button
                                    type="submit"
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                >
                                    Log out
                                </button>
                            </form>
                        </Navbar.Text>


                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none focus:text-gray-300">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6">
                                <path d="M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="bg-gray-800 text-white md:hidden shadow-xl space-y-4 z-50 p-3 rounded-md text-right fixed">
                        <div className="flex flex-col items-center">
                            <ul className="flex flex-col space-y-3">
                                <li><Link to="/home-campaign" className="text-base hover:text-gray-300">Home</Link></li>
                                <li><Link to="/home-campaign" className="text-base hover:text-gray-300">Campaigns</Link></li>
                                <li> <Link to="/create-campaign" className="block text-base hover:text-gray-300">Create Campaign</Link></li>
                            </ul>
                            <Navbar.Text>
                                <form onSubmit={e => submitLogout(e)}>
                                    <button
                                        type="submit"
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                    >
                                        Log out
                                    </button>
                                </form>
                            </Navbar.Text>
                        </div>
                    </div>
                )}
            </nav>
        );
    }

    return (
        <div>

            <nav className="bg-white md:px-14 p-4 max-w-screen-2xl mx-auto text-primary">
                <div className="text-lg container mx-auto flex justify-between items-center font-medium">
                    {/* Logo Section */}
                    <div className="flex space-x-14 items-center">

                        <h2 className="text-2xl font-bold">
                            <span className="text-black">Social</span>{" "}
                            <span className="text-blue-500">Awareness</span>
                        </h2>

                        {/* Desktop Menu */}
                        <ul className="md:flex space-x-12 hidden">
                            <li><Link to="/home-campaign" className="block text-base hover:text-gray-300">Home</Link></li>
                            <li><Link to="/home-campaign" className="block text-base hover:text-gray-300">Campaigns</Link></li>
                        </ul>
                    </div>

                    {/* Desktop Login and Registration */}
                    <div className="space-x-12 hidden md:flex items-center text-base">
                        <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none focus:text-gray-300">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6">
                                <path d="M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="bg-gray-800 text-white md:hidden shadow-xl space-y-4 z-50 p-3 rounded-md text-right fixed">
                        <div className="flex flex-col items-center">
                            <ul className="flex flex-col space-y-3">
                                <li><Link to="/home-campaign" className="text-base hover:text-gray-300">Home</Link></li>
                                <li><Link to="/home-campaign" className="text-base hover:text-gray-300">Campaigns</Link></li>
                            </ul>
                        </div>

                        <Button id="form_btn" onClick={update_form_btn} variant="light">Register/login</Button>


                    </div>
                )}
            </nav>

            {
                registrationToggle ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <Form onSubmit={e => submitRegistration(e)} className="w-full max-w-lg space-y-6 bg-white p-8 shadow-lg rounded-lg">
                            {/* Email Address Field */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <Form.Text className="text-xs text-gray-600">

                                </Form.Text>
                            </Form.Group>

                            {/* Username Field */}
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Group>

                            {/* Password Field */}
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Group>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </Button>
                        </Form>

                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-screen">
                        <Form onSubmit={e => submitLogin(e)} className="w-full max-w-lg space-y-6 bg-white p-8 shadow-lg rounded-lg">
                            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                            {/* Email Address Field */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <Form.Text className="text-xs text-gray-600">
                                    {/* You can add a helper text here if needed */}
                                </Form.Text>
                            </Form.Group>

                            {/* Password Field */}
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Group>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </Button>
                        </Form>

                    </div>
                )
            }
        </div>
    );

}

export default Header;