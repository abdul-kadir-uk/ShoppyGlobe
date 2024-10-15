import User from './../model/user.model.js'

// function to get the user details 
export async function UserDetails(req, res) {
  try {
    // find the user by its id 
    const details = await User.findById(req.user);
    // if user not found 
    if (!details) {
      return res.status(404).json({
        message: "user not found"
      })
    }
    res.status(200).json({ details });
  } catch (error) {
    res.status(400).json("error while getting data");
    console.log(error);
  }
}

// function for update the user details 
export async function updateUserDetails(req, res) {
  try {
    // get the user id from token 
    const userId = req.user;
    // get the name , mobile number and address from the user 
    const { name, mobile_number, address } = req.body;

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, mobile_number, address },
      { new: true, runValidators: true }
    );

    // if user not found 
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    //  if user successfully updated 
    res.status(200).json({ message: "User details updated", updatedUser });
  } catch (error) {
    // bad request for incorrect data 
    res.status(400).json({ message: "Error while updating data" });
    console.error(error);
  }
}