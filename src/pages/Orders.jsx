import { Skeleton } from "@mui/material"

import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { userRequest } from "../requestMethods"
import { mobile, tablet } from "../responsive"
import styled from "styled-components"
import Modal from "../components/Modal"
import Sidebar from "../components/Sidebar"
import { mongoDBDateConverter } from "../components/utils"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const Container = styled.div`
 display: flex;
  flex-direction: column;
`

const Main = styled.div`
  width: 100vw;
  min-height: 130vh;
  flex: 4;
  background-color: #fff;
  padding: 20px;
  position: relative;
`
const MainTitle = styled.h1`
  color: #BF4124;
  text-align: center;
  margin-bottom: 45px;
`
const ItemTitleContainer = styled.div`
  background-color: #CED9BF;
  display: flex;
  padding: 15px 15px;
  margin-bottom: 15px;
  ${mobile({ display: "none" })}
`
const ItemTitle = styled.h4`
  flex: 1;
  text-align: center;
  color: #BF4124;
`
const ListBody = styled.ul`
  width: 100%;
  padding: 0;
`
const ListItem = styled.li`
  list-style-type: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  ${mobile({ height: "auto", marginBottom: 20 })}
`
const ListItemHeader = styled.div`
  background-color: #CED9BF;
  flex: 0 1 28px;
  color: #BF4124;
  ${mobile({ display: "flex", flexDirection: "column" })}
`
const ListItemHeaderSkeleton = styled(Skeleton)`
  && {
    flex: 0 1 28px;
    transform: scale(1);
    border-radius: 0;
  }
`
const HeaderHour = styled.span`
  margin-right: 10px;
  margin-left: 21px;
`
const HeaderOrderNumber = styled.span`
  ${mobile({ marginLeft: 21 })}
`
const ListItemRow = styled.div`
  flex: 1;
  display: flex;
  padding: 0 10px;
  ${mobile({
    flexDirection: "column",
    padding: 0
  })}
`
const RowItem = styled.div`
  flex: 1;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color:#59302D;
  justify-content: center;
  font-size: 25px;
  &:not(:last-of-type) {
    border-right: 1px solid #e5e5e5;
    ${mobile({
      borderRight: "none",
      borderBottom: "2px solid #e5e5e5"
      /* maxWidth: 150 */
    })}
  }
`

const RowItemSkeleton = styled(Skeleton)`
  && {
    border-radius: 0;
    transform: scale(1);
    width: 50%;
  }
`

