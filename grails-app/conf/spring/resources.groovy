import com.gosuwager.marshallers.ObjectMarshallers
import com.gosuwager.marshallers.GameMarshaller

// Place your Spring DSL code here
beans = {
    objectMarshallers(ObjectMarshallers) {
        marshallers = [
            new GameMarshaller()
        ]
    }


}
