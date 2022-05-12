const fs = require('fs')
const fileName = 'notes.json'

const isNoteSaved = (notes, title) => notes.find(note => note.title === title) !== undefined

const addNote = (title, body) => {
    const notes = loadNotes()

    if (isNoteSaved(notes, title)) throw Error('Duplicate note')

    const newNote = {
        title: title,
        body: body
    }
    notes.push(newNote)
    fs.writeFileSync(fileName, JSON.stringify(notes))
}

const removeNote = (title) => {
    const notes = loadNotes()

    if (!isNoteSaved(notes, title)) throw Error('No note found!')

    const updatedNotes = notes.filter(note => note.title !== title)
    fs.writeFileSync(fileName, JSON.stringify(updatedNotes))
}

const listNotes = () => {
    return loadNotes()
}

const readNote = (title) => {
    const notes = loadNotes()
    const searchedNote = notes.find(note => note.title === title)
    if (!searchedNote) throw Error('No note found!')
    return searchedNote
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync(fileName)
        const notes = JSON.parse(notesBuffer.toString())
        return notes
    } catch(e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
