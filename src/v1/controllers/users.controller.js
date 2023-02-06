const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const { timeExRefreshTokenCookie } = require("../utils/time");
const { users } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

const that = {
  findNotLogin: async function (req, res) {
    try {
      const { userId } = req.params;
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Wrong id user" });
      }
      const user = await users.findById(userId);
      return res.status(200).json({ user, type: "notlogin" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  },
  findUser: async function (req, res) {
    try {
      const { userId } = req.params;
      const id = req.id;
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Wrong id user" });
      }
      const user = await users.findById(userId);
      if (!user) {
        return res.status(400).json({ user: {}, type: "notfound" });
      }
      if (userId === id) {
        return res.status(200).json({ user, type: "yourself" });
      }
      return res.status(200).json({ user, type: "other" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  },
  register: async function (req, res) {
    try {
      const user = req.user;
      const newUser = new users({ ...user });
      await newUser.save();
      return res.status(200).json({ message: "Tạo tài khoản thành công" });
    } catch (error) {
      return res.status(500).json({ message: "error at server" });
    }
  },
  login: async function (req, res) {
    try {
      const user = req.user;
      const id = req.id;
      const accessToken = await generateAccessToken(id);
      const refreshToken = await generateRefreshToken(id);

      await users.findByIdAndUpdate(id, { refreshToken });
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: false,
          expires: timeExRefreshTokenCookie(),
          secure: true,
          sameSite: "none",
        })
        .json({ accessToken, user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  reLogin: async function (req, res) {
    try {
      const id = req.id;
      const user = req.user;
      const accessToken = await generateAccessToken(id);
      const refreshToken = await generateRefreshToken(id);

      await users.findByIdAndUpdate(id, { refreshToken: refreshToken });
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          expires: timeExRefreshTokenCookie(),
          httpOnly: false,
          sameSite: "none",
          secure: true,
        })
        .json({ accessToken, user });
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  },

  getNewAccessToken: async function (req, res) {
    try {
      const id = req.id;
      const accessToken = await generateAccessToken(id);

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  },

  logout: async function (req, res) {
    try {
      const id = req.id;
      await users.findByIdAndUpdate(id, { refreshToken: "" });
      return res
        .status(200)
        .clearCookie("refreshToken")
        .json({ message: "logout thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  },
};

module.exports = that;
