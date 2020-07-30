import Service from './service'

const reference = 'Books'
const recommendation = 'Recommendations'
const sale = 'Sales'

class UserBookService extends Service {
    constructor(callback) {
        super(reference, callback)
    }

    getPurchasedBooks(username) {
        var purchasedBooks = []
        this.db
            .child(sale)
            .child(username)
            .once('value', (snapshot) => {
                if (snapshot.exists()) {
                    purchasedBooks = Object.values(snapshot.val())
                }
            })
            .finally(() => {
                this.notify({ purchasedBooks })
            })
    }

    buyBook(username, { id, pages, categories, ...rest }) {
        const userBookDB = this.db.child(sale).child(username).child(id)
        var bought = false
        userBookDB
            .set({ id: parseInt(id), pages: parseInt(pages), ...rest })
            .then(() => {
                bought = true
                const categoriesBD = userBookDB.child('Categories')
                categories.map(({ category_id, name }) =>
                    categoriesBD.child(category_id).set({ id: category_id, name })
                )
            })
            .finally(() => {
                this.notify({ bought })
            })
    }

    getRecommendedBooks(username) {
        var recommendedBooks = []
        this.db
            .child(recommendation)
            .child(username)
            .once('value', (snapshot) => {
                if (snapshot.exists()) {
                    recommendedBooks = Object.values(snapshot.val())
                }
            })
            .finally(() => {
                this.notify({ recommendedBooks })
            })
    }
}

export { reference, recommendation, sale, UserBookService }
