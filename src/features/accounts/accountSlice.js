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
const CONVERTING_CURRENCY = "account/convertingCurrency";

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
    payLoan: (state) => {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency: (state) => {
      state.loading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan, loading } = accountSlice.actions;

//redux thunk

export function deposit(amount, currency) {
  if (currency === "USD") {
    return {
      type: ACCOUNT_DEPOSIT,
      payload: amount,
    };
  }

  return async function (dispatch) {
    dispatch({
      type: CONVERTING_CURRENCY,
    });
    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=10&from=${currency}&to=USD`
    );

    const data = await response.json();
    const convertedAmount = data.rates.USD;

    dispatch({
      type: ACCOUNT_DEPOSIT,
      payload: convertedAmount,
    });
  };
}

export default accountSlice.reducer;
