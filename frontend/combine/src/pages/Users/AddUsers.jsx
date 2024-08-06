import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout/Layout";
import FormAddUser from "../../components/UserList/FormAddUser";
const AddUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [navigate, isError]);
  return (
    <>
      <Layout>
        <FormAddUser />
      </Layout>
    </>
  );
};

export default AddUsers;
