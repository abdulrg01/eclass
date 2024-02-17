const sendMail = require("../config/sendMail");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const ejs = require("ejs");
const cloudinary = require("cloudinary");

//REGISTER A USER
const newUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are require" });
  }

  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate User" });
  }

  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      UserInfo: {
        name: name,
        email: email,
        password: password,
        role: "user",
        activationCode: activationCode,
      },
    },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "1d" }
  );

  const data = { saveUser: { name: name }, activationCode };

  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/activation.ejs"),
    data
  );

  await sendMail({
    email: email,
    subject: "Activate your account",
    template: "activation.ejs",
    data,
  });

  res.status(200).json({ 
    token, 
    message: `Please check your email to ${email} to activate your account!`
  });
};

const activateUser = async (req, res) => {
  const { token, activationCode } = req.body;
  if (!token || !activationCode) {
    return res
      .status(400)
      .json({ message: "Token and ActivationCode must be provided" });
  }

  jwt.verify(token, process.env.ACTIVATION_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden Site" });

    if (decoded.UserInfo.activationCode !== activationCode) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, email, password, role } = decoded.UserInfo;

    const duplicate = await User.findOne({ email }).exec();

    if (duplicate) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    if (user) {
      res.status(201).json({
        success: true,
      });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const matchPwd = await foundUser.matchPassword(password);

  if (!matchPwd)
    return res.status(400).json({ message: "enter correct password" });

  const token = jwt.sign(
    {
      UserInfo: {
        userId: foundUser._id,
        name: foundUser.name,
        role: foundUser.role
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: foundUser._id, name: foundUser.name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  const user = await User.findOne({ email }).select("-password").exec();

  res.json({
    user,
    token,
  });
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const user = await User.findOne({ name: decoded.name }).exec();

      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const token = jwt.sign(
        {
          UserInfo: {
            name: user.name,
            role: user.role,
            userId: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({
        success: true,
        user,
        token,
      });
    }
  );
};

const getUserInfo = async (req, res) => {
  const user = await User.findById(req.user).select("-password").lean();

  res.json({ user });
};

const socialAuth = async (req, res) => {
  const { name, email, avatar } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    const userInfo = await User.create({ email, name, avatar });

    const token = jwt.sign(
      {
        UserInfo: {
          userId: userInfo._id,
          name: userInfo.name,
          role: userInfo.role
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: userInfo._id, name: userInfo.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    const user = await User.findOne({ email }).select('-password').exec()

    res.json({
      success: true, 
      user,
      token,
    });
  } else {
    const userInfo = await User.findOne({ email }).exec();
    if (!userInfo) return res.status(401).json({ message: "No user found" });

    const token = jwt.sign(
      {
        UserInfo: {
          userId: userInfo._id,
          role: userInfo.role,
          name: userInfo.name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: userInfo._id, name: userInfo.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    const user = await User.findOne({ email }).select('-password').exec()

    res.json({
      success: true,
      user,
      token,
    });
  }
};

const updateUserinfo = async (req, res) => {
  const { name } = req.body;

  const userId = req.user;

  const user = await User.findById(userId).exec();

  if (!name || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate 
  const duplicate = await User.findOne({ name }).collation({ locale: 'en', strength: 2 }).lean().exec()

  // Allow updates to the original user 
  if (duplicate && duplicate?._id.toString() !== userId) {
      return res.status(409).json({ message: 'Duplicate username' })
  } 

  user.name = name;

  const updatedUser = await user.save();

  res.status(200).json({ updatedUser, message: `${updatedUser.name} updated` });
};

const updatePassword = async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId).exec();

  if (user?.password === undefined) {
    return res.status(400).json({ message: "Invalid User" });
  }

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const matchPwd = await user.matchPassword(oldPassword);

  if (!matchPwd)
    return res.status(400).json({ message: "enter correct password" });

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};

const updateProfilePicture = async (req, res) => {
  const userId = req.user;
  const { avatar } = req.body;

  const user = await User.findById(userId).exec();

  if (!user || !avatar)
    return res
      .status(400)
      .json({ message: "Invalid User and Please select the your picture" });

  const cloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
  });

  user.avatar = {
    publicId: cloud.public_id,
    url: cloud.secure_url,
  };

  await user.save();

  res.status(200).json({ success: true, user });
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "Cookie cleared" });
};

const all = async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("-password")
    .lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

//UPDATE-USER-ROLE
const updateUserRole = async(req, res) => {
  const { email, role } = req.body
  if (!email || !role) return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email }).exec()

  const userId = user._id
  if (!userId) return res.status(400).json({ message: "User ID is required" });


  const updateRole = await User.findByIdAndUpdate(userId, { role }, { new: true })
  if (!updateRole) return res.status(400).json({ message: "Invalid Credentials" });
  
  res.status(200).json({success: true, message: "New member Added Successfully"});
}

const deleteUser = async (req, res) => {
  const id = req.params.id

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  newUser,
  login,
  refresh,
  logout,
  socialAuth,
  updateUserinfo,
  getUserInfo,
  updatePassword,
  updateProfilePicture,
  all,
  updateUserRole,
  deleteUser,
  activateUser,
};
