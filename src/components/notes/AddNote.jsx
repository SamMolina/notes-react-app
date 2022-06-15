import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Title from '../theming/Title'

const AddNote = () => {
    return (
        <Container>
            <Title>Add Note</Title>
            <Form>
                <Form.Group className='mb-3' controlId='addNoteTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='string' placeholder='Note title' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='addNoteBody'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control type='string' as="textarea" rows={3} placeholder='Fill out the note body' />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddNote