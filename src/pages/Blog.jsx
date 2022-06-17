import React from 'react'
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import { mobile } from '../responsive';
import blogcss from './blogcss.css'
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
const Image = styled.img`

`
const Wrapper = styled.div`
${mobile({padding: "10px 0px"})}
//background-image: url("https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80");
`

const Card = styled.div`
    height: 300px;
    width: 1000px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 2px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
`
const Column = styled.div`
padding: 20px;

`
const Container = styled.div`
    padding: 5% 5%;
`
const Button = styled.div`
    cursor: pointer;
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: #CED9BF;
    background-color: #59302d;
    text-align: center;
    width: 100%;
    &:hover {
        background-color: #878f7c;
  }
`
const Blog = () => {

  return (
 
    <div>
       <Navbar/>
       <Info>
  <h1 class="Name">BLOG</h1>
  <p>Enjoy the latest blogs about the field of leather shoes products.</p>
  <p>We aim to provide you informative, legitimate, reliable and latest news.</p>
</Info>
       <Wrapper>
       <Column>
    <Card>
    <Image src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1653304756/before-after-restored-shoe-2_gjg9tm.jpg" 
    />
    <Container>
        <h2 class="Name">This Teen Started His Shoe Restoration Business With Only P300</h2>
        <p class="title">written by Angela Baylon</p>
        <p class="desc">This 18-year-old is helping his single mom one old leather shoe at a time. </p>
        <p class="desc">March 9, 2022 | 10 Min Read</p>
        <form action="https://www.smartparenting.com.ph/life/inspiration/shoe-per-nakakabilib-single-mom-proud-of-teen-son-who-makes-money-restoring-old-leather-shoes-a00377-20220309-lfrm" target="_blank">
        <p><button class="button">READ MORE</button></p>
        </form>
    </Container>
      </Card>
</Column>
<Column>

    <Card>
    <Image src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1653301049/ress-1_gennax.jpg"
    />
      <Container>
        <h2 class="Name">Different Types of Men’s Dress Shoes</h2>
        <p class="title">written by Jacob Sigala</p>
        <p class="desc">Having a superb pair of dress shoes is not a luxury; it’s a necessity. Even sneaker and hoodie guys will occasionally need to suit-up, and opportunity favors the prepared.</p>
        <p class="desc">February 28, 2022 | 10 Min Read</p>
        <form action="https://www.ties.com/blog/mens-dress-shoe-guide" target="_blank">
        <p><button class="button" >READ MORE</button></p>
        </form>
        </Container>
      </Card>
    </Column>

 <Column>
    <Card>
    <Image src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1653301048/Marikina-Cityhood-Park_ckems1.jpg" 
    />
    <Container>
        <h2 class="Name">A Look at the Glory Days of Marikina</h2>
        <p class="title">written by Jove Moya</p>
        <p class="desc">A person's choice of footwear is usually a good barometer of his or her life preferences. In Marikina, there is a wide array of shoe designs fit for various personalities</p>
        <p class="desc">October 15, 2021 | 10 Min Read</p>
        <form action="https://www.tatlerasia.com/power-purpose/ideas-education/marikina-philippine-shoe-capital" target="_blank">
        <p><button class="button" >READ MORE</button></p>
        </form>
    </Container>
      </Card>
</Column>


</Wrapper>
<Footer/>
    </div>
  )
}

export default Blog;