const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        userType: { // Adding the userType field
            type: String,
            enum: ['athlete', 'coach'], // Restrict the value to these two options
            required: true,
        }
    }
    ,{timestamps: true}
)

const User = mongoose.model("User", userSchema);
module.exports = User