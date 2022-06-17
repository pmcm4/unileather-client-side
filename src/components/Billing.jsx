import { getCountries } from "../components/utils"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { mobile, smallMobile } from "../responsive"
import styled from "styled-components"
import PropTypes from "prop-types"

const Container = styled.div`
  max-width: 95vw;
  width: 100%;
  height: 100%;
  background-color: #CED9BF;
  border-radius: 5px;
  padding: 1.25rem;
  ${mobile({ maxWidth: "calc(95vw - 40px)" })}
`
const FormItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column" })}
`
const ItemRow = styled.div`
  flex: 1;
  max-width: 50%;
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  ${mobile({ maxWidth: "initial" })}
  ${smallMobile({ margin: 0 })}
`
const Label = styled.label`
  color: #59302D;
  letter-spacing: 0.025em;
`
const Input = styled.input`
  width: calc(100% - 28px);
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
    color: #aab7c4;
  }
  &:focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    transition: all 150ms ease;
  }
  ${mobile({ maxWidth: 300 })}
`
const Select = styled.select`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  max-width: 500px;
  padding: 10px 14px;
  -webkit-appearance: none;
  border-radius: 4px;
  font-size: 1em;
  ${mobile({ maxWidth: 328 })}
`
const Option = styled.option``
function Billing({ onUserSubmit }) {
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    phone: ""
  })
  const { currentUser } = useSelector((state) => state.user)
  const handleUpdate = (ev) => {
    ev.preventDefault()
    const { name, value } = ev.target
    setInfo({ ...info, [name]: value })
  }
  useEffect(() => {
    const {
      _id,
      isAdmin,
      accesToken,
      createdAt,
      updatedAt,
      __v,
      postalBox: zip,
      ...billing
    } = currentUser
    setInfo({ ...billing, zip })
  }, [currentUser])
  useEffect(() => {
    onUserSubmit(info)
  }, [info, onUserSubmit])

  const { firstname, lastname, email, address, zip, city, country, phone } =
    info
  const { t } = useTranslation()
  return (
    <Container>
      <FormItem>
        <ItemRow>
          <Label>{t("FIRST NAME")}</Label>
          <Input
            required
            placeholder={t("FIRST NAME").toUpperCase()}
            name="firstname"
            value={firstname}
            onChange={handleUpdate}
          />
        </ItemRow>
        <ItemRow>
          <Label>{t("LAST NAME")}</Label>
          <Input
            required
            onChange={handleUpdate}
            placeholder={t("LAST NAME").toUpperCase()}
            name="lastname"
            value={lastname}
          />
        </ItemRow>
      </FormItem>
      <FormItem>
        <ItemRow>
          <Label>{t("EMAIL")}</Label>
          <Input
            required
            placeholder={t("EMAIL").toUpperCase()}
            name="email"
            value={email}
            onChange={handleUpdate}
          />
        </ItemRow>
        <ItemRow>
          <Label>{t("ADDRESS")}</Label>
          <Input
            required
            placeholder={t("STREET ADDRESS").toUpperCase()}
            name="address"
            value={address}
            onChange={handleUpdate}
          />
        </ItemRow>
      </FormItem>
      <FormItem>
        <ItemRow>
          <Label>{t("ZIP CODE")}</Label>
          <Input
            required
            placeholder={t("ZIP CODE").toUpperCase()}
            name="zip"
            value={zip}
            onChange={handleUpdate}
          />
        </ItemRow>
        <ItemRow>
          <Label>{t("CITY")}</Label>
          <Input
            required
            placeholder={t("CITY").toUpperCase()}
            name="city"
            value={city}
            onChange={handleUpdate}
          />
        </ItemRow>
      </FormItem>
      <FormItem>
        <ItemRow>
          <Label>{t("COUNTRY")}</Label>
          <Select name="country" value={country} onChange={handleUpdate}>
            {getCountries({ code: "", country: "" })?.map(
              ({ country: ctry, code }) => (
                <Option key={code} value={code}>
                  {ctry}
                </Option>
              )
            )}
          </Select>
        </ItemRow>
        <ItemRow>
          <Label>{t("PHONE")}</Label>
          <Input
            required
            placeholder={t("PHONE").toUpperCase()}
            name="phone"
            value={phone}
            onChange={handleUpdate}
          />
        </ItemRow>
      </FormItem>
    </Container>
  )
}

Billing.propTypes = {
  onUserSubmit: PropTypes.func.isRequired
}

export default Billing
