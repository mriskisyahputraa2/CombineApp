import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import FormEditBook from "../../components/BookList/FormEditBook";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const EditBooks = () => {
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigete("/");
    }
  }, [navigete, isError]);

  return (
    <div>
      <Layout>
        <FormEditBook />
      </Layout>
    </div>
  );
};

export default EditBooks;
