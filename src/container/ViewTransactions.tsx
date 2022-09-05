import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Transaction from "../components/Transaction";
import {
  fetchTransactions,
  setPageCount,
} from "../features/transaction/transactionSlice";

const ViewTransactions = memo(() => {
  const { transactions, pagination, type, search, isLoading, isError, error } =
    useAppSelector((state: RootState) => state.transactions);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchTransactions({
        search,
        type,
        page: pagination.page,
        limit: pagination.limit,
      })
    );
  }, [type, search, dispatch, pagination.page, pagination]);

  useEffect(() => {
    dispatch(setPageCount(1));
  }, [type, search, dispatch]);

  let content = null;
  if (isLoading) content = <p>Loading....</p>;
  if (!isLoading && isError) content = <p className="error">{error}</p>;
  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No Transactions found!</p>;
  }
  if (!isLoading && !isError && transactions?.length > 0) {
    content = (
      <div className="conatiner_of_list_of_transactions">
        <ul>
          {transactions.length &&
            transactions.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
        </ul>
      </div>
    );
  }
  return content;
});

export default ViewTransactions;
