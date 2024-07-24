import React from "react";
import Layout from "../Layout/Layout";
import Welcome from "../../components/Welcome/Welcome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Welcome />
      </Layout>
    </>
  );
};

export default Home;
