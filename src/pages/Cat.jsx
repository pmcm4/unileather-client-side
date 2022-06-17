import React from 'react'
import styled from 'styled-components';
import Categories from "../components/Categories";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Products from '../components/Products';
import Slider from '../components/Slider'

const Title = styled.div`
text-align: center;
font-size: 50px;
padding: 40px;
color: #59302d;
`
const Cat = () => {
  return (
    <div>
        <Navbar/>
        <Title>CATEGORIES</Title>
        <Categories/>
        <Footer/>
    </div>
  )
}

export default Cat;