import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExerciseList = () => {

    const [exercises, setExercises] = useState(null);

    const getAllExercises = () => {
        axios.get('http://localhost:5000/api/exercises')
        .then(res => {
            if(res.data.length > 0) {
                console.log(res.data);
                setExercises(res.data);
            }
        })
    }

    const handleDelete = (id) => () => {
        axios.delete(`http://localhost:5000/api/exercises/${id}`)
            .then((res) => {
                if(res.data) {
                    setExercises(prevExercises => prevExercises.filter(e => id !== e._id));
                }
            })
    }

    useEffect(() => {
        getAllExercises();
    }, []);

    return (
        <div className="container">
            <h3>Logged Exercises</h3>
            { exercises && exercises.length > 0 && (
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exercises.map(exercise => (
                                <tr key={exercise._id}>
                                    <td>{exercise.username}</td>
                                    <td>{exercise.description}</td>
                                    <td>{exercise.duration}</td>
                                    <td>{exercise.date.toString()}</td>
                                    <td>
                                        <Link to={`/edit/${exercise._id}`}>Edit</Link>
                                        {` | `}
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={handleDelete(exercise._id)}
                                        >╳</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ExerciseList
