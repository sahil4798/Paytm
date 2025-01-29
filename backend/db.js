const dotenv = require("dotenv"); // For Node.js projects
dotenv.config();
const MONGODB_URL = process.env.MONGODBURL;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to mongodb");
  })
  .catch(() => {
    console.log("Failed to connected to mongodb");
  });

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

const AccountSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", AccountSchema);

// const acount = new Acounts({
//   balance: 500.8,
//   userId: "666d6832870f80d9163cf30b",
// });

// acount.save();

// const user1 = new User({
//   firstName: "jack",
//   lastName: "billa",
//   username: "jack@gmail.com",
//   password: "duniyakapapa",
// });

// user1.save();

module.exports = { User, Account };
