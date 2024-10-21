import style from "./Toolbar.module.scss";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { setSearch } from "@/store/slices/gridSlice";
import { useDispatch } from "react-redux";
const Toolbar = () => {
  const dispatch = useDispatch();

  return (
    <div className={style.toolbar}>
      <TextField
        label="Search"
        size="small"
        className={style.searchInput}
        variant="outlined"
        onChange={(e) => dispatch(setSearch(e.target.value))}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default Toolbar;
