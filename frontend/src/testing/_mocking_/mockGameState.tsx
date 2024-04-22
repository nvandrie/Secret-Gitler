import React from "react";
import LiberalGameBoard from "../../components/GameBoards/LiberalBoard";

interface MockDataProps {
  state: null;
}

const MockGameSession = (props: MockDataProps) => {
  return (
    <div>
      <LiberalGameBoard></LiberalGameBoard>
    </div>
  );
};
