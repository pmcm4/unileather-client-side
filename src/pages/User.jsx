import {
  AccountBox,
  AlternateEmail,
  CallOutlined,
  Close,
  HomeOutlined,
  LocalPhone,
  LocationCity,
  MailOutline,
  MarkunreadMailboxOutlined,
  PermIdentityOutlined,
  PublicOutlined,
  Room
} from "@mui/icons-material"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../redux/apiCalls"
import { mobile, tablet } from "../responsive"
import styled from "styled-components"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./user.css";
import { useLocation } from "react-router-dom"

const Container = styled.div`
`
const Option = styled.option``
const StyledPermIdentityOutlined = styled(PermIdentityOutlined)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`
const Select = styled.select`
  background-color: rgba(206, 217, 191, 0.3);
  border: none;
  border-bottom: 1px solid gray;
  width: calc(100% - 10px);
  padding: 8px 0;
  margin: 0 5px 15px;
  color: black;
  font-size: 16px;
  //height: 20px;
  &:focus-visible {
    outline: 2px solid #4f9ae7;
  }
`
const Main = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`
const Card = styled.div`
  max-width: 570px;
  height: 850px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 3px black;
  ${mobile({ width: "calc(100vw - 40px)" })} 
`
const CardTop = styled.div`
  background-image: url("https://res.cloudinary.com/dgb2lnz2i/image/upload/v1651483059/desktop_-_top_banner_2_1800x_osq8qo.png");
  background-size: cover;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const CardTitle = styled.h2`
  position: relative;
  color: #59302d;
  margin: 15px 0 5px;
`
const CardDate = styled.h3`
  color: #ffffffbd;
  font-weight: 100;
`
const CardButton = styled.div`
  border-radius: 5px;
  top: 100px;
  padding: 10px 20px;
  border: 1px solid #59302d;
  color: #59302d;
  text-align: center;
  background-color: #CED9BF;
  &:hover {
    background-color: rgba(206, 217, 191, 0.5);
    color: #59302d;
    cursor: pointer;
  }
`
const CardBottom = styled.div`
  flex: 1;
  position: relative;
  bottom: 35px;
  width: 100%;
  min-height: 200px;
`
const CardBottomWrapper = styled.div`
  margin: 15px;
  height: calc(100% - 30px);
`

const BottomTitle = styled.h2`
position: relative;
top: 25px;
  font-weight: 400;
  font-size: 26px;
  font-style: normal;
  margin-bottom: 40px;
  color: #59302d;
`

const BottomField = styled.div`
  position: relative;
`
const Label = styled.label`
  color: #59302d;
  padding: 8px 5px;
`
const Input = styled.input`
  border: none;
  background-color: rgba(206, 217, 191, 0.3);
  border-bottom: 1px solid #59302d;
  width: calc(100% - 10px);
  padding: 8px 0;
  margin: 0 5px 15px;
  color: black;
  font-size: 16px;
  &:focus-visible {
    outline: 2px solid #4f9ae7;
  }
`


const StyledMailOutline = styled(MailOutline)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`
const StyledCallOutlined = styled(CallOutlined)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`
const StyledHomeOutlined = styled(HomeOutlined)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`
const StyledLocationCity = styled(LocationCity)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`
const StyledMarkunreadMailboxOutlined = styled(MarkunreadMailboxOutlined)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`
const StyledPublicOutlined = styled(PublicOutlined)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

const Modal = styled.div`
  width: 80vw;
  max-width: 250px;
  height: 150px;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
`
const ModalHeader = styled.div`
  flex: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  border-bottom: 1px solid darkgrey;
  background-color: #CED9BF;
`
const ModalTitle = styled.h3`
  text-align: center;
  color: #59302d;

`
const ModalContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
`

const ModalInput = styled.input`
  max-width: 70%;
`
const ModalButton = styled.button`
  padding: 5px;
  width: 5vw;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 20px;
  border: 1px solid #59302d;
  color: #59302d;
  text-align: center;
  background-color: #CED9BF;
  &:hover {
    background-color: rgba(206, 217, 191, 0.5);
    color: #59302d;
    cursor: pointer;
  }
