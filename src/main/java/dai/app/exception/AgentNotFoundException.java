package dai.app.exception;

import org.springframework.http.HttpStatus;

public class AgentNotFoundException extends AgentException {
    private static final String ERROR_MESSAGE = "El agente %s no existe en el sistema.";

    public AgentNotFoundException(String nickname) {
        super(String.format(ERROR_MESSAGE, nickname), HttpStatus.NOT_FOUND.value());
    }
}
