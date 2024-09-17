import { connect, useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const balance = useSelector((state) => state.account.balance);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// old way of connecting to the store
// function mapStateToProps(state) {
//   return { balance: state.account.balance };
// }

// export default connect(mapStateToProps)(BalanceDisplay);
export default BalanceDisplay;
