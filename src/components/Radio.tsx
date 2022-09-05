import { Fragment, memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { setType } from "../features/transaction/transactionSlice";

const Radio = memo(() => {
  const { type } = useAppSelector((state: RootState) => state.transactions);
  const dispatch = useAppDispatch();
  return (
    <Fragment>
      <div className="radio_group">
        <input
          type="radio"
          required
          value="income"
          name="type"
          checked={type === "income"}
          onChange={() => dispatch(setType("income"))}
        />
        <label>Income</label>
      </div>
      <div className="radio_group">
        <input
          type="radio"
          value="expense"
          name="expanse"
          required
          placeholder="Expense"
          checked={type === "expense"}
          onChange={() => dispatch(setType("expense"))}
        />
        <label>Expense</label>
      </div>
    </Fragment>
  );
});

export default Radio;
