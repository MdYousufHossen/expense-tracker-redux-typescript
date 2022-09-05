import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Transaction from "../components/Transaction";
import { fetchTransactions } from "../features/transaction/transactionSlice";

const Transactions = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, transactions, error } = useAppSelector(
    (state: RootState) => state.transactions
  );
  useEffect(() => {
    dispatch(fetchTransactions({ search: "", type: "", page: 0, limit: 0 }));
  }, [dispatch]);
  let content = null;
  if (isLoading) content = <p>Loading....</p>;
  if (!isLoading && isError) content = <p className="error">{error}</p>;
  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No Transactions found!</p>;
  }
  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions
      .slice(Math.max(transactions.length - 5, 0))
      .reverse()
      .map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ));
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul> {content}</ul>
      </div>
      <div className="form">
        <Link to="/view">
          <button className="link view_edit btn">View All</button>
        </Link>
      </div>
    </>
  );
});

export default Transactions;
