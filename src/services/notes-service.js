const server = 'http://localhost:3001'

const addNote = (title, body, setAlert) => {
    return fetch(`${server}/add`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body})
        })
        .then((response) => response.json())
        .then((data) => {
            setAlert(data.alert)
        })
        .catch(error => {
            setAlert({
                type: 'danger',
                message: 'Unexpected error occured!'
            })
        })
}

module.exports = {
    addNote: addNote
}
