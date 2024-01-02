const User = require("../model/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password, phone, gender, howDidYouHear, city, state } =
    req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const new_user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      howDidYouHear,
      city,
      state,
    });

    await new_user.save();
    console.log(new_user);
    const newToken = generateToken(new_user);
    res.cookie("authToken", newToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res
      .status(201)
      .json({ msg: "User registered successfully", new_user, newToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({
          message: "Incorrect email or password from backend login conroller",
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          message: "Incorrect email or password from backend login conroller",
        });
    }

    res.cookie("authToken", "", { expires: new Date(0), httpOnly: true });

    const token = await generateToken(user);
    res.cookie("authToken", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res
      .status(200)
      .json({
        message: "Login successful from backend login controller",
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error in login from backend login conroller",
        cause: error.message,
      });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("authToken")
    .status(200)
    .json({ message: "Logout successful" });
};

//add new user
const adduser = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }
    const token = cookie.split("=")[1];
    const secretKey = process.env.JWT_SEXRECT;

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    const userID = decoded.userId;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, name, phone } = req.body;

    user.Add_user.push({ name, email, phone });

    await user.save();

    res
      .status(201)
      .json({ message: "User added successfully", user: user.Add_user });
  } catch (error) {
    console.error("Error adding user to Add_user array:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getuser = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const token = cookie.split("=")[1];
    const secretKey = process.env.JWT_SEXRECT;

    const decoded = jwt.verify(token, secretKey);
    const userID = decoded.userId;

    // Fetch the user by ID
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({
        message: "Successfully retrieved data",
        user,
        Add_user: user.Add_user,
      });
  } catch (error) {
    console.error("Error getting user data:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteuser = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const token = cookie.split("=")[1];
    const secretKey = process.env.JWT_SEXRECT;

    const decoded = jwt.verify(token, secretKey);
    const userID = decoded.userId;

    const user = await User.findById(userID);
    const addUserId = req.params.addUserId;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.Add_user.findIndex(
      (addUser) => addUser._id.toString() === addUserId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Add_user not found" });
    }

    user.Add_user.splice(index, 1);

    await user.save();

    res
      .status(200)
      .json({ message: "Add_user deleted successfully", user: user.Add_user });
  } catch (error) {
    console.error("Error deleting Add_user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const edituser = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const token = cookie.split("=")[1];
    const secretKey = process.env.JWT_SEXRECT;

    const decoded = jwt.verify(token, secretKey);
    const userID = decoded.userId;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addUserId = req.params.addUserId;

    const index = user.Add_user.findIndex(
      (addUser) => addUser._id.toString() === addUserId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Add_user not found" });
    }

    const { name, email, phone } = req.body;

    user.Add_user[index].name = name || user.Add_user[index].name;
    user.Add_user[index].email = email || user.Add_user[index].email;
    user.Add_user[index].phone = phone || user.Add_user[index].phone;

    const updatedUser = await user.save();

    res
      .status(200)
      .json({
        message: "Add_user details updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Error updating Add_user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
  adduser,
  getuser,
  deleteuser,
  edituser,
};