`

export default function User() {
  const { currentUser, isFetching, error } = useSelector((state) => state.user)
  const isMounted = useRef(false)
  console.log(currentUser)
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
      { country: "Philippines", code: "US" },
      { country: "Uruguay", code: "UY" }
    ],
    []
  )
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      setdata(currentUser)
    }
    return () => {
      isMounted.current = false
    }
  }, [currentUser])
  const [data, setdata] = useState({
    fname: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    city:""
})
  const {
    firstname,
    lastname,
    username,
    email,
    phone,
    address,
    city,
    postalBox,
    country
  } = data 


const handleUpdate = (e) => {
  setdata((prev) => {
    return { ...prev, [e.target.name]: e.target.value };
  });
};
const [disabled, setDisabled] = useState(true)
const [modal, setModal] = useState(false)
  const dispatch = useDispatch();
  const [modalPassword, setModalPassword] = useState("")
  const handleClick = () => {
    if (!disabled) setModal(true)
    setDisabled(!disabled)
  }
  const handleUpdateUser = (e) => {
    const user = Object.entries(currentUser)
    const newInfo = Object.entries(data).filter((x, i) =>
      x !== undefined ? x[1] !== user[i][1] : false
    )
    // @ts-ignore
    const { _id: id } = currentUser
    if (newInfo) {
      updateUser(dispatch, id, data)
      if (!isFetching && !error) {
        setModal(false)
      }
      if (!isFetching && !error) {
        setModal(false)
      }
    }
}
const handleNo = (e) => {
  setModal(false)
}
  return (
    <Container>
    <Navbar/>
    <Sidebar />
    <Main>
      {modal && (
        <ModalContainer>
          <Modal>
            <ModalHeader>
              <ModalTitle>{("ARE YOU SURE YOU WANT TO SAVE CHANGES?")}</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <ModalButton onClick={handleUpdateUser}>
                {("YES")}
              </ModalButton>
              <ModalButton onClick={handleNo}>
                {("NO")}
              </ModalButton>
            </ModalContent>
          </Modal>
        </ModalContainer>
      )}
      <Card>
        <CardTop>
          <CardButton onClick={handleClick}>
            {disabled ? ("EDIT") : ("SAVE")}
          </CardButton>
          <CardTitle>{`${firstname} ${lastname}`}</CardTitle>
        </CardTop>
        <CardBottom>
          <CardBottomWrapper>
            <BottomTitle>{("PROFILE")}</BottomTitle>
            
            <BottomField>
            <Label>{("USERNAME")}</Label>
              <Input
                disabled={disabled}
                type="text"
                name="username"
                value={username}
                onChange={handleUpdate}
              />
              <StyledPermIdentityOutlined style={{color:"#59302d"}}/>
            </BottomField>
            <BottomField>
            <Label>{("FIRST NAME")}</Label>
              <Input
                disabled={disabled}
                type="text"
                name="firstname"
                value={firstname}
                onChange={handleUpdate}
              />
               <StyledPermIdentityOutlined style={{color:"#59302d"}}/>
              </BottomField>
              <Label>{("LAST NAME")}</Label>
              <BottomField>
              <Input
                disabled={disabled}
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleUpdate}
              />
              <StyledPermIdentityOutlined style={{color:"#59302d"}}/>
            </BottomField>
            <BottomField>
              <Label>{("EMAIL")}</Label>
              <Input
                disabled={disabled}
                type="email"
                name="email"
                value={email}
                onChange={handleUpdate}
              />
              <StyledMailOutline style={{color:"#59302d"}}/>
            </BottomField>
            <BottomField>
              <Label>{("PHONE")}</Label>
              <Input
                disabled={disabled}
                type="tel"
                name="phone"
                value={phone}
                onChange={handleUpdate}
              />
              <StyledCallOutlined style={{color:"#59302d"}}/>
            </BottomField>
            <BottomField>
              <Label>{("ADDRESS")}</Label>
              <Input
                disabled={disabled}
                type="text"
                name="address"
                value={address}
                onChange={handleUpdate}
              />
              <StyledHomeOutlined style={{color:"#59302d"}}/>
            </BottomField>
            <BottomField>
              <Label>{("CITY")}</Label>
              <Input
                disabled={disabled}
                type="text"
                name="city"
                value={city}
                onChange={handleUpdate}
              />
              <StyledLocationCity style={{color:"#59302d"}}/>
            </BottomField>
            <BottomField>
                <Label>{("COUNTRY")}</Label>
                <Select
                  disabled={disabled}
                  name="country"
                  value={country}
                  onChange={handleUpdate}
                >
                  {countries.map(({ country: cntry, code }) => (
                    <Option key={code} value={code}>
                      {cntry}
                    </Option>
                  ))}
                </Select>
              </BottomField>
            <BottomField>
              <Label>{("ZIP CODE")}</Label>
              <Input
                disabled={disabled}
                type="text"
                name="postalBox"
                value={postalBox}
                onChange={handleUpdate}
              />
              <StyledMarkunreadMailboxOutlined style={{color:"#59302d"}}/>
            </BottomField>
            
          </CardBottomWrapper>
        </CardBottom>
      </Card>
    </Main>
    <Footer/>
  </Container>
)
}

