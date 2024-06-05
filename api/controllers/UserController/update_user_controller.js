const User = require('../../models/userSchema');
const bcrypt = require("bcryptjs");

// Custom validation functions
function validateName(name) {
    if (typeof name !== 'string' || name.length < 3 || name.length > 30) {
        return 'Name must be a string between 3 and 30 characters.';
    }
    return null;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email format.';
    }
    return null;
}

function validatePassword(password) {
    if (typeof password !== 'string' || password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null;
}

// Validate user data
function validateUser(user) {
    const errors = [];

    if (user.name !== undefined) {
        const nameError = validateName(user.name);
        if (nameError) {
            errors.push(nameError);
        }
    }

    if (user.email !== undefined) {
        const emailError = validateEmail(user.email);
        if (emailError) {
            errors.push(emailError);
        }
    }

    if (user.password !== undefined) {
        const passwordError = validatePassword(user.password);
        if (passwordError) {
            errors.push(passwordError);
        }
    }

    return errors.length > 0 ? errors : null;
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Extract fields to update
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (password !== undefined) updates.password = password;

    // Validate incoming user data
    const validationErrors = validateUser(updates);
    if (validationErrors) {
        return res.status(400).send(`Validation errors: ${validationErrors.join(', ')}`);
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update user fields only if they are provided in the request
        Object.keys(updates).forEach(key => {
            user[key] = updates[key];
        });

        await user.save();

        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`);
    }
}

module.exports = { updateUser };

