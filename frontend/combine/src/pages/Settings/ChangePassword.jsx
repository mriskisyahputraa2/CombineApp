import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout/Layout";
import FormChangePassword from "../../components/SettingList/FormChangePassword";

const ChangePassword = () => {
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
  }, [isError, navigate]);

  return (
    <>
      <Layout>
        <FormChangePassword />
      </Layout>
    </>
  );
};

export default ChangePassword;
