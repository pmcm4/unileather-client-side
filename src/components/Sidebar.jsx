import {
  AccountBoxOutlined,
  ExitToAppSharp,
  HomeSharp,
  LocalGroceryStore
} from "@mui/icons-material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import { logout } from "../redux/userRedux"
import { userRequest } from "../requestMethods"
import { mobile, smallMobile, tablet } from "../responsive"
import styled from "styled-components"
import Loader from "./Loader"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 311px;
  ${tablet({
    height: "auto",
    maxHeight: 74,
    flexDirection: "row",
    borderBottom: "2px solid #e5e5e5"
  })};
  ${mobile({ minWidth: "initial" })}
`

const MainContainer = styled.div`
  padding: 20px;
  flex: 1;
  
  ${tablet({ display: "flex", padding: 10 })}
  ${mobile({ padding: 0 })}
`
const Row = styled.div`
position: relative;
text-align: center;
`;
const MainItem = styled.div`
  color: #BF4124; 
  display: inline-flex;
  align-items: center;
  padding: 15px 25px;
  width: 200px;
  &:hover {
    background: rgba(206, 217, 191, 0.1);
    & > * {
      color: #CED9BF;
    }
  }
  cursor: pointer;
  & > svg {
    ${mobile({ fontSize: 18 })};
  }
  ${tablet({
    padding: 0,
    flex: 1,
    justifyContent: "center"
  })};
  &:not(:last-of-type) {
    ${tablet({ borderRight: "2px solid #e5e5e5" })}
  }
  ${mobile({
    flex: (props) => props.flex
  })}

`
const MainItemTitle = styled.h1`
  
  margin-left: 10px;
  font-size: 22px;
  font-weight: 500;
  ${tablet({ fontSize: 15 })};
  ${mobile({ display: "none" })};
`

export default function Sidebar() {
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const {
    currentUser: { _id: id }
    // @ts-ignore
  } = useSelector((state) => state.user)
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Container>
      {loading && <Loader />}
      <MainContainer>
      <Row>
        <MainItem
          onClick={() => {
            if (location.pathname !== "/user") history.push("/user")
          }}
        >
          <AccountBoxOutlined style={{color:"#59302d"}}/>
          <MainItemTitle>{t("Profile")}</MainItemTitle>
        </MainItem>
        
        <MainItem
          onClick={() => {
            ;(async () => {
              if (location.pathname !== "/user/orders") {
                try {
                  setLoading(true)
                  const { data: orderLength } = await userRequest.get(
                    `orders/${id}?count=true`
                  )
                  history.push({
                    pathname: "/user/orders",
                    state: { orderLength }
                  })
                } catch (err) {
                  setLoading(false)
                }
              }
            })()
          }}
        >
          <LocalGroceryStore style={{color:"#59302d"}}/>
          <MainItemTitle>{t("Orders")}</MainItemTitle>
        </MainItem>
        <MainItem onClick={() => handleLogout(dispatch)}>
          <ExitToAppSharp style={{color:"#59302d"}} />
          <MainItemTitle>{t("Logout")}</MainItemTitle>
        </MainItem>
        </Row>
      </MainContainer>
    </Container>
  )
}