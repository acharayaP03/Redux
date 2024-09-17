import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  loading: false,
};

const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUEST_LOAN = "account/requestLoan";
const ACCOUNT_PAY_LOAN = "account/payLoan";
const ACCOUNT_LOADING = "account/loading";

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
      state.loading = false;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    requestLoan: {
      // in the case of a loan, we need to prepare the action, where multiple args.
      prepare: (amount, purpose) => ({
        payload: { amount, purpose },
      }),
      reducer: (state, action) => {
        const { amount, purpose } = action.payload;
        if (state.loan > 0) {
          return state;
        }
        state.loan += amount;
        state.loanPurpose = purpose;
        state.balance += amount;
      },
    },
    payLoan: (state, action) => {
      state.balance -= action.payload;
      state.loan = 0;
      state.loanPurpose = "";
    },
    loading: (state) => {
      state.loading = true;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan, loading } =
  accountSlice.actions;

export default accountSlice.reducer;
