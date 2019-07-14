const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const {routeErrorCatch} = require('../utils/common.utils');

router.route('/').get(async (req, res) => {
    const exercises = await Exercise.find().catch(err => routeErrorCatch(res, err));
    res.json(exercises);
});

router.route('/add').post(async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username, description, duration, date
    })

    await newExercise.save().catch(err => routeErrorCatch(res, err));
    
    res.json('Exercise added!');
});

router.route('/:id').get(async (req, res) => {

    const exercise = (
        await Exercise
            .findById(req.params.id)
            .catch(err => routeErrorCatch(res, err))
    );
    
    res.json(exercise);
});

router.route('/:id').delete(async (req, res) => {
    await (
        Exercise
            .findByIdAndDelete(req.params.id)
            .catch(err => routeErrorCatch(res, err))
    );
    res.json('Exercise deleted!');
});

router.route('/update/:id').post(async (req, res) => {
    const exercise = (
        await Exercise
            .findById(req.params.id)
            .catch(err => routeErrorCatch(res, err))
    );
        
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    await exercise.save().catch(err => routeErrorCatch(res, err));
    
    res.json("Exercise udpated!");
});

module.exports = router;