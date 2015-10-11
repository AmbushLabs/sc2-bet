import com.gosuwager.marshallers.ObjectMarshallers
import com.gosuwager.marshallers.GameMarshaller
import com.gosuwager.marshallers.UserMarshaller

// Place your Spring DSL code here
beans = {
    objectMarshallers(ObjectMarshallers) {
        marshallers = [
            new GameMarshaller(),
            new UserMarshaller()
        ]
    }


}
