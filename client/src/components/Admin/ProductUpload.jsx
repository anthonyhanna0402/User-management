import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const navigation = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name:'',
    price:'',
    quantity:'',
    image:''    
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData =new FormData();
    formData.append('image', newProduct.image);
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('quantity', newProduct.quantity);

    try {
      await axios.post('http://localhost:5000/api/product/upload', formData);
      alert('successfule'); 
      navigation('/admin');
    } catch (error) {
      console.log('error');
    }
  };
  
  const handleImage = (e) => {
    setNewProduct({...newProduct, image:e.target.files[0]});
  }

  const handleChange = (e) => {
    setNewProduct({...newProduct, [e.target.name]:e.target.value});
  }
  return(
    <>
    <div className="mt-10 mx-auto w-full max-w-sm">
    <form className="flex flex-col py-32" onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        className="py-4"
        name="image"
        onChange={handleImage}
      />
      <div className="font-bold text-sm leading-6">
        <label htmlFor="name" className="mt-2">Name:</label>
        <input
          type="text"
          placeholder="name"
          name="name"
          id="name"
          className="block rounded-sm border-1 border-solid border-black py-1.5 pl-1"
          value={newProduct.name}
          onChange={handleChange}
        />
      </div>
      <div className="font-bold text-sm leading-6">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          placeholder="price"
          name="price"
          id="price"
          className="block rounded-sm border-1 border-black py-1.5 pl-1"
          value={newProduct.price}
          onChange={handleChange}
        />
      </div>
      <div className="font-bold text-sm leading-6">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          placeholder="quantity"
          name="quantity"
          id="quantity"
          className="block rounded-sm border-1 border-black py-1.5 pl-1"
          value={newProduct.quantity}
          onChange={handleChange}
        />
      </div>
      <button className="border-0 border-black bg-cyan-400" type="submit">Add</button>
    </form>
    </div>
    </>

  )
}

export default ProductUpload;