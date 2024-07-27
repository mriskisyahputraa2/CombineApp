import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import BookList from "../../components/BookList/BookList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const Books = () => {
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
    <div>
      <Layout>
        <BookList />
      </Layout>
    </div>
  );
};

export default Books;
