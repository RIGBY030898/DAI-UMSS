import Service from './service'

const reference = 'Users'

class UserService extends Service {
    constructor(callback) {
        super(reference, callback)
    }

    login(username, passwordUser) {
        this.db.child(username).once('value', (snapshot) => {
            if (snapshot.exists()) {
                const { password } = snapshot.val()
                if (password === passwordUser) {
                    localStorage.setItem('user', username)
                    this.notify()
                }
            }
        })
    }

    logout() {
        localStorage.removeItem('user')
        this.notify()
    }

    isUserAuthenticated() {
        const user = localStorage.getItem('user')
        return user !== null
    }

    register(username, password) {
        this.db
            .child(username)
            .set({ username: username, password: password })
            .then(() => {
                this.notify({ registered: true })
            })
            .catch(() => {
                this.notify({ registered: false })
            })
    }
}

export { reference, UserService }
