import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import AlertContainer from '../theming/AlertContainer'
import Title from '../theming/Title'
import { addNote } from '../../fetchers/notes-fetcher'

const AddNote = () => {
    const [alert, setAlert] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const submitNote = async (e) => {
        e.preventDefault()
        try {
            const data = await addNote(title, body)
            setAlert(data.alert)
        } catch (e) {
            const alert = {
                type: 'danger',
                message: e.message
            }
            setAlert(alert)
        }
    }

    useEffect(() => {
        setShowAlert(alert.type !== undefined)
    }, [alert]);

    return (
        <Container>
            <Title>Add Note</Title>
            <Form onSubmit={submitNote} role='form'>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='noteTitle'>Title</Form.Label>
                    <Form.Control
                        id='noteTitle'
                        type='string'
                        placeholder='Note title'
                        onChange={e => setTitle(e.target.value)}
                        required
                        role='input'
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='noteBody'>Description</Form.Label>
                    <Form.Control
                        id='noteBody'
                        type='string'
                        as='textarea'
                        rows={3}
                        placeholder='Fill out the note body'
                        onChange={e => setBody(e.target.value)}
                        required
                        role='input'
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
            <AlertContainer>
                <Alert
                    role="alertdialog"
                    key='add-note-error'
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    variant={alert.type}
                    dismissible
                >
                    {alert.message}
                </Alert>
            </AlertContainer>
        </Container>
    )
}

export default AddNote