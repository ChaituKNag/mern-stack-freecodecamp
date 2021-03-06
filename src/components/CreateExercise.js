import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {SERVER_APP_ROOT} from '../constants';

const CreateExercise = ({history}) => {

    const [users, setUsers] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(() => ({
        username: '',
        description: '',
        duration: 0,
        date: null
    }));

    const handleChange = fieldName => e => {
        e.persist();
        setCurrentExercise(cExercise => ({
            ...cExercise,
            [fieldName]: e.target.value
        }))
    };

    const handleDateChange = date => setCurrentExercise(cExercise => ({
        ...cExercise,
        date
    }));

    const handleSubmit = e => {
        e.preventDefault();

        console.log(currentExercise);
        axios.post(`${SERVER_APP_ROOT}/exercises/add`, currentExercise)
            .then(res => {
                console.log(res.data);
                history.push('/');
            });
    }

    // will be removed for actual data
    useEffect(() => {
        axios.get(`${SERVER_APP_ROOT}/users`)
            .then(res => {
                if(res.data.length > 0) {
                    setUsers(res.data.map(user => user.username));
                    setCurrentExercise(cExercise => ({
                        ...cExercise,
                        username: res.data[0].username
                    }))
                }
            })
    }, []);

    return (
        <div className="container">
            <h3>Create New Exercise Log</h3>
            { users && <form noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="usersList">Username: </label>
                    <select 
                        name="username" 
                        id="usersList" 
                        onChange={handleChange('username')}
                        className="form-control"    
                    >
                        {users.map(user => <option key={user} value={user}>{user}</option>)}
                    </select>

                </div>

                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        name="description"
                        id="description"
                        value={currentExercise.description}
                        onChange={handleChange('description')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Duration (in minutes): </label>
                    <input type="text"
                        required
                        className="form-control"
                        name="duration"
                        id="duration"
                        value={currentExercise.duration}
                        onChange={handleChange('duration')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <div>
                        <DatePicker 
                            selected={currentExercise.date}
                            onChange={handleDateChange}
                            className="form-control"
                            id="date"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                </div>
            </form> }
        </div>
    )
}

export default CreateExercise
