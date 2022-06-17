import { addUserFailure, addUserStart, addUserSuccess, loginFailure, loginStart, loginSuccess, logout, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const addUser = async (dispatch, user) => {
  dispatch(addUserStart());
  try {
    //add
    const res = await userRequest.post("/auth/register", user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }

};
export const updateUser = async (dispatch, id, user) => {
  dispatch(updateUserStart())
  try {
    const { data } = await userRequest.put(`/users/${id}`, user)
    dispatch(updateUserSuccess(data))
  } catch (error) {
    dispatch(updateUserFailure())
  }
}