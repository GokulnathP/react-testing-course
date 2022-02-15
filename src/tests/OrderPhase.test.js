import {render, screen} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Order Phase", () => {
    it('should able to submit the order', async () => {
        render(<App/>);

        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
        userEvent.click(cherriesCheckbox);

        const submitButton = screen.getByRole("button", {name: "Submit order"});
        userEvent.click(submitButton);

        const termsAndConditions = screen.getByRole("checkbox", {name: "I agree all terms & conditions"});
        userEvent.click(termsAndConditions);

        const confirmButton = screen.getByRole("button", {name: "Confirm order"});
        userEvent.click(confirmButton);

        const orderNumber = await screen.findByText("Your order number is ", {exact: false});
        expect(orderNumber).toHaveTextContent("1234567890");

        const newOrderButton = screen.getByRole("button", {name: "New order"});
        userEvent.click(newOrderButton);

        const scoopsTotal = screen.getByText("Scoops total: $", {exact: false});
        expect(scoopsTotal).toHaveTextContent("0.00");

        const toppingsTotal = screen.getByText("Toppings total: $", {exact: false});
        expect(toppingsTotal).toHaveTextContent("0.00");

        const grandTotal = screen.getByText("Grand total: $", {exact: false});
        expect(grandTotal).toHaveTextContent("0.00");

        await screen.findByRole("spinbutton", {name: "Vanilla"});
        await screen.findByRole("checkbox", {name: "Cherries"});
    });
})