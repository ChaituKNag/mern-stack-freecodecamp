const router = require('express').Router();
let User = require('../models/user.model');
const {routeErrorCatch} = require('../utils/common.utils');

router.route('/').get(async (req, res) => {
    const users = await User.find().catch(err => routeErrorCatch(res, err));
    res.json(users);
});

router.route('/add').post(async (req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    await newUser.save().catch(err => routeErrorCatch(res, err));
    
    res.json('User added!');
});

module.exports = router;