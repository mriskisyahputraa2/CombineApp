import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import FormAddProduct from "../../components/ProductList/FormAddProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const AddProduct = () => {
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
        <FormAddProduct />
      </Layout>
    </div>
  );
};

export default AddProduct;
