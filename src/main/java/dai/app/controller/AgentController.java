package dai.app.controller;

import dai.app.core.agents.AgentFactory;
import dai.app.core.agents.BookBuyerAgent;
import dai.app.core.agents.BookSellerAgent;
import dai.app.exception.*;
import dai.app.model.request.AgentRequest;
import dai.app.model.request.BookRequest;
import dai.app.services.AgentService;
import jade.core.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.util.Date;
import java.util.Set;

@RestController
@RequestMapping("/api/agents")
public class AgentController {
    @Autowired
    private AgentService agentService;

    /*@GetMapping("/buyer/{nickname}")
    public Agent createAgent(@PathVariable("nickname") String nickname) {
        return agentService.createAgent(nickname);
    }*/

    @PermitAll
    @GetMapping
    public Set<String> getAgentsNameOnMainContainer() {
        return agentService.getAgentsNameOnMainContainer();
    }

    @PostMapping
    public ResponseEntity<?> createAgent(@Valid @RequestBody AgentRequest agentRequest) {
        try {
            Agent agent = agentService.createAgent(agentRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(agent);
        } catch (AgentTypeAgentException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        } catch (AgentExistsException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        } catch (InternalServerError e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        } catch (AgentInitiatedException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        } catch (AgentNullAgentException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        }
    }

    @PostMapping("/seller/{name}")
    public ResponseEntity<?> addBookToSell(@PathVariable("name") String name, @Valid @RequestBody BookRequest bookRequest) {
        try {
            BookSellerAgent sellerAgent = agentService.addBookToSell(name, bookRequest);
            return ResponseEntity.ok(sellerAgent);
        } catch (AgentNotFoundException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        }
    }

    @DeleteMapping("/seller/{name}")
    public ResponseEntity<?> deleteSellerAgent(@PathVariable("name") String agentName) {
        try {
            String nameDeletedAgent = agentService.deleteAgent(agentName, AgentFactory.BOOK_SELLER_AGENT);
            return ResponseEntity.ok(nameDeletedAgent);
        } catch (AgentNotFoundException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        }
    }

    @PostMapping("/buyer/{name}")
    public ResponseEntity<?> addBookToBuy(@PathVariable("name") String name, @Valid @RequestBody BookRequest bookRequest) {
        try {
            BookBuyerAgent buyerAgent = agentService.addBookToBuy(name, bookRequest);
            return ResponseEntity.ok(buyerAgent);
        } catch (AgentNotFoundException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        }
    }

    @DeleteMapping("/buyer/{name}")
    public ResponseEntity<?> deleteBuyerAgent(@PathVariable("name") String agentName) {
        try {
            String nameDeletedAgent = agentService.deleteAgent(agentName, AgentFactory.BOOK_BUYER_AGENT);
            return ResponseEntity.ok(nameDeletedAgent);
        } catch (AgentNotFoundException e) {
            ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage(), new Date(), e.getStatus());
            return ResponseEntity.status(e.getStatus()).body(exceptionResponse);
        }
    }

    /*@GetMapping("/seller/{nickname}")
    public Agent createBookSellerAgent(@PathVariable("nickname") String nickname) {
        try {
            return agentService.createBookSellerAgent(nickname);
        } catch (AgentInitiatedException e) {
            e.printStackTrace();
        } catch (AgentExistsException e) {
            e.printStackTrace();
        } catch (AgentNullAgentException e) {
            e.printStackTrace();
        } catch (InternalServerError internalServerError) {
            internalServerError.printStackTrace();
        }
    }*/
}
