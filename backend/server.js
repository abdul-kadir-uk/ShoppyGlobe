// server.js
import express from 'express';
import db_connect from './config/connection.js';
import { config } from 'dotenv';
import cors from 'cors'
import cart_routes from './routes/cart.routes.js'
import product_routes from './routes/product.routes.js'
import register_routes from './routes/register.routes.js'
import login_routes from './routes/login.routes.js'
import { authmiddelware } from './controller/auth.controller.js';
import user_routes from './routes/user.routes.js'

// initialize the express app 
const app = express();
// load the environment variables for .env files 
config();

const port = process.env.port || 1000;

app.use(express.json());
// allow server to request to different ports 
app.use(cors());

// connect to mongodb 
db_connect();

// start the server 
app.listen(port, () => {
  console.log(`app is running on the port ${port}`);
})

// route for products requests 
app.use('/products', product_routes);
// route for cart requests 
app.use('/cart', authmiddelware, cart_routes);
// route for the register request  
app.use('/register', register_routes);
// route for the login request 
app.use('/login', login_routes)
// route for userdetails requests 
app.use('/userdetails', authmiddelware, user_routes);