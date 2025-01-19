import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../app/index";

// Mock useNavigation from expo-router
jest.mock("expo-router", () => ({
    useNavigation: () => ({
        setOptions: jest.fn(),
        navigate: jest.fn(),
    }),
}));

// Mock API response
jest.mock("axios", () => ({
    get: jest.fn(() =>
        Promise.resolve({
            data: [
                { id: "1", name: "Product 1", price: "10.99" },
                { id: "2", name: "Product 2", price: "20.99" },
            ],
        })
    ),
}));

describe("HomeScreen Component", () => {
    test("renders the title correctly", async () => {
        const { getByTestId } = render(<HomeScreen />);

        // Use testID instead of getByText
        await waitFor(() => expect(getByTestId("title")).toBeTruthy());
    });

    test("displays the initial cart total as $0.00", async () => {
        const { getByText } = render(<HomeScreen />);

        await waitFor(() => expect(getByText("🛒 Cart Total: $0.00 (0 items)")).toBeTruthy());
    });

    test("adds an item to the cart", async () => {
        const { getByText, getAllByText } = render(<HomeScreen />);

        // Wait for products to load
        await waitFor(() => expect(getAllByText("Add to Cart")).toBeTruthy());

        const addToCartButtons = getAllByText("Add to Cart");
        fireEvent.press(addToCartButtons[0]);

        // Wait for cart total to update
        await waitFor(() => expect(getByText(/Cart Total: \$\d+/)).toBeTruthy());
    });
});