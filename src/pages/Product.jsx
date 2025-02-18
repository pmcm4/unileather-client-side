import { Add, Remove } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({ padding: "10px", flexDirection:"column" })}
`
const ImgContainer = styled.div`
flex:1;

`
const Image = styled.img`
width:100%;
height: 90vh;
object-fit: cover;
${mobile({ height: "40vh" })}
`

const Image1 = styled.img`
width:130px;
`;
const InfoContainer = styled.div`
flex:1;
padding: 0px 5px;
${mobile({ padding: "10px" })}
`
const Title = styled.h1`
font-weight: 1000;
font-size: 50px;
color: #59302D;
`
const Desc = styled.p`
margin: 20px 0px;
color:#59302D;
`
const Price = styled.span`
font-weight: 300px;
font-size: 30px;
color:#59302D;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`
const Filter = styled.div`
display: flex;
align-items: center;
color:#59302D;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 400;
    margin-left: 15px;
    color:#59302D;

`
const FilterColor = styled.div`
    
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin:0px 10px;
    cursor: pointer;
    color:#59302D;
    
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    color:#59302D;
`
const FilterSizeOption = styled.option`
color:#59302D;
`
const AddContainer = styled.div`
width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`
const AmountContainer = styled.div`
display: flex;
align-content: center;
font-weight: 700;
cursor: pointer;

`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #59302D;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`
const Button = styled.button`
  padding: 15px;
  border: 2px solid #59302D;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`
const FilterBrand = styled.div`

`
const FilterBrandOption = styled.option`
position: relative;
left: 10px;
top: 1px;
font-size: 18px;
`

const Product = () => {
const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const getProduct = async () =>{
        try{
            const res = await publicRequest.get("/products/find/"+id)
            setProduct(res.data);
        }catch{

        }
    };
    getProduct();
  }, [id])
  
  const handleQuantity = (type) => {
      if(type === "dec" ){
          quantity > 1 && setQuantity(quantity-1);
      } else{
        setQuantity(quantity+1);
      }
  };

  const handleClick = () =>{
        dispatch(
      addProduct({...product, quantity, color, size, brand})
        );
  };
  return (
    <Container>
        <Navbar/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Price>₱{product.price}</Price>
                    <Desc>{product.desc}
                    </Desc>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color:</FilterTitle>
                            {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
                        </Filter>
                        <Filter>
                            <FilterTitle >Size:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                            <FilterSizeOption disabled selected>Size</FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}    </FilterSize>
                        </Filter>
                        <Filter>
                            <FilterTitle >Brand:</FilterTitle>
                            <FilterBrand onChange={(e) => setBrand(e.target.value)}>
                            
                {product.brand?.map((s) => (
                  <FilterBrandOption key={s}>{s}</FilterBrandOption>
                ))}    </FilterBrand>
                        </Filter>
                        
                    </FilterContainer>
                    <Image1 src={"https://res.cloudinary.com/dgb2lnz2i/image/upload/v1658204631/1920px-5_stars.svg_epoyqx.png"}></Image1>
                    <AddContainer>
                    
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity("adincd")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Product