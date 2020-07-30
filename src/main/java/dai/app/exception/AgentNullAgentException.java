package dai.app.exception;

import org.springframework.http.HttpStatus;

public class AgentNullAgentException extends AgentException {
    private static final String ERROR_MESSAGE = "El agente es nulo.";

    public AgentNullAgentException() {
        super(ERROR_MESSAGE, HttpStatus.CONFLICT.value());
    }
}
