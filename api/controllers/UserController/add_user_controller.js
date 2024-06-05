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

    const nameError = validateName(user.name);
    if (nameError) {
        errors.push(nameError);
    }

    const emailError = validateEmail(user.email);
    if (emailError) {
        errors.push(emailError);
    }

    const passwordError = validatePassword(user.password);
    if (passwordError) {
        errors.push(passwordError);
    }

    return errors.length > 0 ? errors : null;
}

async function addNewUser(req, res) {
    
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    // Validate incoming user data
    const validationErrors = validateUser({ name, email, password });
    if (validationErrors) {
        return res.status(400).send(`Validation errors: ${validationErrors.join(', ')}`);
    }

    try {
        await User.create({
            name,
            email,
            password: hashedPassword ,
        });

        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`);
    }
}

module.exports = { addNewUser };



// const User = require('../../models/userSchema')
// async function addNewUser(req,res) {
//     const {name,email,password}= req.body;

//     await User.create({
//         name,
//         email,
//          password,
//     });
   
// }



// module.exports = { addNewUser  }