import {render, screen} from "@testing-library/react";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

describe("Total update", () => {
    it('should update scoops subtotal when scoop selection changes', async () => {
        render(<Options optionType="scoops"/>, {wrapper: OrderDetailsProvider});

        const subtotal = screen.getByText("Scoops total: $", {exact: false});
        expect(subtotal).toHaveTextContent("0.00");

        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, "1");
        expect(subtotal).toHaveTextContent("2.00");

        const chocolateInput = await screen.findByRole("spinbutton", {name: "Chocolate"});
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, "2");
        expect(subtotal).toHaveTextContent("6.00");
    });

    it('should update toppings subtotal when toppings are checked', async () => {
        render(<Options optionType="toppings"/>, {wrapper: OrderDetailsProvider});

        const subtotal = screen.getByText("Toppings total: $", {exact: false});
        expect(subtotal).toHaveTextContent("0.00");

        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
        userEvent.click(cherriesCheckbox);
        expect(subtotal).toHaveTextContent("1.50");

        const hotFudgeCheckbox = await screen.findByRole("checkbox", {name: "Hot fudge"});
        userEvent.click(hotFudgeCheckbox);
        expect(subtotal).toHaveTextContent("3.00");

        userEvent.click(hotFudgeCheckbox);
        expect(subtotal).toHaveTextContent("1.50");
    });

    describe("Grand total", () => {
        it('should update total properly when scoops added first', async () => {
            render(<OrderEntry/>, {wrapper: OrderDetailsProvider});

            const total = screen.getByText("Grand total: $", {exact: false});
            expect(total).toHaveTextContent("0.00");

            const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
            userEvent.clear(vanillaInput);
            userEvent.type(vanillaInput, "2");
            expect(total).toHaveTextContent("4.00");

            const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
            userEvent.click(cherriesCheckbox);
            expect(total).toHaveTextContent("5.50");
        });

        it('should update total properly when toppings added first', async () => {
            render(<OrderEntry/>, {wrapper: OrderDetailsProvider});

            const total = screen.getByText("Grand total: $", {exact: false});

            const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
            userEvent.click(cherriesCheckbox);
            expect(total).toHaveTextContent("1.50");

            const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
            userEvent.clear(vanillaInput);
            userEvent.type(vanillaInput, "2");
            expect(total).toHaveTextContent("5.50");
        });

        it('should update total properly when items are removed', async () => {
            render(<OrderEntry/>, {wrapper: OrderDetailsProvider});

            const total = screen.getByText("Grand total: $", {exact: false});

            const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
            userEvent.clear(vanillaInput);
            userEvent.type(vanillaInput, "2");

            const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
            userEvent.click(cherriesCheckbox);

            userEvent.type(vanillaInput, "1");
            expect(total).toHaveTextContent("3.50");

            userEvent.click(cherriesCheckbox);
            expect(total).toHaveTextContent("2.00");
        });
    });
});