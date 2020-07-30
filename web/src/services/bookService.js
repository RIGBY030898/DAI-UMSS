import Service from './service'
import { http } from '.'

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
        http.request({
            url: `/agents/${agentType}/${agentName}`,
            method: 'POST',
            data: book,
        })
            .then((data) => console.log(data))
            .catch((error) => {
                if (error['data']) {
                    console.log(error['data'])
                } else {
                    console.log(error)
                }
            })
    }
}

export { BookService }
