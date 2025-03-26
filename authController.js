const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Send registration email (optional)
    try {
      await sendRegistrationEmail(email, name, role, email, password);
    } catch (emailError) {
      console.error("Error sending registration email:", emailError.message);
    }

    res.status(201).json({
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ token, profile: userWithoutPassword });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Status (Optional if you have a status field in the future)
// Currently, your schema does not have `status`, so you can skip this or add status in the model
exports.updateUserStatus = async (req, res) => {
  return res.status(400).json({ message: "Status update feature not available with current schema" });
};
