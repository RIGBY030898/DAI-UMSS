package dai.app.exception;

import org.springframework.http.HttpStatus;

public class AgentInitiatedException extends AgentException {
    private static final String ERROR_MESSAGE = "El agente %s ya está inicializado.";

    public AgentInitiatedException(String nickname) {
        super(String.format(ERROR_MESSAGE, nickname), HttpStatus.CONFLICT.value());
    }
}
