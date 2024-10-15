import bcrypt from 'bcryptjs'
import User from './../model/user.model.js'
import jwt from 'jsonwebtoken'

// function for register the user
export async function getregister(req, res) {
  try {
    // get the user details 
    const { name, mobile_number, address, email, password } = req.body;
    // if user already exist 
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        message: "user already exist"
      });
    }
    const salt = await bcrypt.genSalt(10);
    // hash the password with generated salt
    const hashedpassword = await bcrypt.hash(password, salt);

    // create a new user 
    const newuser = new User({
      name: name,
      mobile_number: mobile_number,
      address: address,
      email: email,
      password: hashedpassword
    })
    // save the user to mongodb 
    await newuser.save();

    res.status(201).json({
      message: "user created successfully"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// function for user loging by verifying the user dtails
export async function getlogin(req, res) {
  try {
    // get email and password from the user 
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if email not exist 
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }
    // compare the password with the hash password 
    const ismatch = await bcrypt.compare(password, user.password);
    // if dont match 
    if (!ismatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }
    // generate the token for the user by passing userid, secretkey and expiration time
    const token = jwt.sign({ userId: user._id }, process.env.secretkey, { expiresIn: "1h" });
    res.status(200).json({ token });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// middleware to verify the user 
export async function authmiddelware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    // if authorization missing or not start with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or token is invalid" });
    }

    // take the token 
    const jwttoken = authHeader.split(" ")[1];
    // secret from .env
    const secretKey = process.env.secretkey;

    // if secretkey missing 
    if (!secretKey) {
      throw new Error('JWT secret key not defined in environment variables');
    }

    // verify the token and secret key 
    const decoded = jwt.verify(jwttoken, secretKey);
    // get the user id 
    req.user = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: " + error.message });
  }
}

