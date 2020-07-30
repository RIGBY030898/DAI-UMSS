package dai.app.core.manager;

import dai.app.core.agents.BookBuyerAgent;
import dai.app.core.agents.BookSellerAgent;
import dai.app.exception.AgentExistsException;
import dai.app.exception.AgentNullAgentException;
import dai.app.exception.InternalServerError;
import jade.core.Agent;
import jade.core.ProfileImpl;
import jade.core.Runtime;
import jade.wrapper.AgentContainer;
import jade.wrapper.AgentController;
import jade.wrapper.ControllerException;
import jade.wrapper.StaleProxyException;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.*;

@Service
public class AgentsManager {
    private static AgentContainer mainContainer;
    //private static Map<String, Agent> agentsOnContainer = new HashMap<>();
    private static Map<String, BookBuyerAgent> buyerAgents = new HashMap<>();
    private static Map<String, BookSellerAgent> sellerAgents = new HashMap<>();
    //private static List<String> agentsName = new ArrayList<>();
    private static Set<String> agentsOnContainer = new HashSet<>();

    @PostConstruct
    public void startup() {
        if (mainContainer == null) {
           createAndInitMainContainer();
        } else {
            try {
                mainContainer.start();
            } catch (ControllerException ex) {
                ex.printStackTrace();
            }
        }
    }

    private static void createAndInitMainContainer() {
        ProfileImpl profile = new ProfileImpl(false);
        mainContainer = Runtime.instance().createMainContainer(profile);
    }

    @PreDestroy
    public void shutdown() {
        if (mainContainer != null) {
            try {
                mainContainer.kill();
            } catch (StaleProxyException ex) {
                ex.printStackTrace();
            }
        }
    }

    public static synchronized void addAgentToMainContainer(String nickname, Agent agent) throws AgentExistsException, AgentNullAgentException, InternalServerError {
        try {
            /*if (!agentsOnContainer.containsKey(nickname) && agent != null
                    && !agentsOnContainer.values().contains(agent)) {
                AgentController agentController = mainContainer.acceptNewAgent(nickname, agent);
                agentController.start();
                if (agent instanceof BookBuyerAgent) {
                    buyerAgents.put(nickname, (BookBuyerAgent) agent);
                } else {
                    sellerAgents.put(nickname, (BookSellerAgent) agent);
                }
            } else {
                throw new RuntimeException("ERROR: problem adding an agent to the container" +
                        " an agent with nickname " + nickname + " already exist in the system" +
                        " or the agent is null or is already added");
            }*/
            /*if (!agentsOnContainer.contains(nickname) && agent != null) {
                AgentController agentController = mainContainer.acceptNewAgent(nickname, agent);
                agentController.start();
                agentsOnContainer.add(nickname);
                if (agent instanceof BookBuyerAgent) {
                    buyerAgents.put(nickname, (BookBuyerAgent) agent);
                } else {
                    sellerAgents.put(nickname, (BookSellerAgent) agent);
                }
            } else {
                throw new RuntimeException("ERROR: problem adding an agent to the container" +
                        " an agent with nickname " + nickname + " already exist in the system" +
                        " or the agent is null or is already added");
            }*/
            if (agent != null) {
                if (!agentsOnContainer.contains(nickname)) {
                    AgentController agentController = mainContainer.acceptNewAgent(nickname, agent);
                    agentController.start();
                    agentsOnContainer.add(nickname);
                    if (agent instanceof BookBuyerAgent) {
                        buyerAgents.put(nickname, (BookBuyerAgent) agent);
                    } else {
                        sellerAgents.put(nickname, (BookSellerAgent) agent);
                    }
                } else {
                    throw new AgentExistsException(nickname);
                }
            } else {
                throw new AgentNullAgentException();
            }
        } catch (StaleProxyException ex) {
            throw new InternalServerError(ex.getMessage());
        }
    }

    public static synchronized void takeDownAgent(String nickname, Agent agent) {
        try {
            if (agent == null) {
                throw new RuntimeException("ERROR: The agent you are trying to shut down is null");
            } else if (agent.getLocalName() != null && mainContainer.getAgent(agent.getLocalName()) != null) {
                agent.doDelete();
                deleteAgentFromList(nickname, agent);
            } else {
                throw new RuntimeException("ERROR: The agent " + nickname + " that you are trying to shut" +
                        " down is not initiated or has been already shutted down");
            }
        } catch (ControllerException ex) {
            throw new RuntimeException("ERROR: ControllerException - exception shutting down the agent " +
                    nickname + " ! -> " + ex.getMessage());
        }
    }

    private static synchronized void deleteAgentFromList(String nickname, Agent agent) {
        //agentsOnContainer.remove(nickname, agent);
        agentsOnContainer.remove(nickname);
        if (agent instanceof BookBuyerAgent) {
            buyerAgents.remove(nickname, (BookBuyerAgent) agent);
        } else {
            sellerAgents.remove(nickname, (BookSellerAgent) agent);
        }
    }

    public Set<String> getAgentsNameOnContainer() {
        return agentsOnContainer;
    }

    public Map<String, BookBuyerAgent> getBuyerAgents() {
        return buyerAgents;
    }

    public Map<String, BookSellerAgent> getSellerAgents() {
        return sellerAgents;
    }

    public BookSellerAgent getSellerAgentByName(String nickname) {
        return sellerAgents.get(nickname);
    }

    public BookBuyerAgent getBuyerAgentByName(String nickname) {
        return buyerAgents.get(nickname);
    }
}
