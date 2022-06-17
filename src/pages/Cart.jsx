import { Add, Delete, DeleteOutlineOutlined, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next"
import { mobile, tablet } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import React, { Fragment, useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { deleteProduct, updateProduct } from "../redux/cartRedux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { reset } from "../redux/cartRedux";
import { Link } from "react-router-dom";




const KEY = process.env.REACT_APP_STRIPE;


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;
  color:#BF4124;
  
`;
const QuantityButton = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`

`


const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  color: #59302D;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  border-color: #59302D;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const ProductColorContainer = styled.div`
  display: flex;
`
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  color:#59302D;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ width: "90vw" })};
  ${mobile({ flexDirection: "column" })};
  position: relative;
  padding: 1px;
  margin: 10px 0;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
color:#59302D;`;

const ProductId = styled.span`
color:#59302D;`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

`;

const ProductSize = styled.span`
color:#59302D;

`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:#59302D;
`;
const StyledDelete = styled(DeleteOutlineOutlined)`
  position: absolute;
  cursor: pointer;
  right: 50px;
  top: 0;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color:#59302D;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  color:#59302D;
  ${mobile({ margin: "5px 15px" })}
`;


const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 400;
  color:#59302D;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  color:#59302D;
`;

const Summary = styled.div`
  position: relative;
  bottom: 60px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 2%;
  height: 50%;
  color:#59302D;
  ${mobile({position:"relative", bottom: 5})}
`;


const SummaryTitle = styled.h1`
  font-weight: 400;
  color:#BF4124;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
  color:#59302D;
`;

const SummaryItemText = styled.span`
color:#59302D;`;

const SummaryItemPrice = styled.span`
color:#59302D;`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #59302D;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  border: none;
`;
const PaypalBtn = styled.span`
 width: 100%;
 position: relative;
 bottom: -2%;
`;

const Cart = () => {
  // This values are the props in the UI
const amount = "2";
const currency = "PHP";
const style = {"layout":"vertical"};
// Custom component to wrap the PayPalButtons and handle currency changes
const createOrder = async (data) => {
  try {
    const res = await axios.post("/order", data);
  } catch (err) {
    console.log(err);
  }
};

const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
      dispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: currency,
          },
      });
  }, [currency, showSpinner]);


  return (<>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                  return actions.order
                      .create({
                          purchase_units: [
                              {
                                  amount: {
                                      currency_code: currency,
                                      value: (total+38)-(total*0.05),
                                  },
                              },
                          ],
                      })
                      .then((orderId) => {
                          // Your code here after create the order
                          return orderId;
                      });
              }}
              onApprove={function (data, actions) {
                  return actions.order.capture().then(function (details) {
                    const shipping = details.purchase_units[0].shipping;
                    createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: total,
                method: 1,
              });
                  });
              }}
          />
      </>
  );
}
  const {
    cart: { products, total },
    user: { currentUser }
  } = useSelector((state) => state)
  const [stripeToken, setStripeToken] = useState(null)
  const { t } = useTranslation()
  const onToken = (token) => setStripeToken(token)
  const history = useHistory()
  const dispatch = useDispatch()
  console.log(products)
  useEffect(() => {
    const makeRequest = async () => {
      
      try {
        const { data: stripeData, status } = await userRequest.post(
          "/checkout/payment/",
          {
            tokenId: stripeToken.id,
            amount: total * 100
          }
        )
        if (status === 200) {
          const ordersProducts = products.map(({ _id: productId, quantity }) => ({
            productId,
            quantity: quantity
          }))
          
          const cartProducts = products.map(({ title, price, quantity }) => ({
            title,
            price,
            quantity
          }))
          const { _id: id } = currentUser
          const ORDERSDATA = {
            userId: id,
            products: ordersProducts,
            amount: total,
            address: stripeData.billing_details.address
          }
          const { data: ordersData } = await userRequest.post(
            `/orders/new/${currentUser._id}`,
            ORDERSDATA
          )
          history.push({
            pathname: "/orderSuccess",
            state: { stripeData, ordersData, cartProducts }
          })
        }
      } catch (error) {
        console.error("error while posting", error)
      }
    }
    if (stripeToken && total) makeRequest()
  }, [stripeToken, total, history, currentUser, products])
  const handleDelete = (data) => {
    dispatch(deleteProduct(data))
  }
  const isDisconnected = Object.keys(currentUser).length === 0
  const [shippingPrice, setShippingPrice] = useState(0)
  const [modal, setModal] = useState(false)
  const handlePay = () => {
    history.push({ pathname: "/pay", state: { shippingPrice } })
  }

  
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>SHOPPING CART</Title>
        <Top>
        </Top>
        <Bottom>
        <Hr/>
          <Info>
          {products?.map((product) => {
                  const {
                    img,
                    title,
                    _id: id,
                    color,
                    size,
                    quantity,
                    price
                  } = product
                  return (
                    <Fragment key={id + size + color}>
                      <Product>
                        <StyledDelete
                        style={{color:"red"}}
                          onClick={() =>
                            handleDelete({
                              id,
                              totalPrice: price * quantity,
                              size,
                              color
                            })
                          }
                        />
                        <ProductDetail>
                          <Image src={img} alt={title} />
                          <Details>
                            <ProductName>
                              <b>{t("Title")}: </b>
                              {title}
                            </ProductName>
                            <ProductId>
                              <b>{t("ID")}: </b>
                              {id}
                            </ProductId>
                            <ProductColorContainer>
                              <b>{t("Color")}: </b>
                              <ProductColor color={color} />
                            </ProductColorContainer>
                              <ProductSize>
                                <b>{t("Size")}: {product.size}</b>
                              </ProductSize>
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductAmountContainer>
                            <QuantityButton
                              component={<Add />}
                              onClick={() => {
                                dispatch(
                                  updateProduct({
                                    id,
                                    quantity: 1,
                                    price,
                                    size,
                                    color
                                  })
                                )
                              }}
                            />
                            <ProductAmount>{quantity}</ProductAmount>
                            <QuantityButton
                              component={<Remove />}
                              onClick={() => {
                                if (quantity > 1)
                                  dispatch(
                                    updateProduct({
                                      id,
                                      quantity: -1,
                                      price,
                                      size,
                                      color
                                    })
                                  )
                              }}
                            />
                          </ProductAmountContainer>
                          <ProductPrice>
                          {t("₱")}
                            {price * quantity}
                          </ProductPrice>
                        </PriceDetail>
                      </Product>
                    </Fragment>
                  )
                })}
          </Info> 
          <Summary>
                <SummaryTitle>{t("ORDER SUMMARY")}</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>
                    {t("SUBTOTAL")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                  ₱{total}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>
                    {t("Shipping fee")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                  ₱38
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>
                    {t("Discount")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                  -5%
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>
                    {t("Total")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                  ₱{(total+38)-(total*0.05)}
                  </SummaryItemPrice>
                </SummaryItem>
                    <Button  onClick={handlePay}>{t("CHECKOUT")}</Button>
              </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;