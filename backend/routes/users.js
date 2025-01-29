const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");

const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string(),
  password: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const newUser = req.body;
  const { success } = signupSchema.safeParse(newUser);

  if (!success) {
    return res
      .status(401)
      .json({ message: "Email already taken/ invalid Input" });
  }
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    return res
      .status(401)
      .json({ message: "Email already taken/ invalid Input" });
  }
  const newlyCreatedUser = await User.create(newUser);
  const userId = newlyCreatedUser._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  const account = Account.create({
    userId: userId,
    balance: Math.floor(Math.random() * 20000 + 1),
  });
  res.json({ message: "User created successfull", token: token });
});

router.post("/signin", async (req, res) => {
  console.log("hii");
  // console.log(req.body);
  const { username, password } = req.body;
  const { success } = signinSchema.safeParse({ username, password });
  if (!success) {
    return res
      .status(411)
      .json({ message: "Invalid Input/ Incorrect username or password" });
  }
  const user = await User.findOne({ username, password });
  // console.log(user);
  if (!user) {
    return res.status(411).json({ message: "Error while logging in" });
  }
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ message: "signin successfull", token: token });
});

router.put("/update", authMiddleware, async (req, res) => {
  const { firstName, lastName, password } = req.body;

  const { success } = updateSchema.safeParse({ firstName, lastName, password });
  if (!success) {
    return res
      .status(411)
      .json({ messsage: "Error while updating information" });
  }

  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    { firstName, lastName, password }
  );
  if (!user) {
    return res
      .status(400)
      .json({ message: "something went wrong while updating" });
  }
  res.json({ message: "Updated successfully" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });
  // console.log(user);
  const arr1 = users.filter((user) => {
    if (user._id.toString() !== req.userId) {
      return user;
    }
  });
  // console.log(arr1);
  res.json({
    user: arr1.map((user) => {
      if (user._id.toString() !== req.userId) {
        // console.log(user._id.toString());
        const u = {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        };
        return u;
      }
    }),
  });
});

module.exports = router;
