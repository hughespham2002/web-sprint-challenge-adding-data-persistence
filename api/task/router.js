// build your `/api/tasks` router here

const express = require('express');
const Task = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Task.getTasks()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(next)
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