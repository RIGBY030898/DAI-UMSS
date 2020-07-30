package dai.app.exception;

@SuppressWarnings("serial")
public abstract class AgentException extends Exception {
    private int status;

    public AgentException(String errorMessage, int status) {
        super(errorMessage);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
