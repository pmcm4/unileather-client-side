import { Badge, CircularProgress } from '@material-ui/core';
import { AccountBox, Search, ShoppingCartOutlined } from '@material-ui/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from '../redux/userRedux';
import Blog from '../pages/Blog';
import { useState } from 'react';
import { publicRequest, userRequest } from '../requestMethods';
import Loader from './Loader';
import { categories } from '../data';
const Container = styled.div `
    height: 60px;
    background-color: #CED9BF;
    ${mobile({height: "50px"})}
 `


const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding: "5px 0px"})}
`;
const Left = styled.div`
flex: 1;
display: flex;
`;


const SearchContainer = styled.div`
  border: 0.5px solid #59302d;
  display: flex;
  align-items: center;
  margin-left: px;
  padding: 5px;  
  position: relative;
  left: -30px;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border:none;
  background-color: #ced9bf;
  ${mobile({width: "1px"})}
  
  
`;
const Logo = styled.img`
  position: relative; 
  top: -5px;
  right: -20px;
  width: 130px;
  height: 50px;
  ${mobile({width: "100px", height: "40px", position: "relative", left: 10, top: 1})}
  cursor: pointer;
`
const Center = styled.div`
display: flex;
position: relative;
${mobile({ position: "relative", left:10})}
`;
const Right = styled.div`
flex: 1;
display: flex;
align-content: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center"})}
`;
const SearchOptions = styled.div`
  opacity: ${(props) => props.opacity};
  transition: ${(props) => `opacity ${props.transition}ms, top 150ms`};
  max-height: 110px;
  left: -1px;
  right: -1px;
  background-color: rgba(0, 0, 0, 0.7);
  list-style-type: none;
  position: absolute;
  top: 41px;
  z-index: 1;
  padding: 5px;
  overflow-y: auto;
