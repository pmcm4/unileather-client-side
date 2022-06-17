// @ts-nocheck
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { initializeCart } from "../redux/cartRedux"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1440px;
  margin: auto;
`
const OrderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px;
  gap: 20px;
`
const Left = styled.div`
  flex-grow: 1;
`
const LeftTitle = styled.h2``
const ProductContainer = styled.div`
  margin: 18px 0;
`
const ProductRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2dcdc;
`
const RowItem = styled.h3`
  padding: 5px;
  font-weight: ${(props) =>
    // @ts-ignore
    props.isName ? 100 : 600};
`

const AddressContainer = styled.div``
const AddressRow = styled.h3`
  font-style: italic;
  font-weight: 300;
  &:first-of-type {
    margin-top: 18px;
  }
`

const Right = styled.div`
  flex-grow: 0.66;
  box-shadow: 2px 2px #c0bebe;
  background-color: #f6f6f6;
  max-width: 350px;
  max-height: 220px;
  padding: 20px;
`
const RightTitle = styled.h3`
  color: green;
  margin-bottom: 18px;
`
const RightList = styled.ul`
`
const RightListItem = styled.li``
const ItemTitle = styled.h3`
  display: inline;
  font-weight: ${(props) => (props.isBold ? 600 : "normal")};
  word-break: break-word;
`

export default function OrderSuccess() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    cartProducts : [],
    ordersData: { id: "" },
    stripeData: {
      billing_details: { address: "", name: "", email: "" },
      payment_method_details: { card: "" },
      shipping: "",
      amount: 0
    },
    
  })
  useEffect(() => {
    dispatch(initializeCart())
    // @ts-ignore
    setData({ ...history.location.state })
  }, [dispatch, history])
  console.log(history.location.state)
  const {
    stripeData: {
      billing_details: { address, name, email },
      payment_method_details: { card },
      shipping,
      amount
    },
    ordersData: { _id:id },
    cartProducts
  } = data
  return (
    <Container>
      <Navbar />
      <OrderContainer>
        <Left>
          <LeftTitle>Order details</LeftTitle>
          <ProductContainer>
            <ProductRow>
              <RowItem>PRODUCT</RowItem>
              <RowItem>TOTAL</RowItem>
            </ProductRow>
            {cartProducts.map((product) => (
              <ProductRow>
                <RowItem isName>{product.title}</RowItem>
                <RowItem>{product.quantity * product.price}€</RowItem>
              </ProductRow>
            ))}
            <ProductRow>
              <RowItem>Subtotal</RowItem>
              <RowItem>{amount / 100}€</RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>Payment Method</RowItem>
              <RowItem>{card.brand}</RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>Shipping Fee</RowItem>
              <RowItem>{shipping || 0}€</RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>Total</RowItem>
              <RowItem>{amount / 100 + +shipping}€</RowItem>
            </ProductRow>
          </ProductContainer>
          <AddressContainer>
            <LeftTitle>Billing Address</LeftTitle>
            <AddressRow>{name}</AddressRow>
            <AddressRow>{address.line1}</AddressRow>
            <AddressRow>{`${address.postal_code}, ${address.city}, ${address.country}`}</AddressRow>
            <AddressRow>{email}</AddressRow>
          </AddressContainer>
        </Left>
        <Right>
          <RightTitle>Thank you. Your Order has been received.</RightTitle>
          <RightList>
            <RightListItem>
              <ItemTitle>Order Number:&nbsp;</ItemTitle>
              <ItemTitle isBold>312</ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>Date:&nbsp;</ItemTitle>
              <ItemTitle isBold>March 27, 2020</ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>email:&nbsp;</ItemTitle>
              <ItemTitle isBold>tassadar03x@gmail.com</ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>Total:&nbsp;</ItemTitle>
              <ItemTitle isBold>2200€</ItemTitle>
            </RightListItem>
          </RightList>
        </Right>
      </OrderContainer>
      <Footer />
    </Container>
  )
}