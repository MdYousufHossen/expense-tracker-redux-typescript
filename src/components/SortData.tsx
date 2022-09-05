import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {
  resetQueryString,
  setSearchString,
} from "../features/transaction/transactionSlice";
import Radio from "./Radio";

const SortData = memo(() => {
  const { search } = useAppSelector((state: RootState) => state.transactions);
  const dispatch = useAppDispatch();
  return (
    <div className="filter">
      <div className="form-group radio">
        <button onClick={() => dispatch(resetQueryString())}>reset</button>
        <Radio />
      </div>
      <input
        value={search}
        onChange={(e) => dispatch(setSearchString(e.target.value))}
      />
    </div>
  );
});

export default SortData;