`
const SearchOption = styled.li`
  color: white;
  cursor: pointer;
  position: relative;
  &:hover {
    ::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`

const MenuItem = styled.div`
cursor: pointer;
margin-left: 15px;
margin-right: 5px;
`;
const Name = styled.div`
font-size: 15px;
margin-left: 10px;
margin-right: 10px;
margin-top: 2px;
justify-content: flex-end;
${mobile({ display: "none" })}
`;
const Home = styled.div`
${mobile({fontSize: 14 })}
font-size: 15px;
margin-left: 15px;

justify-content: flex-end;
cursor: pointer;
&:hover{
    transform: scale(1.1)
}
`;
const Men = styled.div`
${mobile({fontSize: 14 })}
font-size: 15px;
margin-left: 15px;
justify-content: flex-end;
cursor: pointer;

&:hover{
    transform: scale(1.1)
}
`;
const Women = styled.div`
${mobile({fontSize: 14 })}
font-size: 15px;
margin-left: 15px;
justify-content: flex-end;
cursor: pointer;
&:hover{
    transform: scale(1.1)
}
`;
const AboutUs = styled.div`
${mobile({fontSize: 14 })}
font-size: 15px;
margin-left: 15px;
justify-content: flex-end;
cursor: pointer;
&:hover{
    transform: scale(1.1)
}
`;
const BlogP = styled.div`
${mobile({fontSize: 14 })}
font-size: 15px;
margin-left: 15px;
justify-content: flex-end;
cursor: pointer;
&:hover{
    transform: scale(1.1)
}
`;
const PL = styled.div`
flex: 1;
display: flex;
align-content: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center", position:"relative", right:-33 })}
`;

const Navbar = ({item}) => {
  const user = useSelector(state=>state.user.currentUser);
  const quantity = useSelector(state=>state.cart.quantity);
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  const history = useHistory()
  const [search, setSearch] = useState("")
  const [canSearch, setCanSearch] = useState(false)
  const [showOption, setShowOption] = useState(false)
  const [searching, setSearching] = useState(false)
  const handleSearch = (link = "") => {
    if (typeof link === "string") {
      setShowOption(false)
      ;(async () => {
        try {
          setSearching(true)
          const { data: skeletonLength } = await publicRequest.get(
            `/products?category=${link}&page=0&count=true`
          )
          history.push({
            pathname: `/products/${link || search}`,
            state: { skeletonLength }
          })
          setSearching(false)
          setSearch("")
        } catch (err) {
          setSearching(false)
          setSearch("")
        }
      })()
    }
  }
  const outlinedSx = {
    display: canSearch ? "none" : "inline-flex",
    verticalAlign: "middle"
  }
  const { innerWidth: winWidth } = window

  const searchSx = {
    display: canSearch ? "none" : "inline-block",
    color: "gray",
    fontSize: 16,
    cursor: "pointer"
  }
  
  const [categories, setcategories] = useState([])
  const [loading, setLoading] = useState(false)
  const handleCategories = () => {
    setShowOption(true)
    ;(async () => {
      setLoading(true)
      const { data } = await userRequest.get("/category?showCategory=true")
      setcategories(data)
      setLoading(false)
    })()
  }

  return (
    <Container>
     {searching ? <Loader /> : null}
          <Wrapper>
              <Left>
              <Link to= "/">
                <Logo onClick="/" src= "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1653278160/278519841_663397854931466_1165153124016215155_n_1_v0ehw1.png"  />
                </Link>
              </Left>
              <Center>
              <Home>
              <Link  to="/" style={{ textDecoration: 'none', color:'#BF4124' }}>
                   HOME
                </Link>
                </Home>
                <Men>
                <Link  to={`/products/Men`} style={{ textDecoration: 'none', color:'#BF4124' }}>
                  MEN
                </Link>
                </Men>
                <Women>
                <Link  to={`/products/Women`} style={{ textDecoration: 'none', color:'#BF4124' }}>
                   WOMEN
                </Link>
                </Women>
                <BlogP>
              <Link  to="/blog" style={{ textDecoration: 'none', color:'#BF4124' }}>
                   BLOG
                </Link>
                </BlogP>
                <AboutUs>
              <Link  to="/about" style={{ textDecoration: 'none', color:'#BF4124' }}>
                   ABOUT US
                </Link>
                </AboutUs>
                </Center>
                
              <Right canSearch={canSearch}>
              <PL>
                <SearchContainer>
                  <Input type="search"
                      placeholder={("Search")}
                      value={search}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch(search)}
                      onChange={(e) => setSearch(e.target.value)}
                     
                      onBlur={() => {
                setShowOption(false)
                if (winWidth <= 360) setCanSearch(false)
              }}/>
                  <Search style={{color:"#59302d", fontSize:16}} sx={searchSx} onClick={handleSearch} />
                  <SearchOptions
              transition={showOption ? "500" : "200"}
              top={showOption ? "41" : "0"}
              zIndex={showOption ? 1 : -1}
              opacity={showOption ? 1 : 0}
              display={loading ? "flex" : "block"}
              height={loading ? "50px" : "auto"}
            >
              {loading ? (
                <CircularProgress sx={{ margin: "10px 0" }} />
              ) : (
                categories
                  .filter((category) =>
                    new RegExp(search, "gi").test(category.name)
                  )
                  .map((category) => (
                    <SearchOption
                      key={category._id} // eslint-disable-line no-underscore-dangle
                      onMouseDown={() => handleSearch(category.name)}
                    >
                      {category.name}
                    </SearchOption>
                  ))
              )}
            </SearchOptions>
                </SearchContainer>
                
                <Link to= "/login">
                    <AccountBox style={{color:"#59302d"}}/>
                </Link>
                <Link to= "/user" style={{textDecoration: 'none', color:'#59302d' }}>
                {user && <Name >Welcome, {user.firstname}!</Name>}
                </Link>
                <Link to= "/" style={{textDecoration: 'none', color:'#59302d' }}>
                {user && <LogoutIcon onClick={handleLogout}/>}
                </Link>
                </PL>
                <Link to="/cart"> 
                <MenuItem>
                <Badge badgeContent={quantity} color="error">
                    <ShoppingCartOutlined style={{color:"#59302d"}}/>
                </Badge>
                </MenuItem>
                </Link>
                
              </Right>
              
          </Wrapper>
    </Container>
  )
}

export default Navbar