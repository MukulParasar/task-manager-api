const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(email, password) VALUES($1,$2) RETURNING id, email",
      [email, hashed]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    const user = result.rows[0];

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

// Profile
exports.profile = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, email FROM users WHERE id=$1",
      [req.user.userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};