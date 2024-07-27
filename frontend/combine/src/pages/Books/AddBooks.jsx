import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import FormAddBook from "../../components/BookList/FormAddBook";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const AddBooks = () => {
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
        <FormAddBook />
      </Layout>
    </div>
  );
};

export default AddBooks;
