import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Summary form", () => {

    it('should not enable button when terms are not agreed', () => {
        render(<SummaryForm/>);

        const submitButton = screen.getByRole("button", {name: "Confirm order"});
        const checkbox = screen.getByRole("checkbox", {name: "I agree all terms & conditions"});

        expect(checkbox).not.toBeChecked();
        expect(submitButton).toBeDisabled();
    });

    it('should enable button when terms are agreed', () => {
        render(<SummaryForm/>);

        const submitButton = screen.getByRole("button", {name: "Confirm order"});
        const checkbox = screen.getByRole("checkbox", {name: "I agree all terms & conditions"});

        userEvent.click(checkbox);

        expect(checkbox).toBeChecked();
        expect(submitButton).toBeEnabled();

        userEvent.click(checkbox);

        expect(checkbox).not.toBeChecked();
        expect(submitButton).toBeDisabled();
    });

    it('should show popup when hover on the terms & conditions', async () => {
        render(<SummaryForm/>);

        const hiddenPopup = screen.queryByText(/no ice cream gonna deliver/i);
        expect(hiddenPopup).not.toBeInTheDocument();

        const termsAndConditions = screen.getByText(/terms & conditions/i);
        userEvent.hover(termsAndConditions);

        const popup = screen.getByText(/no ice cream gonna deliver/i);
        expect(popup).toBeInTheDocument();

        userEvent.unhover(termsAndConditions);
        await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream gonna deliver/i));
    });
});