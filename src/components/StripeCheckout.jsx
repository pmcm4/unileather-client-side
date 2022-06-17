import React, { cloneElement, useMemo } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from "@stripe/react-stripe-js"
import { mobile } from "../responsive"


const Container = styled.div`
  max-width: 95vw;
  width: 100%;
  height: 100%;
  background-color: #CED9BF;
  border-radius: 5px;
  padding: 1.25rem;
  ${mobile({ maxWidth: "calc(95vw - 40px)" })}
`

const Label = styled.label`
  color: #59302D;
  letter-spacing: 0.025em;
`
const StripeFormItem = styled.div`
  width: 100%;
`
const StripeInput = styled(({ component, ...props }) =>
  cloneElement(component, props)
)`
  display: block;
  margin: 10px 0 20px 0;
  max-width: 500px;
  padding: 10px 14px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.109804) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
  &::placeholder {
    color: red;
  }
  &:focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    transition: all 150ms ease;
  }
`

const StripeCheckout = () => {
  const { t } = useTranslation()
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: "#424770",
          letterSpacing: "0.025em",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  )
  return (
    <Container>
      <StripeFormItem>
        <Label>{t("CARD NUMBER")}</Label>
        <StripeInput component={<CardNumberElement options={options} />} />
      </StripeFormItem>
      <StripeFormItem>
        <Label>{t("EXPIRATION")}</Label>
        <StripeInput component={<CardExpiryElement options={options} />} />
      </StripeFormItem>
      <StripeFormItem>
        <Label>{t("CVC").toUpperCase()}</Label>
        <StripeInput component={<CardCvcElement options={options} />} />
      </StripeFormItem>
    </Container>
  )
}
export default StripeCheckout
