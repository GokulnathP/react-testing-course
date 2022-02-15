import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {pricePerItem} from "../constants";
import {formatAmount} from "../utilities";

const OrderDetails = createContext();

export const useOrderDetails = () => {
    const context = useContext(OrderDetails);

    if (!context) {
        throw Error("context must be used within the provider");
    }

    return context;
}

const calculateTotal = (optionType, optionCounts) => {
    let optionCount = 0;

    for (const count of optionCounts[optionType].values()) {
        optionCount += Number(count);
    }

    return optionCount * pricePerItem[optionType];
}

export const OrderDetailsProvider = ({children}) => {
    const initialState = {
        scoops: new Map(),
        toppings: new Map()
    };
    const [optionCounts, setOptionCounts] = useState(initialState);

    const zeroTotal = formatAmount(0);
    const [total, setTotals] = useState({
        scoops: zeroTotal,
        toppings: zeroTotal,
        grandTotal: zeroTotal
    });

    useEffect(() => {
        const scoopsTotal = calculateTotal("scoops", optionCounts);
        const toppingsTotal = calculateTotal("toppings", optionCounts);
        const grandTotal = scoopsTotal + toppingsTotal;

        setTotals({
            scoops: formatAmount(scoopsTotal),
            toppings: formatAmount(toppingsTotal),
            grandTotal: formatAmount(grandTotal)
        })
    }, [optionCounts]);

    const value = useMemo(() => {
        const updateItemCount = (itemName, newCount, optionType) => {
            const newOptionCounts = {...optionCounts};

            newOptionCounts[optionType].set(itemName, newCount);

            setOptionCounts(newOptionCounts);
        }

        const resetItemCount = () => {
            setOptionCounts(initialState);
        }

        return [{...optionCounts, total}, updateItemCount, resetItemCount];
    }, [optionCounts, total])

    return (
        <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
    );
}
