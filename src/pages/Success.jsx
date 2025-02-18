// @ts-nocheck
import { send } from "@emailjs/browser"
import { Skeleton } from "@mui/material"
import { getCountries, mongoDBDateConverter } from "../components/utils"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import { publicRequest, userRequest } from "../requestMethods"
import { smallMobile } from "../responsive"
import styled from "styled-components"
import { initializeCart } from "../redux/cartRedux"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemEmail = styled.div`
`
const OrderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px;
  gap: 20px;
  ${smallMobile({ margin: 8, gap: "20px 0" })};
`
const Left = styled.div`
  flex-grow: 1;
`
const LeftTitle = styled.h2`
color: #BF4124;
`
const ProductContainer = styled.div`
  margin: 18px 0;
`
const ProductRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2dcdc;
`
const RowItemContainer = styled.div`
  display: flex;
  align-items: center;
`
const RowItem = styled.h3`
  padding: 5px;
  color: #59302D; 
`
const RowItemSkeleton = styled(Skeleton)`
  width: 50px;
  height: 33px;
`
const AddressContainer = styled.div``
const AddressRow = styled.h3`
  font-style: italic;
  color: #59302D;
`
const Right = styled.div`
  flex-grow: 0.66;
  box-shadow: 2px 2px #c0bebe;
  background-color: #CED9BF;
  max-width: 350px;
  max-height: 220px;
  padding: 20px;
  ${smallMobile({
    flexGrow: 1,
    /* width: "calc(100% - 10px)", */
    padding: 5
  })}
`
const RightTitle = styled.h3`
  color: #BF4124;
  margin-bottom: 18px;
`
const RightList = styled.ul`
  ${smallMobile({ padding: 0, listStyleType: "none" })}
`
const RightListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
`
const ItemTitle = styled.h3`
  flex-basis: ${(props) => props.flexBasis};
  flex: ${(props) => props.flex};
  font-weight: ${(props) => (props.isBold === true ? 600 : "normal")};
  white-space: ${(props) => (props.isBold === true ? "wrap" : "initial")};
`
const ColorContainer = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid rgba(59, 75, 147, 0.8);
  background-color: ${(props) => props.color};
`
export default function Success() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { current: productsSkeleton } = useRef(
    [...Array(location.state?.cartProducts.length)].map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton key={idx} width="100%" height={34} />
    ))
  )
  const { current: addressSkeleton } = useRef(
    [...Array(5)].map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton key={Math.random() + idx} width="100%" height={23} />
    ))
  )
  const [data, setData] = useState({
    cartProducts: [],
    stripeData: {
      billing_details: { address: "", name: "", email: "", phone: "" },
      payment_method_details: { card: "" }
    },
    ordersData: { _id: "", amount: 0, shippingPrice: 0, createdAt: 0 }
  })
  const {
    stripeData: {
      billing_details: { address, name, email, phone },
      payment_method_details: { card }
    },
    ordersData: { _id: id, amount, shippingPrice, createdAt },
    cartProducts
  } = data
  useEffect(() => {
    if (!location.state) history.push({ pathname: "/" })
    else {
      location.state.shippingPrice = 0
      dispatch(initializeCart())
      ;(async () => {
        const { stripeId, paypalId } = location.state.ordersData
        
        try {
          if (stripeId) {
            const { data: stripeData } = await publicRequest.get(
              `/checkout/payment/intents/${stripeId}`
            )
            setData({
              ...location.state,
              stripeData:
                stripeData.charges
                  .data[0] /* eslint-disable-line react/jsx-props-no-spreading */
            })
            
          } else {
            
            const { data: stripeData } = await publicRequest.get(
              `/paypal/payment/${paypalId}`
            )
            console.log(paypalId)
            setData({
              ...location.state,
              stripeData
            })
           
          }
          
          setLoading(false)
          
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [dispatch, history, location])

  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <OrderContainer>
        <Left>
          <LeftTitle>{t("ORDER DETAILS")}</LeftTitle>
          <ProductContainer>
            <ProductRow>
              <RowItem>{t("PRODUCT ORDERED")}</RowItem>
              <RowItem>{t("TOTAL")}</RowItem>
            </ProductRow>
            {loading
              ? productsSkeleton
              : cartProducts.map((product) => (
                  <ProductRow key={product.size + product.color + product.name}>
                    <RowItemContainer>
                      <RowItem isName>
                        {product.title}&nbsp;{` x${product.quantity}`}
                        &nbsp;{product?.size}
                      </RowItem>
                      <ColorContainer color={product.color} />
                    </RowItemContainer>
                    <RowItem>
                      {t("₱") + product.quantity * product.price }
                    </RowItem>
                  </ProductRow>
                ))}
            <ProductRow>
              <RowItem>{t("SUBTOTAL")}</RowItem>
              <RowItem>
                {loading ? <RowItemSkeleton /> : `${t("₱")}${amount}`}
              </RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>{t("PAYMENT METHOD")}</RowItem>
              <RowItem>{loading ? <RowItemSkeleton /> : card.brand}</RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>{t("SHIPPING FEE")}</RowItem>
              <RowItem>
                {loading ? <RowItemSkeleton /> :  t("₱") + shippingPrice}
              </RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>{t("TOTAL")}</RowItem>
              <RowItem>
                {loading ? (
                  <RowItemSkeleton />
                ) : (
                  `${t("₱")}${amount + shippingPrice}`
                )}
              </RowItem>
            </ProductRow>
          </ProductContainer>
          <AddressContainer>
            <LeftTitle style={{ marginBottom: 18 }}>
              {t("BILLING ADDRESS")}
            </LeftTitle>
            {loading ? (
              addressSkeleton
            ) : (
              <>
                <AddressRow>{name}</AddressRow>
                <AddressRow>{address.line1}</AddressRow>
                <AddressRow>{`${address.postal_code}, ${address.city}, ${
                  getCountries({
                    code: address.country,
                    country: false
                  })?.country
                }`}</AddressRow>
                <AddressRow>{email}</AddressRow>
                <AddressRow>{phone}</AddressRow>
              </>
            )}
          </AddressContainer>
        </Left>
        <Right>
          <RightTitle>{t("RECEIPT")}</RightTitle>
          <RightList>
            <RightListItem>
              <ItemTitle>{t("ORDER ID")}&nbsp;</ItemTitle>
              <ItemTitle isBold flexBasis="310px">
                {loading ? <Skeleton /> : id}
              </ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>{t("DATE:")}&nbsp;</ItemTitle>
              <ItemTitle isBold flex={1}>
                {loading ? (
                  <Skeleton />
                ) : (
                  mongoDBDateConverter({ date: createdAt, noHour: false })
                )}
              </ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>{t("EMAIL:")}&nbsp;</ItemTitle>
              <ItemEmail isBold flex={1}>
                {loading ? <Skeleton /> : email}
              </ItemEmail>
            </RightListItem>
            <RightListItem>
              <ItemTitle>{t("TOTAL:")}&nbsp;</ItemTitle>
              <ItemTitle isBold flex={1}>
                {loading ? (
                  <Skeleton />
                ) : (
                 t("₱") +  amount + shippingPrice 
                )}
              </ItemTitle>
            </RightListItem>
          </RightList>
        </Right>
      </OrderContainer>
      <Footer />
    </Container>
  )
}
