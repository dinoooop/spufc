const User = require('../../models/userSchema');

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

    return errors.length > 0 ? errors : null;
}

async function getAllUser(req, res) {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Validate fetched users data
        const validationErrors = users.map(user => validateUser(user)).filter(errors => errors);

        if (validationErrors.length > 0) {
            return res.status(500).send(`Invalid user data found: ${validationErrors.flat().join(', ')}`);
        }

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllUser };


// const User = require('../../models/userSchema')


// async function getAllUser(req,res) {
//         try {
//       const users = await User.find();
//       res.status(200).send(users);
//     } catch (error) {
//       res.status(500).send(error);
//     }
   
// }




// module.exports = {   getAllUser ,}