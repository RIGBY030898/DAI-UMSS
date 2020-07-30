package dai.app.core.agents;

import dai.app.exception.AgentExistsException;
import dai.app.exception.AgentInitiatedException;
import dai.app.exception.AgentNullAgentException;
import dai.app.exception.InternalServerError;
import jade.core.behaviours.Behaviour;

public interface AgentInterface {
    void init() throws AgentInitiatedException, AgentExistsException, AgentNullAgentException, InternalServerError;

    void init(String nickname) throws InternalServerError, AgentNullAgentException, AgentExistsException, AgentInitiatedException;

    boolean addBehaviourToAgent(Behaviour behaviour);

    void setNickname(String nickname);

    String getNickname();

    default String getAgentClassName() {
        return this.getClass().getSimpleName();
    }
}
