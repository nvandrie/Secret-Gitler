import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CardDrawing from "../components/DeckActions/CardDrawing";
import { searchRoleByName } from "../components/IdentityCheck";

// Mocking the module that contains the searchRoleByName function
jest.mock("../components/IdentityCheck", () => ({
  searchRoleByName: jest.fn().mockResolvedValue("president"),
}));
const mockStore = configureMockStore();

// Setup for Redux store
const initialState = {
  auth: { basicUserInfo: { name: "John Doe" } },
  deck: { currentCards: ["fascist", "liberal", "default"] },
};
const store = mockStore(initialState);

describe("CardDrawing Component Tests", () => {
  it("renders without crashing and shows cards", () => {
    const store = mockStore({
      auth: { basicUserInfo: { name: "John Doe" } },
      deck: { currentCards: ["fascist", "liberal", "default"] },
    });

    render(
      <Provider store={store}>
        <CardDrawing setSelectedCards={jest.fn()} />
      </Provider>
    );

    // Check for the images instead of "Card Display" text
    const cards = screen.getAllByRole("img");
    expect(cards.length).toBe(3);
    expect(cards[0]).toHaveAttribute("alt", "fascist");
    expect(cards[1]).toHaveAttribute("alt", "liberal");
    expect(cards[2]).toHaveAttribute("alt", "default");

    cards.forEach((card) => {
      expect(card).toHaveAttribute("src", "test-file-stub");
    });
  });
  it("initially shows cards and resets correctly on prop change", () => {
    const store = mockStore({
      auth: { basicUserInfo: { name: "John Doe" } },
      deck: { currentCards: ["fascist", "liberal", "default"] },
    });

    const { rerender } = render(
      <Provider store={store}>
        <CardDrawing setSelectedCards={jest.fn()} />
      </Provider>
    );

    let cards = screen.getAllByRole("img");
    expect(cards.length).toBe(3); // Initially, three cards are shown

    // Simulate a change in props that would trigger a rerender
    store.dispatch({
      type: "UPDATE_CURRENT_CARDS",
      payload: ["fascist", "liberal"],
    });

    rerender(
      <Provider store={store}>
        <CardDrawing setSelectedCards={jest.fn()} />
      </Provider>
    );

    cards = screen.getAllByRole("img");
    expect(cards.length).toBe(3);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    (searchRoleByName as jest.Mock).mockResolvedValue("president");
  });

  //   it("selects a card when user is president and less than 2 cards are already selected", async () => {
  //     // Mocking dependencies and setting initial state
  //     const basicUserInfo = { name: "John Doe" };
  //     const selectedCards = [{ type: "liberal", path: "liberal_path" }];
  //     const currentCards = ["fascist", "liberal", "default"];
  //     const setSelectedCards = jest.fn();
  //     const setSelectedCardsState = jest.fn();
  //     const setIsCardsVisible = jest.fn();

  //     // Mocking searchRoleByName to return "president"
  //     searchRoleByName.mockResolvedValue("president");

  //     // Rendering the CardDrawing component
  //     const store = configureMockStore()({
  //       auth: { basicUserInfo },
  //       deck: { currentCards },
  //     });
  //     render(
  //       <Provider store={store}>
  //         <CardDrawing setSelectedCards={setSelectedCards} />
  //       </Provider>
  //     );

  //     // Simulating card click
  //     const buttons = screen.getAllByRole("button");
  //     fireEvent.click(buttons[0]);

  //     // Assertions
  //     expect(searchRoleByName).toHaveBeenCalledWith(basicUserInfo.name);
  //     expect(setSelectedCardsState).toHaveBeenCalledWith([
  //       ...selectedCards,
  //       { type: "fascist", path: "fascist_path" }, // Assuming the clicked card is fascist
  //     ]);
  //     expect(setSelectedCards).not.toHaveBeenCalled(); // setSelectedCards should not be called since less than 2 cards are selected
  //     expect(setIsCardsVisible).toHaveBeenCalledWith(false);
  //   });
});
