import React from 'react'
import styled from 'styled-components';
import Categories from "../components/Categories";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Products from '../components/Products';
import Slider from '../components/Slider'
import { mobile } from '../responsive';
import aboutcss from './aboutcss.css'

const Image = styled.img``
const Wrapper = styled.div`
${mobile({padding: "10px 0px"})}
//background-image: url("https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80");
`
const Info = styled.div`
  padding: 100px;
    text-align: center;
    background-image: url("https://res.cloudinary.com/dgb2lnz2i/image/upload/v1650369362/ty-feague-87V27nw0sS0-unsplash_v8mq0v.jpg");
    background-position-y: 45%;
    background-repeat: no-repeat;
    background-size: 2000px;
    color: #59302d;
    ${mobile({padding: "5px 0px"})}
    `
const Card = styled.div`
position: relative;
    left: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 8px;
`


const About = () => {

  return (
    <div>
        <Navbar/>
            
        <Info>
  <h1 class="Name">ABOUT UNILEATHER TEAM</h1>
  <p>Welcome to Unileather, your number one source for Leather Shoes. We're dedicated to providing you the very best of Footwear when it comes to Leathers finish, with an emphasis on convenience, easy to use, and secured transactions.</p>
  <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
</Info>

<Wrapper>
<div class="row">
  <div class="column">
    <div class="card">
    <Image src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1650370092/181994326_508690513645793_8721388187433130881_n_1_ac58ka.jpg"   width="100%"
    />
      <div class="container">
        <h2 class="Name">Paolo Miguel C. Morato</h2>
        <p class="title">Developer</p>
        <p class="desc">Hi! I'm Paolo, one of the developers for this project. If you have any questions or concerns, feel free to contact us!</p>
        <p class="desc">pmorato187@gmail.com</p>
        <form action="https://mail.google.com/mail/u/0/?#inbox?compose=CllgCJTNHzTSHFHlfDfHvSGqPKWGbmmDLwsNrXBRWDsrtSDzjQPCMgWFdnrTKvDTtFNlXtgDDXV" target="_blank">
        <p><button class="button">Contact</button></p>
        </form>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
    <Image src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1650439752/278051315_523121645882771_725446952752107284_n_pr2byb.jpg"   width="100%"
    />
      <div class="container">
        <h2 class="Name">Christian John C. Parocha</h2>
        <p class="title">Developer</p>
        <p class="desc">Hi! I'm Christian John, one of the developers for this project. If you have any questions or concerns, feel free to contact us! </p>
        <p class="desc">cjparocha18@gmail.com</p>
        <form action="https://mail.google.com/mail/u/0/?#inbox?compose=GTvVlcSMScXnbNNmXJqlHlNSGRFmsCzpFKktGlGnPqHCmKrdhfbRMcvxWqFtCDpzBvpXZpprzlwxJ" target="_blank">
        <p><button class="button" >Contact</button></p>
        </form>
      </div>
    </div>
  </div>
</div>
</Wrapper>
        <Footer/>
    </div>
  )
}

export default About;