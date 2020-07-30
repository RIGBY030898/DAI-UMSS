import Service from './service'
import { endPointURL } from './agentService'
import { post } from './http'

const reference = 'Books'

class BookService extends Service {
    constructor(callback) {
        super(reference, callback)
    }

    async addBook(agentName, agentType, nameBook, price) {
        const book = {
            name: nameBook,
            price: price,
        }
        const data = await post(`${endPointURL}/${agentType}/${agentName}`, book)
        this.notify(data)
    }
}

export { BookService }
