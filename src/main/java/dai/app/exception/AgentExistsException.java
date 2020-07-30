package dai.app.exception;

import org.springframework.http.HttpStatus;

public class AgentExistsException extends AgentException {
    private static final String ERROR_MESSAGE = "El agente %s ya existe en el sistema.";

    public AgentExistsException(String nickname) {
        super(String.format(ERROR_MESSAGE, nickname), HttpStatus.CONFLICT.value());
    }
}
