// build your `/api/projects` router here

const express = require('express');
const Project = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.getProjects()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.post('/', async (req, res, next) => {
    try {
        const project = await Project.newProject(req.body)
        res.status(201).json(project)
    }
    catch (err) {
        next(err)
    }
    
})

module.exports = router