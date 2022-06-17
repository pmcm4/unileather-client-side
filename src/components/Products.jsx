import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../config";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {

  const [products,setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async ()=>{
      try{
        const res = await axiosInstance.get(
          cat 
          ? `https://unileather-api.herokuapp.com/api/products?category=${cat}` 
          : "https://unileather-api.herokuapp.com/api/products"
          );
          setProducts(res.data);
      }catch(err){

      };
    };
    getProducts();

  },[cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item=> 
        Object.entries(filters).every(([key,value]) =>
          item[key].includes(value)
      )
    )
    );
  },[products,cat,filters]);


  useEffect(() => {
    if((sort==="latest")){
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=> a.createdAt - b.createdAt)
        );
    } else if((sort==="high")){
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=> a.price - b.price)
        );
    }else {
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=> b.price - a.price)
        );
    }
  }, [sort]);
  

  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )) : products.slice(0, 10)
      .map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;