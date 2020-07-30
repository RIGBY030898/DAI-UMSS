package dai.app.core.agents;

import dai.app.core.manager.AgentsManager;
import dai.app.exception.AgentExistsException;
import dai.app.exception.AgentInitiatedException;
import dai.app.exception.AgentNullAgentException;
import dai.app.exception.InternalServerError;
import jade.core.Agent;
import jade.core.behaviours.Behaviour;

import javax.annotation.OverridingMethodsMustInvokeSuper;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public abstract class SpringAgent extends Agent implements AgentInterface {
    private String nickname = "";
    private List<Behaviour> behaviours = new ArrayList<>();
    private boolean initiated = false;

    @OverridingMethodsMustInvokeSuper
    @Override
    protected void setup() {
        for (Behaviour behaviour: behaviours) {
            addBehaviour(behaviour);
        }
        initiated = true;
    }

    @OverridingMethodsMustInvokeSuper
    @Override
    protected void takeDown() {
        initiated = false;
    }

    @Override
    public void init() throws AgentInitiatedException, AgentExistsException, AgentNullAgentException, InternalServerError {
        if (nickname.equals("")) {
            init(this.getClass().getSimpleName());
        } else {
            init(nickname);
        }
    }

    @Override
    public void init(String nickname)
            throws InternalServerError, AgentNullAgentException,
                AgentExistsException, AgentInitiatedException {
        if (!isInitiated()) {
            this.nickname = nickname;
            AgentsManager.addAgentToMainContainer(nickname, this);
        } else {
            throw new AgentInitiatedException(nickname);
        }
    }

    @Override
    public boolean addBehaviourToAgent(Behaviour behaviour) {
        boolean isBehaviourAdded = false;
        if (behaviour != null) {
            if (!checkBehaviourExists(behaviour)) {
                behaviours.add(behaviour);
                // problem?
                behaviour.setAgent(this);
                isBehaviourAdded = true;
            }
        }
        return isBehaviourAdded;
    }

    private boolean checkBehaviourExists(Behaviour behaviour) {
        boolean behaviourExists = false;
        String nameBehaviourIn = behaviour.getBehaviourName();
        String nameBehaviourList;
        Iterator<Behaviour> iterator = behaviours.iterator();

        while (iterator.hasNext() && !behaviourExists) {
            nameBehaviourList = iterator.next().getBehaviourName();
            if (nameBehaviourIn.equals(nameBehaviourList)) {
                behaviourExists = true;
            }
        }

        return behaviourExists;
    }

    @Override
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Override
    public String getNickname() {
        return nickname;
    }

    public boolean isInitiated() {
        return initiated;
    }
}
