const { decodeAccessToken, decodeRefreshToken } = require("../utils/token");
const { checkGmail, checkNumberPhone } = require("../utils/check");
const { hashPassword, comparePassword } = require("../utils/password");
const { users } = require("../models");

const that = {
  verifyAccessToken: async function (req, res, next) {
    try {
      const header = req.header("Authorization");
      const accessToken = header && header.split(" ")[1];
      if (!accessToken) {
        return res.status(401).json({ message: "Không có quyền truy cập" });
      }
      const { id } = decodeAccessToken(accessToken);
      req.id = id;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  },
  verifyRefreshToken: async function (req, res, next) {
    try {
      const cookie = req.cookies;
      const refreshToken = cookie.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Không có quyền truy cập" });
      }

      const { id } = decodeRefreshToken(refreshToken);

      if (!id) {
        return res.status(400).json({ message: "Miss id" });
      }

      const user = await users.findById(id);

      if (!user) {
        return res.status(400).json({ message: "Không tìm thấy tài khoản" });
      }
      const { refreshToken: oldRefreshToken } = user;
      const isMatchRefreshToken = oldRefreshToken === refreshToken;

      if (!isMatchRefreshToken) {
        return res.status(400).json({ message: "Refresh token không hợp lệ" });
      }
      
      req.id = id;
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  },
  validateRegister: async function (req, res, next) {
    try {
      const {
        firstName,
        surnName,
        account,
        password,
        date,
        month,
        year,
        gender,
        pronounce,
      } = req.body;
      if (
        !account ||
        !firstName ||
        !surnName ||
        !password ||
        !date ||
        !month ||
        !year ||
        !gender ||
        (gender === 2 && !pronounce)
      ) {
        return res.status(400).json({ message: "Vui lòng điền đủ các trường" });
      }
      const isValidGender =
        gender !== "female" || gender !== "male" || gender !== "custom";
      if (!isValidGender) {
        return res.status(400).json({ message: "Sai form" });
      }
      const isNumberPhone = checkNumberPhone(account);
      const isGmail = checkGmail(account);
      if (!isNumberPhone && !isGmail) {
        return res.status(400).json({ message: "Tài khoản không hợp lệ" });
      }
      let isExistAccount = false;
      if (isGmail) {
        isExistAccount = await users.findOne({ gmail: account });
      } else {
        isExistAccount = await users.findOne({ numberPhone: account });
      }
      if (isExistAccount) {
        return res
          .status(400)
          .json({ message: "Số điện thoại hoặc email đã được sử dụng" });
      }
      const hashPwd = await hashPassword(password);
      if (isGmail) {
        req.user = {
          firstName: firstName.trim(),
          surnName: surnName.trim(),
          gmail: account.trim(),
          password: hashPwd.trim(),
          date,
          month,
          year,
          gender,
          pronounce,
        };
        next();
      }
      if (isNumberPhone) {
        req.user = {
          firstName: firstName.trim(),
          surnName: surnName.trim(),
          numberPhone: account.trim(),
          password: hashPwd.trim(),
          date,
          month,
          year,
          gender,
          pronounce,
        };
        next();
      }
    } catch (error) {
      return res.status(500).json({ message: "error at server" });
    }
  },
  validateLogin: async function (req, res, next) {
    try {
      const { account, password } = req.body;
      const isGmail = checkGmail(account);
      const isNumberPhone = checkNumberPhone(account);
      if (!isGmail && !isNumberPhone) {
        return res.status(400).json({
          message: "Vui lòng đăng nhập bằng số điện thoại hoặc email",
        });
      }
      let isExistAccount = false;
      if (isGmail) {
        isExistAccount = await users.findOne({ gmail: account });
      } else {
        isExistAccount = await users.findOne({ numberPhone: account });
      }
      if (!isExistAccount) {
        return res.status(400).json({ message: "Tài khoản chưa đăng ký" });
      }
      const isMatchPassword = await comparePassword(
        password,
        isExistAccount.password
      );
      if (!isMatchPassword) {
        return res.status(400).json({ message: "Sai mật khẩu" });
      }
      const { id } = isExistAccount;
      req.id = id;
      req.user = isExistAccount;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  },
};

module.exports = that;
