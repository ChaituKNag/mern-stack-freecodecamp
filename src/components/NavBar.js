import React from 'react';
import { Link } from 'react-router-dom';

const routes = [
    { to: "/", label: "Exercises"},
    { to: "/create", label: "Create Exercise Log"},
    { to: "/user", label: "Create User"}
]

const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Exercise Tracker</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {routes.map(route => (
                        <li className="navbar-item" key={route.to}>
                            <Link to={route.to} className="nav-link">{route.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
