import notFoundMiddleware from "../middleware/not-found.js";
import User from "../models/User.js";

const register = async (req, res) => {
  const { email, name, age, batch, month } = req.body;
  if (!email || !name || !age || !batch || !month) {
    res.status(400).send("Empty Field");
    return;
  }
  const ExistingUser = await User.findOne({ email: email });
  if (ExistingUser) {
    if (
      new Date().getMonth() + 1 != ExistingUser.month &&
      (new Date().getMonth() + 2) % 12 != ExistingUser.month
    ) {
      await ExistingUser.remove();
      const user = await User.create({ email, name, age, batch, month });
      res.status(201).json({ user });
      return;
    }
    res.status(409).send("User already existed");
    return;
  }

  const user = await User.create({ email, name, age, batch, month });
  res.status(201).json({ user });
};

const details = async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  if (!email) {
    res.status(404).send("Please enter the email");
    return;
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).send("user not exist");
    return;
  }
  res.json(user);
};

export { register, details };
