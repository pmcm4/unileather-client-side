// @ts-nocheck
import {
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js"
import Billing from "./Billing"
import PaymentMethod from "./PaymentMethod"
import PaypalCheckout from "./PaypalCheckout"
import StripeCheckout from "./StripeCheckout"
import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { userRequest } from "../requestMethods"
import { mobile } from "../responsive"
import styled from "styled-components"
import Loader from "./Loader"
import { SendEmail } from "./utils"

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: rgba(39, 48, 58, 0.91);
  padding: 10px 0;
`

const Title = styled.h1`
  color: #BF4124;
  margin: 15px 0;
  text-align: center;
`
const Form = styled.form`
  display: flex;
  align-items: center;
  width: 90vw;
  max-width: 500px;
  margin: 0 auto;
  flex-direction: column;
`

const ButtonContainer = styled.div``
const Button = styled.button`
  white-space: nowrap;
  border: 0;
  outline: 0;
  display: inline-block;
  height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${(props) => (props.back ? "#e56b67" : "#6772e5")};
  text-decoration: none;
  transition: all 150ms ease;
  margin: 0 10px 20px;
  ${mobile({ margin: 10 })}
  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: ${(props) => (props.back ? "#f3645f" : "#7795f8")};
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.11), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:disabled {
    cursor: not-allowed;
  }
`
const Error = styled.span`
  color: red;
  margin: 15px 0;
  font-size: 20px;
  height: 25px;
  transition: opacity 150ms ease-in;
  opacity: ${(props) => props.opacity};
`
function Checkout() {
  const location = useLocation()
  const history = useHistory()
  const {
    user: { currentUser },
    cart
  } = useSelector((state) => state)
  useLayoutEffect(() => {
    if (cart.products.length === 0 || Object.keys(currentUser).length === 0)
      history.push("/")
  })

  const choosedPm = useRef(0)
  const [choosePM, setChoosePM] = useState(true)
  const [payWithCard, setPayWithCard] = useState(false)
  const [showBilling, setShowBilling] = useState(false)
  const [payWithPaypal, setPayWithPaypal] = useState(false)
  const [error, setError] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const { total, products } = useSelector((state) => state.cart)
  const shippingPrice = location.state?.shippingPrice
  const totalPrice = useRef(total + (shippingPrice <= 0 ? 0 : shippingPrice))
  const [paying, setPaying] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (ev) => {
    setLoading(true)
    ev.preventDefault()
    setError(false)
    if (choosePM) {
      if (choosedPm.current === 0) setError(true)
      else if (choosedPm.current === 1) {
        setShowBilling(true)
        setChoosePM(false)
        setError(false)
      } else if (choosedPm.current === 2) {
        setPayWithPaypal(true)
        setChoosePM(false)
        setError(false)
      }
    } else if (showBilling) {
      setShowBilling(false)
      setPayWithCard(true)
    } else if (payWithCard) {
      setPaying(true)
      if (!stripe || !elements) {
        console.log("stripe js has not loaded!")
        return
      }
      const { firstname, lastname, email, address, zip, city, country, phone } =
        userInfo
      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city,
            country,
            line1: address,
            postal_code: zip
          },
          email,
          name: `${firstname} ${lastname}`,
          phone
        }
      })
      try {
        const {
          data: { id: stripeId, status }
        } = await userRequest.post("/checkout/payment/intents", {
          id: payload.paymentMethod?.id,
          amount: (totalPrice.current+38)-(totalPrice.current*0.05)
        })
        const cartProducts = products.map(
          ({ title, price, quantity, size, color }) => ({
            title,
            price,
            quantity,
            size,
            color
          })
        )
        const ordersProducts = products.map((product) => ({
          productId: product._id, 
          quantity: product.quantity,
          color: product.color,
          size: product.size
        }))
        if (status === "succeeded") {
          const { data } = await userRequest.post(
           
            `/orders/new/${currentUser._id}`,
            {
              userId: currentUser._id, 
              products: ordersProducts,
              amount: (totalPrice.current+38)-(totalPrice.current*0.05),
              stripeId,
              shippingPrice: shippingPrice <= 0 ? 0 : shippingPrice
            }
          )
          if (data) {
            
            ordersProducts.forEach(({ productId, quantity, color, size }) =>
              userRequest.put(
                `/products/${productId}?decreaseQuantity=${quantity}`,
                {
                  name: color,
                  size
                }
              )
            )
            history.push({
              pathname: "/Success",
              state: { ordersData: data, cartProducts }
            })
          }
        } else {
          setError(true)
        }
      } catch (err) {
        console.error(err)
        setError(true)
      }
      setPaying(false)
    }
    setLoading(false)
  }
  const handleReset = (e) => {
    setError(false)
    e.preventDefault()
    switch (true) {
      case showBilling:
        setChoosePM(true)
        setShowBilling(false)
        break
      case payWithPaypal:
        setChoosePM(true)
        setPayWithPaypal(false)
        break
      case payWithCard:
        setShowBilling(true)
        setPayWithCard(false)
        break

      default:
        setPayWithCard(false)
        history.push("/cart")
        break
    }
  }
  const leftBtnLabel = useRef(null)
  switch (true) {
    case payWithCard:
      leftBtnLabel.current = t("BACK")
      break
    case payWithPaypal || showBilling:
      leftBtnLabel.current = t("BACK")
      choosedPm.current = 0
      break
    default:
      leftBtnLabel.current = t("BACK")
      break
  }
  const rightBtnLabel = useRef(null)
  switch (true) {
    case choosePM || showBilling:
      rightBtnLabel.current = t("NEXT")
      break
    case payWithCard && paying:
      rightBtnLabel.current = t("checkout.loading")
      break
    case payWithCard:
      rightBtnLabel.current = `${t("CHECKOUT")} ${(totalPrice.current+38)-(totalPrice.current*0.05)}${t(
        "₱"
      )}`
      break
    default:
      rightBtnLabel.current = t("checkout.choosePm")
      break
  }
  const errorLabel = useRef(null)
  switch (true) {
    case payWithCard && error:
      errorLabel.current = t("PAYMENT DENIED")
      break
    case choosePM && error:
      errorLabel.current = t("PAYMENT ERROR")
      break
    default:
      break
  }
  console.log(errorLabel)
  const handleChoosePm = useCallback(
    (value) => {
      choosedPm.current = value
    },
    [choosedPm]
  )
  const handleLoad = useCallback((value) => {
    setLoading(value)
  }, [])
  const title = useRef(null)
  switch (true) {
    case payWithCard || payWithPaypal:
      title.current = t("CHECKOUT")
      break
    case choosePM:
      title.current = null
      break
    default:
      title.current = t("BILLING ADDRESS")
      break
  }

  return (
    <Container>

      {loading ? <Loader /> : null}
      <Title>{title.current}</Title>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        {showBilling ? <Billing onUserSubmit={setUserInfo} /> : null}
        {choosePM ? <PaymentMethod onChoosePm={handleChoosePm} /> : null}
        {payWithCard ? <StripeCheckout /> : null}
        {payWithPaypal ? (
          <PaypalCheckout amount={totalPrice.current} onLoading={handleLoad} />
        ) : null}
        <Error opacity={error ? 1 : 0}>{errorLabel.current}</Error>
        {loading ? null : (
          <ButtonContainer>
            <Button back type="Reset">
              {leftBtnLabel.current}
            </Button>
            {payWithPaypal ? null : (
              <Button type="submit" disabled={!stripe || paying}>
                {rightBtnLabel.current}
              </Button>
            )}
          </ButtonContainer>
        )}
      </Form>

    </Container>
  )
}

export default Checkout
