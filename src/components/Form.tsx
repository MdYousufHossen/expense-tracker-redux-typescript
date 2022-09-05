import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {
  createTransaction,
  eidtInActive,
  setType,
  updateTransaction,
} from "../features/transaction/transactionSlice";
import Radio from "./Radio";

const Form = memo(() => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [editForm, setEditForm] = useState(false);

  const { edit, type } = useAppSelector(
    (state: RootState) => state.transactions
  );
  const dispatch = useAppDispatch();
  console.log(edit);

  useEffect(() => {
    if (edit?.name) {
      setEditForm(true);
      setName(edit.name);
      setType(edit.type);
      setAmount(edit?.amount.toString());
    } else {
      setEditForm(false);
      resetForm();
    }
  }, [edit]);

  const resetForm = () => {
    setName("");
    setAmount("");
    setType("");
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    resetForm();
  };

  const cancelEditeFomr = () => {
    resetForm();
    setEditForm(false);
    dispatch(eidtInActive());
  };
  const handleUpdate = (e: any) => {
    e.preventDefault();
    if (!edit.id) return;
    dispatch(
      updateTransaction({
        id: edit?.id,
        data: {
          name,
          amount: Number(amount),
          type,
        },
      })
    );
    dispatch(eidtInActive());
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editForm ? handleUpdate : handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
            placeholder="My Salary"
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <Radio />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="300"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          Add Transaction
        </button>
      </form>
      {editForm && (
        <button onClick={cancelEditeFomr} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
});

export default Form;
