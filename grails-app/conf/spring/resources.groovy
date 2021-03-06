import com.gosuwager.marshallers.GameReplayMarshaller
import com.gosuwager.marshallers.GosuCoinTransactionMarshaller
import com.gosuwager.marshallers.GosuCoinWithrawlRequestMarshaller
import com.gosuwager.marshallers.ObjectMarshallers
import com.gosuwager.marshallers.GameMarshaller
import com.gosuwager.marshallers.UserMarshaller

// Place your Spring DSL code here
beans = {
    objectMarshallers(ObjectMarshallers) {
        marshallers = [
            new GameMarshaller(),
            new UserMarshaller(),
            new GameReplayMarshaller(),
            new GosuCoinWithrawlRequestMarshaller(),
            new GosuCoinTransactionMarshaller()
        ]
    }


}
