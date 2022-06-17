import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import { mobile } from "../responsive";
  
  const Container = styled.div`
    display: flex;
    position: sticky;
    background-color: #CED9BF;
    ${mobile({ flexDirection: "column" })}
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.img``;
  
  const Desc = styled.p`
    margin: 20px 0px;
    color: #59302D;
  `;
  
  const SocialContainer = styled.div`
    margin-bottom: 20px;
    align-items: center;
    color: #59302D;
  `;
  
  const SocialIcon = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    align-items: center;
    background-color: #${(props) => props.color};
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
    color: #BF4124;
  `;
  

  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#CED9BF" })}
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    color: #59302D;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
        <Logo src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1653278160/278519841_663397854931466_1165153124016215155_n_1_v0ehw1.png"   width="250" height="100
    "/>
          <Desc>
          Founded in 2022 by P&C @ PUP Co. Ltd., UNILEATHER has come a long way from its beginnings in Manila. 
          When P&C first started out, their passion for a reliable and convenient marketplace for leather shoes 
          drove them to start their E-Commerce Company.
          </Desc>

        </Left>
        <Center>
          <Title>Social Media Links</Title>
          <SocialContainer> 
          <SocialIcon >
            <Facebook style={{marginRight:"10px",color:"#59302D"}}/> facebook.com/unileather
          </SocialIcon>
          <SocialIcon >
            <Instagram style={{marginRight:"10px",color:"#59302D"}}/> instagram.com/unileather.footwear
          </SocialIcon>
          <SocialIcon >
            <Twitter style={{marginRight:"10px",color:"#59302D"}} /> twitter.com/unileather.footwear
          </SocialIcon>
          <SocialIcon >
            <Pinterest  style={{marginRight:"10px",color:"#59302D"}} /> pinterest.com/unileather
          </SocialIcon>
          </SocialContainer>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 1016 Anonas, Sta. Mesa, Maynila, Kalakhang Maynila
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/>  02-8123-4567
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> unileather@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;