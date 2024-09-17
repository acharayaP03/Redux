const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const CREATE_CUSTOMER = "customer/createCustomer";
const UPDATE_NAME = "customer/updateName";

export default function customerReducer(state = initialStateCustomer, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CUSTOMER:
      return {
        ...state,
        fullName: payload.fullName,
        nationalID: payload.nationalID,
        createdAt: payload.createdAt,
      };

    case UPDATE_NAME:
      return {
        ...state,
        fullName: payload,
      };

    default:
      return state;
  }
}

//Customer action Creator

function createCustomer(fullName, nationalID) {
  return {
    type: CREATE_CUSTOMER,
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: UPDATE_NAME,
    payload: fullName,
  };
}

export { createCustomer, updateName };
