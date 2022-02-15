import './App.css';
import {Container} from "react-bootstrap";
import {OrderDetailsProvider} from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import {useState} from "react";
import SummaryForm from "./pages/summary/SummaryForm";
import Confirmation from "./pages/confirmation/Confirmation";

function App() {
    const [orderPhase, changeOrderPhase] = useState("NewOrder");
    const [orderNumber, setOrderNumber] = useState("");

    const renderOrderPhase = () => {
        if (orderPhase === "ConfirmOrder")
            return <SummaryForm setOrderNumber={setOrderNumber} changeOrderPhase={changeOrderPhase}/>
        if (orderPhase === "ConfirmationPage")
            return <Confirmation orderNumber={orderNumber} changeOrderPhase={changeOrderPhase}/>
        return <OrderEntry changeOrderPhase={changeOrderPhase}/>
    }

    return (
        <Container>
            <OrderDetailsProvider>
                {renderOrderPhase()}
            </OrderDetailsProvider>
        </Container>
    );
}

export default App;
