import database from './firebase'

class Service {
    constructor(reference, callback) {
        this.db = database.child(reference)
        this.callback = callback
    }

    notify() {
        this.callback(arguments)
    }
}

export default Service
