const Confirmation = ({orderNumber, changeOrderPhase}) => {
    return (
        <div>
            <p>Your order number is {orderNumber}</p>
            <button onClick={() => changeOrderPhase("NewOrder")}>New order</button>
        </div>
    );
}

export default Confirmation;