const userModel = require('../../model/user');
const jwt = require('jsonwebtoken');

// singUp
const createUser = async (req, res, next) => {
  try {
    const salt = await userModel.generateSalt();
    req.body.password = await userModel.hashPassword(req.body.password, salt);
    req.body.salt = salt;
    console.log('req.body', req.body);

    await userModel.create(req.body);
    return res.json({
      success: true,
      message: 'created successfully',
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const data = await userModel.find();
    res.json({
      data: data,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    // console.log(user);
    if (!user) {
      return res.json({ message: 'invalid username/password' });
    }
    // console.log(password, user.password, user.salt);
    if (!(await userModel.verifyPassword(password, user.password, user.salt))) {
      return res.json({
        message: 'invalid username/passwords',
      });
    }
    const accessTocken = await userModel.generateAuthTocken(user);
    const refreshTocken = await userModel.generateAuthTocken(user);
    user.accessToken = accessTocken;
    const newLogin = new userModel(user);
    let newData = await newLogin.save();
    return res.json({
      success: true,
      message: 'logedIn',
      data: {
        newData,
        accessTocken,
        refreshTocken,
      },
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: e,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ message: 'Email not registered' });

    // Generate a token with 5 minute validity
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1m',
    });

    let resetLink = `http://localhost:3000/auth/reset-password/${token}`;
    res.send(resetLink);
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await userModel.findById(decoded.id);
    if (!user) {
      return res.json({ message: 'User not exist' });
    }

    // Update the password
    user.password = await userModel.hashPassword(password, user.salt);
    // user.accessToken = token;
    const newData = new userModel(user);
    newData.save();
    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    return res.json({ error: 'Invalid or expired token' });
  }
};

module.exports = {
  getUser,
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
