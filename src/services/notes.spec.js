const { addNote } = require('./notes-service')

const Chance = require('chance')
const chance = new Chance()

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
        status: 'ok',
        alert: {
            type: 'success',
            message: 'Success message!'
        }
    })
  })
)

const mockSetAlert = jest.fn()

describe('Notes Service', () => {

    beforeEach(() => {
        fetch.mockClear();
        mockSetAlert.mockClear();
    });

    describe('add note', () => {
        it('should call set alert when response has data', async () => {
            const title = 'Books to buy'
            const body = 'Alice in Wonderland'
            await addNote(title, body, mockSetAlert)
            const expectedAlert = {
                type: 'success',
                message: 'Success message!'
            }
            expect(mockSetAlert).toHaveBeenCalledWith(expectedAlert)
        })

        it('should not call set alert when fetch fails', async () => {
            fetch.mockImplementationOnce(() => Promise.reject('Internal server error'));
            const title = 'Books to buy'
            const body = 'Alice in Wonderland'
            await addNote(title, body, mockSetAlert)
            const expectedAlert = {
                type: 'danger',
                message: 'Unexpected error occured!'
            }
            expect(mockSetAlert).toHaveBeenCalledWith(expectedAlert)
        })
    })
    
})