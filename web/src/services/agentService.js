import Service from './service'
import { get, post } from './http'

const endPointURL = process.env.REACT_APP_SERVER_END_POINT_URL
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
        var data = await post(endPointURL, agent)
        const { status } = data
        if (status) {
            this.notify(data)
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

    async getAgentsName() {
        const agentsName = await get(endPointURL)
        return agentsName
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
}

export { endPointURL, reference, AgentService, getValueAgentType, agentsType }
