import Service from './service'

const reference = 'Users'

class UserService extends Service {
    constructor(callback) {
        super(reference, callback)
    }

    login(username, passwordUser) {
        this.db
            .child(username)
            .once('value', (snapshot) => {
                if (snapshot.exists()) {
                    const { password } = snapshot.val()
                    if (password === passwordUser) {
                        localStorage.setItem('user', username)
                    }
                }
            })
            .finally(() => {
                this.notify()
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

    getLoggedUser() {
        return localStorage.getItem('user')
    }

    async register(username, password) {
        const userDB = this.db.child(username)

        var registered = false

        await userDB.once('value', (snapshot) => {
            if (!snapshot.exists()) {
                registered = true
            }
        })
        if (registered) {
            userDB
                .set({ username, password })
                .catch(() => {
                    registered = false
                })
                .finally(() => {
                    this.notify({ registered })
                })
        } else {
            this.notify({ registered })
        }
    }
}

export { reference, UserService }
