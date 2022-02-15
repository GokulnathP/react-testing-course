import Options from "./Options";
import {useOrderDetails} from "../../contexts/OrderDetails";

const OrderEntry = ({changeOrderPhase}) => {
    const [{total}] = useOrderDetails();

    return (
        <div>
            <Options optionType="scoops"/>
            <Options optionType="toppings"/>
            <h2>Grand total: {total.grandTotal}</h2>
            <button onClick={() => changeOrderPhase("ConfirmOrder")}>Submit order</button>
        </div>
    );
}

export default OrderEntry;