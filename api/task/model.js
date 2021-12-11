// build your `Task` model here
const db = require('../../data/dbConfig')

async function getTasks(){
    const tasks = await db('projects')
        .select(
            'tasks.task_id', 
            'tasks.task_description', 
            'tasks.task_notes', 
            'tasks.task_completed',
            'projects.project_name',
            'projects.project_description')
        .join('tasks', 'projects.project_id', '=', 'tasks.project_id')

    const allTasks = tasks.map(task => {
        if (task.task_completed === 1) {
            return {
                ...task,
                task_completed: true,
            }
        } else if (task.task_completed === 0) {
            return {
                ...task,
                task_completed: false
            }
        }
    })
    return allTasks
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