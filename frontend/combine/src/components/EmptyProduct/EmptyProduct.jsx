import React from "react";
import addProductImg from "../../assets/images/add-product.png";

const EmptyProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 rounded-lg">
      <img
        className="w-40 h-40 object-cover mb-4"
        src={addProductImg}
        alt="No notes"
      />
      <p className="text-center text-lg font-semibold mb-4">
        Start adding your first product!
      </p>
      <p className="text-center text-gray-500 text-sm">
        Click the 'Add Product' button to add your desired product. Let's get!
        started!
      </p>
    </div>
  );
};

export default EmptyProduct;
