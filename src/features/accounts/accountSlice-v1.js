const initialStateAccount = {
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

export default function accountReducer(state = initialStateAccount, action) {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNT_DEPOSIT:
      return {
        ...state,
        balance: state.balance + payload,
        loading: false,
      };

    case ACCOUNT_WITHDRAW:
      return {
        ...state,
        balance: state.balance - payload,
      };
    case ACCOUNT_REQUEST_LOAN:
      const { amount, purpose } = payload;
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        loan: state.loan + amount,
        loanPurpose: purpose,
        balance: state.balance + amount,
      };

    case ACCOUNT_PAY_LOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - payload,
      };

    case ACCOUNT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

function deposit(amount, currency) {
  if (currency === "USD") {
    return {
      type: ACCOUNT_DEPOSIT,
      payload: amount,
    };
  }

  return async function (dispatch, getState) {
    dispatch({
      type: ACCOUNT_LOADING,
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

function withdraw(amount) {
  return {
    type: ACCOUNT_WITHDRAW,
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_REQUEST_LOAN,
    payload: {
      amount,
      purpose,
    },
  };
}

function payLoan(amount) {
  return {
    type: ACCOUNT_PAY_LOAN,
    payload: amount,
  };
}

export { deposit, withdraw, requestLoan, payLoan };
