package dai.app.core.agents;

import org.springframework.stereotype.Service;

@Service
public class AgentFactory implements AgentCreator {
    public static final String BOOK_BUYER_AGENT = "buyer";
    public static final String BOOK_SELLER_AGENT = "seller";

    @Override
    public AgentInterface createAgent(String type) {
        switch (type) {
            case BOOK_BUYER_AGENT:
                return new BookBuyerAgent();
            case BOOK_SELLER_AGENT:
                return new BookSellerAgent();
            default:
                return null;
        }
    }
}
