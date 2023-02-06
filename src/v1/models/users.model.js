require("dotenv").config("");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const removeVietnameseTones = require("../utils/convertText");

const avatarUrl = process.env.AVATAR_URL;

const usersSchema = Schema({
  numberPhone: {
    type: String,
  },

  gmail: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  avatarUrl: {
    type: String,
    default: avatarUrl,
  },

  backgroundUrl: {
    type: String,
    default: "",
  },

  firstName: {
    type: String,
    required: true,
    default: "",
  },

  surnName: {
    type: String,
    required: true,
    default: "",
  },

  friendCount: {
    type: Number,
    default: 0,
  },
  friendList: [
    {
      id: { type: mongoose.SchemaTypes.ObjectId, require: true },
    },
  ],

  requestFriendCount: {
    type: Number,
    default: 0,
  },
  
  requestFriendList: [
    {
      id: { type: mongoose.SchemaTypes.ObjectId, require: true },
    },
  ],

  fullNameSearch: {
    type: String,
    required: true,
    default: function () {
      const fullName = `${this.firstName} ${this.surnName}`;
      return removeVietnameseTones(fullName).toLowerCase();
    },
  },

  fullName: {
    type: String,
    required: true,
    default: function () {
      return `${this.firstName} ${this.surnName}`;
    },
  },

  role: {
    type: ["user"],
    default: "user",
  },

  gender: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
  },

  pronounce: {
    type: String,
  },

  audienceGender: {
    type: String,
    enum: ["Only me", "Friends of friends", "Friends", "Public", "Custom"],
    default: "Friends of friends",
  },

  date: {
    type: Number,
    required: true,
  },

  month: {
    type: Number,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  audienceDateOfBirth: {
    type: String,
    enum: ["Only me", "Friends of friends", "Friends", "Public", "Custom"],
    default: "Friends of friends",
  },

  bio: {
    type: String,
    default: "",
  },

  refreshToken: {
    type: String,
  },
});

module.exports = model("users", usersSchema);
