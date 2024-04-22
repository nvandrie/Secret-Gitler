import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();
const store = mockStore({
  liberalBoard: {
    elements: [{ path: "test-path.png", alt: "test-alt" }],
  },
});

describe("in the liberal board component", () => {
  it("renders without crashing", () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      liberalBoard: {
        elements: [{ path: "test-path.png", alt: "test-alt" }],
      },
    });

    render(
      <Provider store={store}>
        <LiberalGameBoard />
      </Provider>
    );
    expect(screen.getByTestId("liberal-game-board")).toBeInTheDocument();
  });

  it("displays the correct number of cards", () => {
    const store = mockStore({
      liberalBoard: {
        elements: [
          { path: "test-path1.png", alt: "test-alt1" },
          { path: "test-path2.png", alt: "test-alt2" },
          { path: "test-path3.png", alt: "test-alt3" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <LiberalGameBoard />
      </Provider>
    );
    const cards = screen.getAllByRole("img"); // Assuming each card is rendered with an <img> tag
    expect(cards.length).toBe(3);
  });

  it("checks card styles", () => {
    render(
      <Provider store={store}>
        <LiberalGameBoard />
      </Provider>
    );
    const cards = screen.getAllByRole("img"); // Assuming each card is rendered with an <img> tag
    cards.forEach((card) => {
      expect(card).toHaveStyle(`maxWidth: 100%`);
      expect(card).toHaveStyle(`maxHeight: 100%`);
    });
  });

  it("renders correctly when there are no cards", () => {
    const emptyStore = mockStore({
      liberalBoard: {
        elements: [],
      },
    });

    render(
      <Provider store={emptyStore}>
        <LiberalGameBoard />
      </Provider>
    );
    const cards = screen.queryAllByRole("img");
    expect(cards.length).toBe(0);
  });
  it("sets correct alt text for images", () => {
    render(
      <Provider store={store}>
        <LiberalGameBoard />
      </Provider>
    );
    const cardImages = screen.getAllByRole("img");
    expect(cardImages[0]).toHaveAttribute("alt", "test-alt");
  });
  it("renders correctly with three cards", () => {
    const store = mockStore({
      liberalBoard: {
        elements: [
          { path: "card-path-1.png", alt: "Card 1" },
          { path: "card-path-2.png", alt: "Card 2" },
          { path: "card-path-3.png", alt: "Card 3" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <LiberalGameBoard />
      </Provider>
    );
    const cards = screen.getAllByRole("img");
    expect(cards.length).toBe(3);
    cards.forEach((card, index) => {
      expect(card).toHaveAttribute("src", `card-path-${index + 1}.png`);
      expect(card).toHaveAttribute("alt", `Card ${index + 1}`);
    });
  });
  it("renders correctly with four cards", () => {
    const store = mockStore({
      liberalBoard: {
        elements: [
          { path: "card-path-1.png", alt: "Card 1" },
          { path: "card-path-2.png", alt: "Card 2" },
          { path: "card-path-3.png", alt: "Card 3" },
          { path: "card-path-4.png", alt: "Card 4" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <LiberalGameBoard />
      </Provider>
    );
    const cards = screen.getAllByRole("img");
    expect(cards.length).toBe(4);
    cards.forEach((card, index) => {
      expect(card).toHaveAttribute("src", `card-path-${index + 1}.png`);
      expect(card).toHaveAttribute("alt", `Card ${index + 1}`);
    });
  });
});
