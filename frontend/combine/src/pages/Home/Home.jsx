import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Layout from "../Layout/Layout";
import Welcome from "../../components/Welcome/Welcome";

const Home = () => {
  return (
    <>
      <Layout>
        <Welcome />
      </Layout>
    </>
  );
};

export default Home;
