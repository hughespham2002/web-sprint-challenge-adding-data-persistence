// build your `Task` model here
const db = require('../../data/dbConfig')

async function getTasks() {
    const tasks = await db('tasks')
    return tasks.map(task => {
        return {
            ...task,
            task_completed: task.task_completed === 1
        }
    })
}

async function getById(id) {
    const row = await db('tasks')
        .where('task_id', id)
        .first();

    return {
        ...row,
        task_completed: row.task_completed ? true : false
    }
}

async function newTask(task) {
    const [id] = await db('tasks').insert(task)
    return getById(id)
}
module.exports = {
    getTasks,
    newTask
}