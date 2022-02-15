import {useEffect, useState} from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import {Row} from "react-bootstrap";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {pricePerItem} from "../../constants";
import {formatAmount} from "../../utilities";

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    const [orderDetails, updateItemCount] = useOrderDetails();

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(res => setItems(res.data))
            .catch(err => setError(true));
    }, [optionType]);

    if (error) {
        return (
            <AlertBanner/>
        );
    }

    const title = optionType[0].toUpperCase() + optionType.slice(1);
    const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;
    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(newItemCount) => {
                updateItemCount(item.name, newItemCount, optionType)
            }}
        />
    ));

    return (
        <Row>
            <h1>{title}</h1>
            <p>{formatAmount(pricePerItem[optionType])} each</p>
            <p>{title} total: {orderDetails.total[optionType]}</p>
            {optionItems}
        </Row>
    );
}

export default Options;