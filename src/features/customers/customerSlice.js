import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const CREATE_CUSTOMER = "customer/createCustomer";
const UPDATE_NAME = "customer/updateName";

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare: (fullName, nationalID) => {
        const createdAt = new Date().toISOString();
        console.log("createdAt", createdAt);
        console.log("fullName", fullName);

        const payload = {
          fullName,
          nationalID,
          createdAt,
        };
        return { payload };
      },

      reducer: (state, action) => {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
