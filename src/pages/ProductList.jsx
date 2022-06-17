import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { red } from "@material-ui/core/colors";
import productlist from './productlist.css'

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
  color: #BF4124;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #59302D;
`;

const Filter = styled.div`
  margin: 20px;
  color: #59302D;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  color: #59302D;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  color: #59302D;`;

const Button = styled.button`
border:none;
padding: 10px;
background-color: white;
color: #59302D;
cursor: pointer;
font-weight: 600;`

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("latest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters, 
      [e.target.name]: value,
    });
  };
  const resetFilters = (e) => {
    setFilters({})
  }

  return (
    <Container>
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>FILTER CATEGORIES:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled selected>
              Color
            </Option>
            <Option>black</Option>
            <Option>brown</Option>
            <Option>navy</Option>
            <Option>gray</Option>
            <Option>charcoal</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>
              Size
            </Option>
            <Option>37</Option>
            <Option>37.5</Option>
            <Option>38</Option>
            <Option>38.5</Option>
            <Option>39</Option>
            <Option>39.5</Option>
            <Option>40</Option>
            <Option>41</Option>
            <Option>41.5</Option>
            <Option>42</Option>
            <Option>43</Option>
            <Option>43.5</Option>
            <Option>44</Option>
            <Option>44.5</Option>
            <Option>45</Option>
            <Option>45.6</Option>--
            <Option>46</Option>
            <Option>48</Option>
            <Option>49</Option>
            <Option>50</Option>
          </Select>
          <FilterText>BRANDS:</FilterText>
          <Select name="brand" onChange={handleFilters}>
            <Option value="blank" disabled selected  >BRANDS</Option>
            <Option disabled >LOCAL BRANDS</Option>
            <Option>ANDANTE</Option>
            <Option>C-POINT</Option>
            <Option>CORA & BEAR</Option>
            <Option>EL MARIKEÑO</Option>
            <Option>GIOVANNE THE LABEL</Option>
            <Option>JOCO COMENDADOR</Option>
            <Option>MARQUINA</Option>
            <Option>RUSTY LOPEZ</Option>
            <Option>SAPATERO MANILA</Option>
            <Option>THE NOBLEMAN</Option>
            <Option disabled >INTERNATIONAL BRANDS</Option>
            <Option>ALDEN</Option>
            <Option>ALFRED SARGENT</Option>
            <Option>BERLUTI</Option>
            <Option>BRUNO MAGLI</Option>
            <Option>CARMINA</Option>
            <Option>CHRISTIAN KIMBER</Option>
            <Option>COLE HANN</Option>
            <Option>CROCKETT AND JONES</Option>
            <Option>DOLCE & GABBANA</Option>
            <Option>EDWARD GREEN</Option>
            <Option>GAZIANO & GIRLING</Option>
            <Option>GEORGE CLEVERLY</Option>
            <Option>GUCCI</Option>
            <Option>JOHN LOBB</Option>
            <Option>JOHNSTON & MURPHY</Option>
            <Option>MEERMIN</Option>
            <Option>PRADA</Option>
            <Option>R.M. WILLIAMS</Option>
            <Option>STEFANO BEMER</Option>
            <Option>TESTONI</Option>
            <Option>TIMBERLAND</Option>
            <Option>VASS SHOES</Option>
          </Select>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </Filter>
        <Filter>
          <FilterText>SORT PRODUCTS:</FilterText>
          <Select onChange={e=>setSort(e.target.value)}>
            <Option value="latest">Latest</Option>
            <Option value="low">Lowest Price</Option>
            <Option value="high">Highest Price</Option>
          </Select>
        </Filter>
        
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/>
      <Footer />
    </Container>
  );
};

export default ProductList;