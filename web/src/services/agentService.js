import Service from './service'
import { http } from '.'

const reference = 'Agents'

const agentsType = {
    buyer: 'Comprador',
    seller: 'Vendedor',
}

const getValueAgentType = (type) => {
    return agentsType[type]
}

class AgentService extends Service {
    constructor(callback) {
        super(reference, callback)
    }

    async createAgent(agentName, agentType) {
        const agent = {
            name: agentName,
            type: agentType,
        }
        var data
        await http
            .request({
                url: '/agents',
                method: 'POST',
                data: agent,
            })
            .then((response) => {
                data = response
            })
            .catch((error) => {
                data = error
                console.log(error)
            })
        const { status } = data
        if (status) {
            if (data['data']) {
                this.notify(data['data'])
            } else {
                this.notify(data)
            }
        } else {
            const user = localStorage.getItem('user')
            await this.db
                .child(user)
                .child(agentType)
                .child(agentName)
                .set(agent)
                .then(() => (data = agent))
                .catch(
                    () => (data = { message: 'Error con la Base de Datos', status: 500 })
                )
            this.notify(data)
        }
    }

    async getAllAgents() {
        const user = localStorage.getItem('user')

        await this.db.child(user).on('value', (snapshot) => {
            const agents = []
            if (snapshot.exists()) {
                Object.values(snapshot.val()).forEach((group) => {
                    Object.values(group).forEach((agent) => {
                        agents.push({ agent })
                    })
                })
            }
            this.notify(agents)
        })
    }

    async deleteAgent(agentType, agentName) {
        var data
        var removed = false
        await http
            .request({
                url: `/agents/${agentType}/${agentName}`,
                method: 'DELETE',
            })
            .then((response) => {
                data = { agentName: response }
                removed = true
            })
            .catch((error) => {
                try {
                    const { status } = error
                    if (status === 404) {
                        removed = true
                        data = { agentName: agentName }
                    } else {
                        data = error
                    }
                } catch {
                    data = error
                }
            })
        if (removed) {
            const user = localStorage.getItem('user')
            this.db
                .child(user)
                .child(agentType)
                .child(agentName)
                .remove()
                .catch(() => {
                    data = { message: 'Error con la base de datos', status: 500 }
                    removed = false
                })
                .finally(() => {
                    this.notify({ ...data, removed })
                })
        } else {
            try {
                this.notify({ ...data['data'], removed })
            } catch {
                this.notify({ ...data, removed })
            }
        }
    }
}

export { reference, AgentService, getValueAgentType, agentsType }
