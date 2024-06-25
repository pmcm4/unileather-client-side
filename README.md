# UniLeather

## Overview
UniLeather is a web application developed using the MERN stack (MongoDB, Express.js, React, Node.js). The application integrates Stripe and PayPal payment systems to provide a seamless shopping experience for users.

## Features
- **User Registration and Authentication:** Secure user registration and login functionality.
- **Product Catalog:** Browse and search for products.
- **Shopping Cart:** Add and manage products in the shopping cart.
- **Payment Integration:** Complete purchases using Stripe or PayPal.
- **Order Tracking:** Track the status of orders.
- **Admin Dashboard:** Manage products, orders, and user data.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Systems:** Stripe, PayPal
- **Deployment:**
  - **Backend and Database:** Formerly deployed on Heroku (discontinued)
  - **Frontend:** Deployed on Netlify

## Demo
https://unileather.netlify.app/


## Installation and Setup
To run this project locally, follow these steps:

### Prerequisites
- Node.js
- MongoDB

### Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/pmcm4/unileather-client-side.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd unileather-client-side
    ```
3. **Install the dependencies:**
    ```bash
    npm install
    ```
4. **Set up the environment variables:**
    - Create a `.env` file in the root directory.
    - Configure your environment variables in the `.env` file. Use the provided `.env.example` as a template.
    ```plaintext
    MONGO_URI=your_mongodb_uri
    STRIPE_SECRET_KEY=your_stripe_secret_key
    PAYPAL_CLIENT_ID=your_paypal_client_id
    ```

5. **Start the development server:**
    ```bash
    npm start
    ```