const Status = styled.span``
const Button = styled.div`
  padding: 4px;
  border: 1px solid #222;
  margin-bottom: 5px;
  margin-top: 5px;
  color: #59302D;
  text-align: center;
  max-width: 80%;
  &:hover {
    background: rgba(206, 217, 191, 1);
    color: #59302D;
    cursor: pointer;
  }
  ${tablet({ padding: 2 })}
`
const Orderid = styled.div`
 padding: 4px;
  margin-bottom: 5px;
  margin-top: 5px;
  color: #59302D;
  text-align: center;
  max-width: 80%;
`
const RowItemBtnSkeleton = styled(Skeleton)`
  && {
    transform: scale(1);
    border-radius: 0;
    padding: 4px;
    display: block;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 80%;
  }
`
const EmptyOrderContainer = styled.div`
  position: absolute;
  width: fit-content;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({ margin: "20px 0", position: "fixedfixed" })}
`
const EmptyOrderTitle = styled.h2`
  text-align: center;
  ${mobile({ fontSize: 20 })}
  color: #59302D;
`
const Tracking = styled.h4`
  color: black;
  margin: 20px;
`
const Link = styled.a`
  display: block;
  color: white;
  background-color: black;
  padding: 15px;
  text-decoration: none;
  transition-duration: 150ms;
  transition-property: background color;
  transition-timing-function: ease-in-out;
  transition-delay: 50ms;
  &:hover {
    color: black;
    background-color: rgba(0, 0, 0, 0.426);
  }
`
function Orders() {
  const {
    currentUser: { _id: id }
    // @ts-ignore
  } = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const skeleton = useRef(
    Array(location.state?.orderLength)
      .fill("")
      .map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={idx}>
          <ListItemHeader>
            <ListItemHeaderSkeleton />
          </ListItemHeader>
          <ListItemRow>
            <RowItem>
              <RowItemSkeleton />
            </RowItem>
            <RowItem>
              <RowItemSkeleton />
            </RowItem>
            <RowItem>
              <RowItemSkeleton />
              <RowItemBtnSkeleton />
            </RowItem>
            <RowItem>
              <RowItemSkeleton />
              <RowItemSkeleton style={{ marginTop: 5 }} />
            </RowItem>
          </ListItemRow>
        </ListItem>
      ))
  )
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      userRequest.get(`orders/${id}`).then(({ data }) => {
        setOrders(data)
        setLoading(false)
      })
    }
    return () => {
      isMounted.current = false
    }
  }, [id])
  const { t } = useTranslation()

  const history = useHistory()
  const [copy, setCopy] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(null)
  const [sentBack, setSentBack] = useState(false)
  const handleCopy = () => {
    if (sentBack) navigator.clipboard.writeText(t("email"))
    else navigator.clipboard.writeText(trackingNumber)
    setCopy(true)
  }
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => {
    setOpenModal(false)
    setCopy(false)
    setSentBack(false)
  }
  const handleOrdersDetails = ({ orderId, productsLength }) => {
    history.push({
      pathname: `/user/order/${orderId}`,
      state: { productsLength }
    })
  }
  if (loading && location.state?.orderLength) {
    return (
      <Container>
      <Navbar/>
        <Sidebar />
        <Main>
          <MainTitle>{t("ORDERS")}</MainTitle>
          <ItemTitleContainer>
            <ItemTitle>{t("user.orders.itemTitle")}</ItemTitle>
            <ItemTitle>{t("user.orders.total")}</ItemTitle>
            <ItemTitle>{t("user.orders.itemState")}</ItemTitle>
            <ItemTitle>{t("user.orders.activity")}</ItemTitle>
          </ItemTitleContainer>
          <ListBody>{skeleton.current}</ListBody>
        </Main>
        <Footer/>
      </Container>
    )
  }
  return (
    <Container>
        <Navbar/>
      <Sidebar />
      <Main>
        <MainTitle>{t("ORDERS")}</MainTitle>
        {orders.length ? (
          <>
            <ItemTitleContainer>
              <ItemTitle>{t("ORDER CREATED AND ID")}</ItemTitle>
              <ItemTitle>{t("AMOUNT TOTAL")}</ItemTitle>
              <ItemTitle>{t("ORDER DETAILS")}</ItemTitle>
            </ItemTitleContainer>
            <ListBody>
              {orders.map(
                ({
                  _id: orderId,
                  createdAt,
                  products,
                  amount,
                  status,
                  shippingPrice,
                  trackingNumber: trackNum
                }) => (
                  <ListItem key={orderId}>
                  
                    <ListItemRow>
                      <RowItem>
                      {loading ? (
                          <>
                            <RowItemSkeleton />
                            <RowItemBtnSkeleton />
                          </>
                        ) : (
                          <>
                          {mongoDBDateConverter({
                              date: createdAt,
                              noHour: true
                            })}
                            <Orderid>
                            {t(`${orderId}`)}
                            </Orderid>
                          </>
                        )}
                      </RowItem>
                      <RowItem>
                        {loading ? (
                          <RowItemSkeleton />
                        ) : (
                          `${("₱")}${amount + shippingPrice}`
                        )}
                      </RowItem>
                      <RowItem>
                        {loading ? (
                          <>
                            <RowItemSkeleton />
                            <RowItemBtnSkeleton />
                          </>
                        ) : (
                          <>
                            <Status>{t(`${status}`.toUpperCase())}</Status>
                            <Button
                              onClick={() =>
                                handleOrdersDetails({
                                  orderId,
                                  productsLength: products.length
                                })
                              }
                            >
                              {t("DETAILS")}
                            </Button>
                          </>
                        )}
                      </RowItem>

                    </ListItemRow>
                  </ListItem>
                )
              )}
            </ListBody>
          </>
        ) : (
          <EmptyOrderContainer>
            <EmptyOrderTitle>{t("NO ACTIVE ORDERS")}</EmptyOrderTitle>
          </EmptyOrderContainer>
        )}
        
      </Main>
      
      <Footer/>
    </Container>
    
  )
}

export default Orders
