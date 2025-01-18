import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../app/index";  // Adjust if necessary

describe("HomeScreen Component", () => {
    test("renders the title correctly", () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText("🛍️ Buddy's Shopping World")).toBeTruthy();
    });

    test("displays the initial cart total as $0.00", () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText("🛒 Cart Total: $0.00 (0 items)")).toBeTruthy();
    });

    test("adds an item to the cart", () => {
        const { getByText, getAllByText } = render(<HomeScreen />);

        const addToCartButtons = getAllByText("Add to Cart");
        fireEvent.press(addToCartButtons[0]);

        expect(getByText(/Cart Total: \$/)).toBeTruthy();
    });
});