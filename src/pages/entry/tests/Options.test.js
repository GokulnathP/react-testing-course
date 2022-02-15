import Options from "../Options";
import {render, screen} from "../../../test-utils/testing-library-utils";

describe("Options", () => {
    it('should render all the scoops options', async () => {
        render(<Options optionType="scoops"/>);

        const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i});
        expect(scoopImages).toHaveLength(2);

        const altText = scoopImages.map(element => element.alt);
        expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
    });

    it('should render all the toppings options', async () => {
        render(<Options optionType="toppings"/>);

        const toppingImages = await screen.findAllByRole("img", {name: /topping$/i});
        expect(toppingImages).toHaveLength(3);

        const altText = toppingImages.map(element => element.alt);
        expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
    });
})