package dai.app.services;

import dai.app.core.agents.AgentFactory;
import dai.app.core.agents.BookBuyerAgent;
import dai.app.core.agents.BookSellerAgent;
import dai.app.core.agents.SpringAgent;
import dai.app.core.manager.AgentsManager;
import dai.app.exception.*;
import dai.app.model.request.AgentRequest;
import dai.app.model.request.BookRequest;
import jade.core.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AgentService {
    @Autowired
    private AgentsManager agentsManager;

    @Autowired
    private AgentFactory agentFactory;

    /*public Agent createAgent(final String nickname) {
        SpringAgent agent = (SpringAgent) agentFactory.createAgent(agentFactory.BOOK_BUYER_AGENT);
        agent.setArguments(new String[] {"Principito"});
        agent.init(nickname);
        return agent;
    }*/

    public Agent createAgent(final AgentRequest agentRequest) throws AgentTypeAgentException, AgentInitiatedException, AgentExistsException, AgentNullAgentException, InternalServerError {
        SpringAgent agent = (SpringAgent) agentFactory.createAgent(agentRequest.getType());
        if (agent == null) {
            throw new AgentTypeAgentException(agentRequest.getType());
        }
        agent.init(agentRequest.getName());
        return agent;
    }

    public BookSellerAgent addBookToSell(final String agentName,final BookRequest bookRequest)
            throws AgentNotFoundException {
        BookSellerAgent sellerAgent = agentsManager.getSellerAgentByName(agentName);
        if (sellerAgent == null) {
            throw new AgentNotFoundException(agentName);
        }
        sellerAgent.updateCatalogue(bookRequest.getName(), bookRequest.getPrice());
        return sellerAgent;
    }

    public BookBuyerAgent addBookToBuy(final String agentName, final BookRequest bookRequest)
            throws AgentNotFoundException {
        BookBuyerAgent buyerAgent = agentsManager.getBuyerAgentByName(agentName);
        if (buyerAgent == null) {
            throw new AgentNotFoundException(agentName);
        }
        buyerAgent.addBookToBuy(bookRequest.getName(), bookRequest.getPrice());
        return buyerAgent;
    }

    public Set<String> getAgentsNameOnMainContainer() {
        return agentsManager.getAgentsNameOnContainer();
    }

    public String deleteAgent(final String agentName, final String agentType)
            throws AgentNotFoundException {
        Agent agent;
        switch (agentType) {
            case AgentFactory.BOOK_BUYER_AGENT:
                agent = agentsManager.getBuyerAgentByName(agentName);
                break;
            case AgentFactory.BOOK_SELLER_AGENT:
                agent = agentsManager.getSellerAgentByName(agentName);
                break;
            default:
                agent = null;
        }
        if (agent == null) {
            throw new AgentNotFoundException(agentName);
        }
        agentsManager.takeDownAgent(agentName, agent);
        return agentName;
    }

    /*public Agent createBookSellerAgent(final String nickname) throws AgentInitiatedException, AgentExistsException, AgentNullAgentException, InternalServerError {
        BookSellerAgent agent = (BookSellerAgent) agentFactory.createAgent(agentFactory.BOOK_SELLER_AGENT);
        agent.updateCatalogue("Principito", 12);
        agent.init(nickname);
        return agent;
    }*/
}
