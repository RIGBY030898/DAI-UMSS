import * as http from './http'

export { http }
export { reference as referenceUser, UserService } from './userService'
export {
    reference as referenceAgent,
    AgentService,
    getValueAgentType,
    agentsType,
} from './agentService'
export { BookService } from './bookService'
export {
    reference as referenceBook,
    recommendation,
    sale,
    UserBookService,
} from './userBookService'
export { default as history } from './history'
