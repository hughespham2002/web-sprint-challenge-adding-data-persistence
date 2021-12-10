// build your `Resource` model here
const db = require('../../data/dbConfig')

function getResources() {
    return db('resources')
}

function getById(id) {
    return db('resources').where('resource_id', id).first()
}

function newResource(resource) {
    return db('resources').insert(resource)
        .then(([id]) => getById(id))
}

module.exports = {
    getResources,
    newResource
}