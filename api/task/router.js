// build your `/api/tasks` router here

const express = require('express');
const Task = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.getTasks()
        res.json(tasks)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const task = await Task.newTask(req.body)
        res.json(task)
    }
    catch (err) {
        next(err)
    }
    
})


module.exports = router