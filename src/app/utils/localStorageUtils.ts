import { useSelector } from "react-redux";

export const getUserIdFromLocalStorage = () => {

  const userId = useSelector((state) => state.location.userId)

  // return localStorage.getItem('userId');
  return userId;

};

export const getTokenFromLocalStorage = () => {
  const token = useSelector((state) => state.location.token)
  // return localStorage.getItem('token');
  return token;

};
