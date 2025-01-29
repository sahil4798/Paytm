const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware");
const router = express.Router();

const { Account } = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  if (!account) {
    return res.status(401).json({ messsage: "unable to fetch balance" });
  }

  res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  //Intialize
  session.startTransaction();

  const { to, amount } = req.body;
  const from = req.userId;

  const fromUser = await Account.findOne({ userId: from });
  // console.log(fromUser);
  if (fromUser.balance < amount) {
    return res.status(400).json({ message: "Incuffucient balance" });
  }
  const toUser = await Account.findOne({ userId: to });

  if (!toUser) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const o1 = await Account.updateOne(
    { userId: from },
    { $inc: { balance: -amount } }
  );

  const o2 = await Account.updateOne(
    { userId: to },
    {
      $inc: { balance: +amount },
    }
  );

  //commit the transaction
  await session.commitTransaction();

  res.json({ message: "Transfer Successful" });
});
module.exports = router;
