package dai.app.model.request;

import javax.validation.constraints.NotBlank;

public class AgentRequest {
    @NotBlank(message = "El nombre del agente no puede estar vacío.")
    private String name;
    @NotBlank(message = "El tipo del agente no puede estar vacío.")
    private String type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
