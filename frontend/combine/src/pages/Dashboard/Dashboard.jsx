import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Welcome from "../../components/Welcome/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const Home = () => {
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
        <Welcome />
      </Layout>
    </>
  );
};

export default Home;
