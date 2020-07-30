package dai.app.exception;

import org.springframework.http.HttpStatus;

public class AgentTypeAgentException extends AgentException {
    private static final String ERROR_MESSAGE = "El tipo %s no existe en el sistema.";

    public AgentTypeAgentException(String type) {
        super(String.format(ERROR_MESSAGE, type), HttpStatus.BAD_REQUEST.value());
    }
}
