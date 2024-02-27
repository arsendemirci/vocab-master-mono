import React from "react";
import { TypeBoard, GameCreate, ScoreBoard } from "components";
import { useParams } from "react-router";
function Game() {
  const { quick } = useParams();
  console.log("GAME COMPONEENT  QUICK PARAM", quick);
  return (
    <div>
      <section>
        <GameCreate quick={quick} />
        <TypeBoard />
        <ScoreBoard />
      </section>
    </div>
  );
}

export default Game;
