// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const { 
    updateUserProfile, 
    getUserProfile, 
    getAllUsers, 
    deleteUserProfile, 

    getUserBatches,

} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");



// ==================== User Management Routes ==================== //

// Update a user profile by ID (Admin only)
router.put("/profile/:userId", auth(["admin"]), updateUserProfile);  

// Get user profile by ID (Admin or Teacher only)
router.get("/profile/:userId", auth(["admin", "teacher"]), getUserProfile);  

router.get("/batches/:userId", auth(["admin", "teacher"]), getUserBatches);

// Get all user profiles or filter by role if provided (Admin only)
router.get("/profiles/:role", auth(["admin"]), getAllUsers);  

// Delete a user profile by ID (Admin only)
router.delete("/profile/:userId", auth(["admin"]), deleteUserProfile);


module.exports = router;    