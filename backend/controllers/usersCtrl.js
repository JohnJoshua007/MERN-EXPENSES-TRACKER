const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
//! user registration

const usersController = {
  //!register
  register: async (req, res) => {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      throw new Error("Please All fields are required");
    }
    //!check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    //! hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user and save to db
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //!send the response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  },
  //!Login
  login: async (req, res) => {
    //!get the user data
    const { email, password } = req.body;
    //!if email is correct
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    console.log("Pass", password, "user", user.password);
    //!compare the user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    //!generate token
    const token = jwt.sign({ id: user._id }, "John Joshua.P", {
      expiresIn: "30d",
    });

    //!send the response
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  },

  //!profile
  profile: asyncHandler(async (req, res) => {
    //!find the user
    console.log(req.user);
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //!send the response
    res.json({
      username: user.username,
      email: user.email,
    });
  }),
  //change password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //!find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //! hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    //!ReSave
    await user.save({
      validateBeforeSave: false,
    });
    //!send the response
    res.json({
      message: "Password changed successfully",
    });
    //     //! update user profile
    //   updateUserProfile: asyncHandler(async (req, res) => {
    //     const { email, username } = req.body;
    //     const updatedUser = await User.findByIdAndUpdate(
    //       req.user,
    //       {
    //         username,
    //         email,
    //       },
    //       {
    //         new: true,
    //       }
    //     );
    //     res.json({ message: "User profile updated successfully", updatedUser });
    //   }),
    //   ),
    // };
  }),
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User profile updated successfully", updatedUser });
  }),
};

module.exports = usersController;
