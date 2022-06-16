const { addNote } = require('./notes-fetcher')

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

describe('Notes Service', () => {

    beforeEach(() => {
        fetch.mockClear();
    })

    describe('add note', () => {
        it('should return data when call succeeds', async () => {
            const title = 'Books to buy'
            const body = 'Alice in Wonderland'
            const data = await addNote(title, body)
            const expectedData = {
                status: 'ok',
                alert: {
                    type: 'success',
                    message: 'Success message!'
                }
            }
            expect(data).toEqual(expectedData)
        })

        it('should not call set alert when fetch fails', async () => {
            fetch.mockImplementationOnce(() => Promise.reject('Internal server error'));
            const title = 'Books to buy'
            const body = 'Alice in Wonderland'
            const data = await addNote(title, body)
            const expectedData = {
                status: 'error',
                alert: {
                    type: 'danger',
                    message: 'Unexpected error occured!'
                }
            }
            expect(data).toEqual(expectedData)
        })
    })
    
})