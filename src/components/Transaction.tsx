import { memo } from "react";
import { useAppDispatch } from "../app/hooks";
import deleteImage from "../assets/images/delete.svg";
import editImage from "../assets/images/edit.svg";
import {
  deleteTransaction,
  eidtActive,
  transactionType,
} from "../features/transaction/transactionSlice";
import ThosandSeparators from "../utils/ThosandSeparators";
const Transaction = memo(
  ({ transaction }: { transaction: transactionType }) => {
    const dispatch = useAppDispatch();
    const handleEdit = () => {
      dispatch(eidtActive(transaction));
    };
    const handleDelete = () => {
      if (!transaction.id) return;
      dispatch(deleteTransaction(transaction.id));
    };
    return (
      <li className={`transaction ${transaction.type}`}>
        <p>{transaction.name}</p>
        <div className="right">
          <p>৳ {ThosandSeparators(transaction.amount)}</p>
          <button onClick={handleEdit} className="link">
            <img className="icon" src={editImage} alt="edit" />
          </button>
          <button onClick={handleDelete} className="link">
            <img className="icon" src={deleteImage} alt="delete" />
          </button>
        </div>
      </li>
    );
  }
);

export default Transaction;
