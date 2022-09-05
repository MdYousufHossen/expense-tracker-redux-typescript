import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTransaction,
  editTransaction,
  getTransactions,
  removeTransaction,
} from "./transactionAPI";

export interface transactionType {
  name: string;
  amount: number;
  type: string;
  id?: number;
}

interface paginationType {
  page: number;
  limit: number;
  totalItem: string;
}
interface initialStateType {
  isLoading: boolean;
  isError: boolean;
  transactions: transactionType[];
  error: string | undefined;
  edit: transactionType;
  search: string;
  type: string;
  pagination: paginationType;
}

const emptyObject = {
  name: "",
  amount: 0,
  type: "",
  id: 0,
};
const initialState: initialStateType = {
  isLoading: false,
  isError: false,
  transactions: [],
  error: "",
  edit: emptyObject,
  type: "",
  search: "",
  pagination: {
    page: 1,
    limit: 5,
    totalItem: "",
  },
};

interface fetchDataType {
  totalItem: string;
  transactions: transactionType[];
}

interface filterType {
  search: string;
  type: string;
  page: number;
  limit: number;
}

// async thunks......
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async ({ search, type, page, limit }: filterType) => {
    const transactions = await getTransactions(search, type, page, limit);
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data: transactionType) => {
    const transactions = await addTransaction(data);
    return transactions;
  }
);

export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ id, data }: { id: number; data: transactionType }) => {
    const transactions = await editTransaction(id, data);
    return transactions;
  }
);
export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id: number) => {
    const transactions = await removeTransaction(id);
    return transactions;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    eidtActive: (state, action: PayloadAction<transactionType>) => {
      state.edit = action.payload;
    },
    eidtInActive: (state) => {
      state.edit = emptyObject;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    resetQueryString: (state) => {
      state.search = "";
      state.type = "";
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      // fetch transactions data.........
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<fetchDataType>) => {
          state.isLoading = false;
          state.isError = false;
          state.error = "";
          state.transactions = action.payload.transactions;
          state.pagination.totalItem = action.payload.totalItem;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.transactions = [];
        state.pagination.totalItem = "";
      })
      //   create transaction ..
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<transactionType>) => {
          state.isLoading = false;
          state.isError = false;
          state.error = "";
          state.transactions.push(action.payload);
        }
      )
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      //   update transaction.........
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(
        updateTransaction.fulfilled,
        (state, action: PayloadAction<transactionType>) => {
          state.isLoading = false;
          state.isError = false;
          state.error = "";
          const updateIndex = state.transactions.findIndex(
            (t) => t.id === action.payload.id
          );
          state.transactions[updateIndex] = action.payload;
        }
      )
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      //   delete transaction................
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      }),
});

export default transactionSlice.reducer;
export const {
  eidtActive,
  eidtInActive,
  setType,
  setSearchString,
  resetQueryString,
  setPageCount,
} = transactionSlice.actions;
