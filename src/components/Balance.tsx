import { memo } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import ThosandSeparators from "../utils/ThosandSeparators";

const Balance = memo(() => {
  const { transactions } = useAppSelector(
    (state: RootState) => state.transactions
  );
  let income = 0;
  transactions.forEach((t) => {
    const { type, amount } = t;
    const pAmount = parseInt(amount.toString());
    if (type === "income") {
      income += pAmount;
    } else {
      income -= pAmount;
    }
  });

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{ThosandSeparators(income)}</span>
      </h3>
    </div>
  );
});

export default Balance;
