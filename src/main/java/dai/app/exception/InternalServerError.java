package dai.app.exception;

import org.springframework.http.HttpStatus;

public class InternalServerError extends AgentException {
    public InternalServerError(String errorMessage) {
        super(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}
