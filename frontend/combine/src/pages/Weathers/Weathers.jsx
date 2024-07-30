import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import WeatherApp from "../../components/WeathersList/WeatherApp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const Weathers = () => {
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
  });
  return (
    <div>
      <Layout>
        <WeatherApp />
      </Layout>
    </div>
  );
};

export default Weathers;
