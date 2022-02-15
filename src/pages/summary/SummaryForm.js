import {useState} from "react";
import Popover from "react-bootstrap/Popover";
import {OverlayTrigger} from "react-bootstrap";
import axios from "axios";
import {useOrderDetails} from "../../contexts/OrderDetails";

const SummaryForm = ({setOrderNumber, changeOrderPhase}) => {
    const [isTermsAgreed, setIsTermsAgreed] = useState(false);
    const [,,resetItemCount] = useOrderDetails();

    const submitHandler = () => {
        axios.post("http://localhost:3030/orders", {})
            .then(res => {
                setOrderNumber(res.data.orderNumber);
                resetItemCount();
                changeOrderPhase("ConfirmationPage");
            });
    }

    const popup = () => {
        return (
            <Popover>
                <Popover.Body>
                    No ice cream gonna deliver
                </Popover.Body>
            </Popover>
        );
    };

    const checkboxLabel = () => {
        return (
            <span>
                I agree all
               <OverlayTrigger placement="right" overlay={popup} trigger={["hover", "focus"]}>
                    <span style={{color: "blue"}}>terms & conditions</span>
               </OverlayTrigger>
            </span>
        );
    }

    return (
        <div>
            <input
                type="checkbox"
                id="agree-terms"
                checked={isTermsAgreed}
                onChange={(event) => setIsTermsAgreed(event.target.checked)}
            />
            <label htmlFor="agree-terms">{checkboxLabel()}</label>
            <br/>
            <button disabled={!isTermsAgreed} onClick={submitHandler}>Confirm order</button>
        </div>
    );
};

export default SummaryForm;