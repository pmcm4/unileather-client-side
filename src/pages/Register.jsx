import { useState } from "react";
import styled from "styled-components"
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/apiCalls";
import { Redirect } from "react-router-dom";
import { useMemo } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://wallpaperaccess.com/full/680096.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #CED9BF;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
 font-size: 24px;
  font-weight: 400;
  color: #BF4124;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  color: #59302D;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #59302D;
  color: white;
  cursor: pointer;
`;


const Success = styled.span`
color: green;
`;
const Link = styled.a`
  position: relative;
  left: 350px;
  top: 30px;
  margin: 5px 0px;
  font-size: 12px;
  color: #59302D;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({ position:"relative", left: "30%"})}
`;
const Error = styled.span`
color: red;
`;
const Select = styled.select`
  padding: 10px;
  color: #59302D;
  ${mobile({ margin: "10px 0px" })}

  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  color: #59302D;
`;
const Option = styled.option`
  color: #59302D;`;


const Register = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);
  const {isFetching, error, users } = useSelector((state)=> state.user);
  console.log(error)
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const user = {...inputs};
    addUser(dispatch, user);
  }
  const handleLogin = (e) => {
    
  }
  const countries = useMemo(
    () => [
      { country: "Argentina", code: "AR" },
      { country: "Australia", code: "AU" },
      { country: "Austria", code: "AT" },
      { country: "Belgium", code: "BE" },
      { country: "Bolivia", code: "BO" },
      { country: "Brazil", code: "BR" },
      { country: "Bulgaria", code: "BG" },
      { country: "Canada", code: "CA" },
      { country: "Chile", code: "CL" },
      { country: "Colombia", code: "CO" },
      { country: "Costa Rica", code: "CR" },
      { country: "Croatia", code: "HR" },
      { country: "Cyprus", code: "CY" },
      { country: "Czech Republic", code: "CZ" },
      { country: "Denmark", code: "DK" },
      { country: "Dominican Republic", code: "DO" },
      { country: "Egypt", code: "EG" },
      { country: "Estonia", code: "EE" },
      { country: "Finland", code: "FI" },
      { country: "France", code: "FR" },
      { country: "Germany", code: "DE" },
      { country: "Greece", code: "GR" },
      { country: "Hong Kong SAR China", code: "HK" },
      { country: "Hungary", code: "HU" },
      { country: "Iceland", code: "IS" },
      { country: "India", code: "IN" },
      { country: "Indonesia", code: "ID" },
      { country: "Ireland", code: "IE" },
      { country: "Israel", code: "IL" },
      { country: "Italy", code: "IT" },
      { country: "Japan", code: "JP" },
      { country: "Latvia", code: "LV" },
      { country: "Liechtenstein", code: "LI" },
      { country: "Lithuania", code: "LT" },
      { country: "Luxembourg", code: "LU" },
      { country: "Malta", code: "MT" },
      { country: "Mexico ", code: "MX" },
      { country: "Netherlands", code: "NL" },
      { country: "New Zealand", code: "NZ" },
      { country: "Norway", code: "NO" },
      { country: "Paraguay", code: "PY" },
      { country: "Peru", code: "PE" },
      { country: "Philippines", code: "PHP" },
      { country: "Poland", code: "PL" },
      { country: "Portugal", code: "PT" },
      { country: "Romania", code: "RO" },
      { country: "Singapore", code: "SG" },
      { country: "Slovakia", code: "SK" },
      { country: "Slovenia", code: "SI" },
      { country: "Spain", code: "ES" },
      { country: "Sweden", code: "SE" },
      { country: "Switzerland", code: "CH" },
      { country: "Thailand", code: "TH" },
      { country: "Trinidad & Tobago", code: "TT" },
      { country: "United Arab Emirates", code: "AE" },
      { country: "United Kingdom", code: "GB" },
      { country: "United States", code: "US" },
      { country: "Uruguay", code: "UY" }
    ],
    []
  )
  return (
    <Container>
        <Wrapper>
            <Title>REGISTER</Title>
            <Form>
                <Input name="firstname" type="text" onChange={handleChange} placeholder = "FIRST NAME"/>
                <Input name="lastname" type="text" onChange={handleChange} placeholder = "LAST NAME"/>
                <Input name="username" type="text" onChange={handleChange} placeholder = "USERNAME"/>
                <Input name="email" type="email" onChange={handleChange} placeholder = "EMAIL"/>
                <Input name="password" type="password" onChange={handleChange} placeholder = "PASSWORD"/>
                <Input name="address" type="text" onChange={handleChange} placeholder = "STREET ADDRESS"/>
                <Input name="city" type="text" onChange={handleChange} placeholder = "CITY"/>
                <Input name="postalBox" type="text" onChange={handleChange} placeholder = "ZIP CODE"/>
                <Select
                  name="country"
                  onChange={handleChange}
                >
                  {countries.map(({ country: cntry, code }) => (
                    <Option key={code} value={code}>
                      {cntry}
                    </Option>
                  ))}
                </Select>
                <Input name="phone" type="text" onChange={handleChange} placeholder = "PHONE"/>
                <Agreement>
                By creating an account, You agree to the processing of your personal data in accordance with the <b>Privacy Policy</b>
                </Agreement>
                <Button onClick={handleClick}> CREATE</Button> 
                {error && <Error>Something went wrong...</Error>}
                <Link rel="stylesheet" href="/login">Click here to login</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register;