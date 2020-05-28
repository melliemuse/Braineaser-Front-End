const baseUrl = `http://localhost:8000`
const token_name = 'braineaser_token'

export default {
    getAll(endpoint) {
        return fetch(`${baseUrl}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem(token_name)}`
            }
        }).then(data => data.json())
    },
    get(endpoint, id) {
        return fetch(`${baseUrl}/${endpoint}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem(token_name)}`
            }
        }).then(data => data.json())
    },
    getUserBy(endpoint, username, password) {
        return fetch(`${baseUrl}/${endpoint}?username=${username}&?password=${password}`)
        .then(data => data.json())
    },
    getAllInterventionsbyUser(endpoint, userId) {
        return fetch(`${baseUrl}/${endpoint}?userId=${userId}`)
        .then(data => data.json())
    },
    getUserInterventions(endpoint, userId, interventionId) {
        return fetch(`${baseUrl}/${endpoint}?userId=${userId}&interventionId=${interventionId}`)
        .then(data => data.json())
    },
    // http://localhost:5002/userInterventions?userId=1&_expand=intervention
    getAllUserInterventionsWithInterventions(endpoint, userId) {
        return fetch(`${baseUrl}/${endpoint}?userId=${userId}&_sort=timestamp&_expand=intervention`)
        .then(data => data.json())
    },
    getUserInterventionsWithInterventions(endpoint, userId, interventionId) {
        return fetch(`${baseUrl}/${endpoint}?userId=${userId}&interventionId=${interventionId}&_expand=intervention`)
        .then(data => data.json())
    },
    // http://localhost:5002/journals?userId=1&_expand=prompt
    getEntriesPromptsByUser(childEndpoint, currentUserId, parentEndpoint) {
        return fetch(`${baseUrl}/${childEndpoint}?userId=${currentUserId}&_expand=${parentEndpoint}`)
        .then(data => data.json())
    },
    getWith(endpoint, id, secondEndpoint) {
        return fetch(`${baseUrl}/${endpoint}/${id}?_expand=${secondEndpoint}`)
        .then(data => data.json())
    },
    post(endpoint, newItem) {
        return fetch(`${baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }
        ).then(data => data.json())
    },
    patch(endpoint, itemToUpdate) {
        return fetch(`${baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToUpdate)
        }
        ).then(data => data.json())
    },
    update(endpoint, editedItem) {
        return fetch(`${baseUrl}/${endpoint}/${editedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }
        ).then(data => data.json())
    },
    delete(endpoint, id) {
        return fetch(`${baseUrl}/${endpoint}/${id}`, {
            method: "DELETE"
        }
        ).then(data => data.json())
    }
}