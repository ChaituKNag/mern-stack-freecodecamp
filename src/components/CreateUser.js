import React, { useState } from 'react';
import axios from 'axios';
import {SERVER_APP_ROOT} from '../constants';

const CreateUser = () => {

    const [username, setUsername] = useState('');

    const handleInputChange = e => {
        const { value } = e.target;
        setUsername(() => value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(username);

        axios.post(`${SERVER_APP_ROOT}/users/add`, {
            username
        }).then((res) => {
            console.log(res.data);
            setUsername(uName => "");
        })

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        onChange={handleInputChange}
                        className="form-control"
                        value={username}
                    />
                    
                </div>
                <div className="form-group">
                    <input 
                        type="submit" 
                        value="Create User" 
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateUser
