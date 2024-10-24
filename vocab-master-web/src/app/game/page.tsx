"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GameStatus, QuestionType, QuizLength } from "@/config/enums";
import { GameSliceType, StoreType } from "@/types";
import { enumMap } from "@/utils/arrayUtils";
import {
  getGameLists,
  selectList,
  startGame,
  selectQuestionType,
  selectQuizLength,
} from "@/store/slices/gameSlice";
import style from "./page.module.scss";
import {
  Autocomplete,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import axios from "axios";

function CreateGame() {
  console.log("[RENDERING] CreateGame Component", Object.entries(QuizLength));

  const gameStore = useSelector((state: StoreType) => state.gameSlice);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSelectList = (event: any, selectedOption: any) => {
    dispatch(selectList({ ...selectedOption }));
  };
  const onSelectQuestionType = (event: any, selectedOption: any) => {
    console.log("selected Option", selectedOption);
    dispatch(selectQuestionType(selectedOption));
  };
  const onSelectQuizLength = (event: any, selectedOption: any) => {
    console.log("selected Option", selectedOption);
    dispatch(selectQuizLength(selectedOption));
  };

  //    const onStartGame = async () => {
  //      const gameData = await ipc.getGame(gameStore.game.settings.list.id);
  //      dispatch(startGame({ gameData }));
  //    };

  useEffect(() => {
    (async function getListData() {
      const response = (await axios.get("/api/list/getListsAll")).data;

      dispatch(getGameLists({ lists: response }));
    })();
  }, []);

  return (
    <div className={style.box}>
      <span className={style.boxtitle}>Game Preferences</span>
      <div className={style.border}>
        <div>
          <Autocomplete
            options={gameStore.lists.map((opt: any) => {
              return { label: opt.title, id: opt.id };
            })}
            sx={{ width: 400 }}
            onChange={onSelectList}
            renderInput={(params) => {
              return <TextField {...params} label="Vocabulary List" />;
            }}
          />
        </div>
        <div>
          <FormControl>
            <FormLabel id="question-type">Question Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="question-type"
              name="radio-qType"
              onChange={onSelectQuestionType}
            >
              {enumMap(QuestionType, ([key, value]) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={key}
                  key={key}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel id="quiz-length">Quiz Length</FormLabel>
            <RadioGroup
              row
              aria-labelledby="quiz-length"
              name="radio-length"
              onChange={onSelectQuizLength}
            >
              {enumMap(QuizLength, ([key, value]) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={key}
                  key={key}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button onClick={() => console.log("game start")}>Start Game</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
