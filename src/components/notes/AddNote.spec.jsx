import React from 'react'
import { render, fireEvent, within, screen, waitFor } from '@testing-library/react'
import { toHaveStyle } from '@testing-library/jest-dom'
import AddNote from './AddNote'

const notesFetcher = require('../../fetchers/notes-fetcher')
const addNoteSpy = jest.spyOn(notesFetcher, 'addNote')

describe('Add Note', () => {
    const title = 'Books to buy'
    const body = 'Alice in Wonderland'

    const getInputByLabel = (label) => {
        const labelElement = screen.getByText(label)
        const formGroup = labelElement.parentElement
        return within(formGroup).getByRole('input')
    }

    beforeEach(() => {
        addNoteSpy.mockClear()
    })

    it('should not submit when title and body are not defined', () => {
        render(<AddNote/>)
        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)
        expect(addNoteSpy).not.toHaveBeenCalled()
    })

    it('should not submit when title is not defined', () => {
        render(<AddNote/>)
        const titleInput = getInputByLabel('Title')
        fireEvent.change(titleInput, {target: {value: title}})
        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)
        expect(addNoteSpy).not.toHaveBeenCalled()
    })

    it('should not submit when body is not defined', () => {
        render(<AddNote/>)
        const bodyInput = getInputByLabel('Description')
        fireEvent.change(bodyInput, {target: {value: body}})
        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)
        expect(addNoteSpy).not.toHaveBeenCalled()
    })

    it('should submit note when title and body are defined', () => {
        render(<AddNote/>)
        const titleInput = getInputByLabel('Title')
        const bodyInput = getInputByLabel('Description')
        fireEvent.change(titleInput, {target: {value: title}})
        fireEvent.change(bodyInput, {target: {value: body}})
        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)
        expect(addNoteSpy).toHaveBeenCalledWith(title, body)
    })

    it('should show success alert when note was not added', async () => {
        const data = {
            status: 'ok',
            alert: {
                type: 'success',
                message: 'Success message!'
            }
        }
        addNoteSpy.mockReturnValue(data)

        render(<AddNote/>)
        const titleInput = getInputByLabel('Title')
        const bodyInput = getInputByLabel('Description')
        fireEvent.change(titleInput, {target: {value: title}})
        fireEvent.change(bodyInput, {target: {value: body}})
        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)

        await waitFor(() => {
            const alert = screen.getByRole('alertdialog')
            expect(alert).toHaveClass('alert-success')
            expect(alert.textContent).toEqual('Success message!')
        })
    })

    it('should show error alert when note was added', async () => {
        const data = Promise.resolve({
            status: 'error',
            alert: {
                type: 'danger',
                message: 'There was an unexpected message!'
            }
        })
        addNoteSpy.mockReturnValue(data)

        render(<AddNote/>)
        const titleInput = getInputByLabel('Title')
        const bodyInput = getInputByLabel('Description')
        fireEvent.change(titleInput, {target: {value: title}})
        fireEvent.change(bodyInput, {target: {value: body}})
        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)

        await waitFor(() => {
            const alert = screen.getByRole('alertdialog')
            expect(alert).toHaveClass('alert-danger')
            expect(alert.textContent).toEqual('There was an unexpected message!')
        })
    })

})