const { addNote, removeNote, listNotes, readNote } = require('./notes-service')

const fs = require('fs')
const Chance = require('chance')
const chance = new Chance()

jest.mock('fs')

describe('Notes', () => {
    afterEach(() => {
        fs.readFileSync.mockRestore()
        fs.writeFileSync.mockRestore()
    })

    it('should add new note when notes data file does not exist', () => {
        fs.readFileSync.mockImplementation(() => {
            throw new Error()
        })

        const title = 'Hello'
        const body = `Greetings from ${chance.country({ full: true })}.`
        addNote(title, body)

        expect(fs.writeFileSync).toHaveBeenCalledWith('notes.json', `[{"title":"${title}","body":"${body}"}]`)
    })

    it('should add new note when there are no saved notes', () => {
        fs.readFileSync.mockReturnValue('[]')

        const title = 'Hello'
        const body = `Greetings from ${chance.country({ full: true })}.`
        addNote(title, body)

        expect(fs.writeFileSync).toHaveBeenCalledWith('notes.json', `[{"title":"${title}","body":"${body}"}]`)
    })

    it('should add new note when there are saved notes', () => {
        const data = [{ title: 'Goodnight moon', body: 'The cow jumping over the moon' }]
        fs.readFileSync.mockReturnValue(JSON.stringify(data))

        const title = 'Hello'
        const body = `Greetings from ${chance.country({ full: true })}.`
        addNote(title, body)

        expect(fs.writeFileSync).toHaveBeenCalledWith('notes.json', `[{"title":"Goodnight moon","body":"The cow jumping over the moon"},{"title":"${title}","body":"${body}"}]`)
    })

    it('should not add new note when there is a saved note with the same title', () => {
        const data = [{ title: 'Goodnight moon', body: 'The cow jumping over the moon' }]
        fs.readFileSync.mockReturnValue(JSON.stringify(data))

        const title = 'Goodnight moon'
        const body = `Greetings from ${chance.country({ full: true })}.`

        expect(() => addNote(title, body)).toThrow('Duplicate note')
        expect(fs.writeFileSync).not.toHaveBeenCalled()
    })

    it('should not remove note when notes data file does not exist', () => {
        fs.readFileSync.mockImplementation(() => {
            throw new Error()
        })

        const title = 'Goodnight moon'

        expect(() => removeNote(title)).toThrow('No note found!')
        expect(fs.writeFileSync).not.toHaveBeenCalled()
    })

    it('should not remove note when there are no saved notes', () => {
        fs.readFileSync.mockReturnValue('[]')

        const title = 'Goodnight moon'

        expect(() => removeNote(title)).toThrow('No note found!')
        expect(fs.writeFileSync).not.toHaveBeenCalled()
    })

    it('should not remove note when title does not exist in saved notes', () => {
        const data = [{ title: 'Goodnight moon', body: 'The cow jumping over the moon' }]
        fs.readFileSync.mockReturnValue(JSON.stringify(data))

        const title = 'Hello world'

        expect(() => removeNote(title)).toThrow('No note found!')
        expect(fs.writeFileSync).not.toHaveBeenCalled()
    })

    it('should remove note when title exists in saved notes', () => {
        const data = [{ title: 'Goodnight moon', body: 'The cow jumping over the moon' }]
        fs.readFileSync.mockReturnValue(JSON.stringify(data))

        const title = 'Goodnight moon'
        removeNote(title)

        expect(fs.writeFileSync).toHaveBeenCalledWith('notes.json', '[]')
    })

    it('should list empty notes when there are no saved notes', () => {
        fs.readFileSync.mockImplementation(() => {
            throw new Error()
        })

        const actualNotes = listNotes()

        expect(actualNotes).toEqual([])
    })

    it('should list notes when there are saved notes', () => {
        const expectedNotes = [
            {
                title: 'Goodnight moon',
                body: 'The cow jumping over the moon.'
            },
            {
                title: 'Hello',
                body: `Greetings from ${chance.country({ full: true })}.`
            }
        ]
        fs.readFileSync.mockReturnValue(JSON.stringify(expectedNotes))

        const actualNotes = listNotes()

        expect(actualNotes).toEqual(expectedNotes)
    })

    it('should return note when title is saved in notes', () => {
        const expectedNote = {
            title: 'Hello',
            body: `Greetings from ${chance.country({ full: true })}.`
        }
        const data = [
            expectedNote,
            {
                title: 'Goodnight moon',
                body: 'The cow jumping over the moon.'
            }
        ]
        fs.readFileSync.mockReturnValue(JSON.stringify(data))

        const actualNote = readNote('Hello')

        expect(actualNote).toEqual(expectedNote)
    })

    it('should not return note when title is not saved in notes', () => {
        const data = [
            {
                title: 'Goodnight moon',
                body: 'The cow jumping over the moon.'
            },
            {
                title: 'Hello message',
                body: `Greetings from ${chance.country({ full: true })}.`
            }
        ]
        fs.readFileSync.mockReturnValue(JSON.stringify(data))

        expect(() => readNote(chance.word)).toThrow('No note found!')
    })
})