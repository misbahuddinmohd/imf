const jwt = require('jsonwebtoken');

// Handler for registering the JWT
exports.registerJWT = async (req, res) => {
    let { email } = req.body;

    try {
        // Validate email
        if (!email) {
            return res.status(400).json({
                status: "failed",
                error: 'Email is required'
            });
        }

        email = email.toLowerCase();

        // Create a JWT token 
        const token = jwt.sign(
            { userEmail: email },  // Payload 
            process.env.JWT_SECRET,   // Secret key from .env
            { expiresIn: '30d' }      // Token expiration
        );

        // send the token
        res.status(200).json({
            status: "success",
            message: "Token Created, use this token for API calls",
            token
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            error: err.message
        });
    }
};


// middleware for verifying the JWT
exports.verifyJWT = async (req, res, next) => {
    console.log()
    // Get token from Authorization header
    const token = req.header('Authorization')?.split(' ')[1];
    try {
        if (!token) {
            return res.status(401).json({
                status: 'failed',
                message: 'Access denied. No token provided.'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded; // Attach user email for future use, like for role based access control

        next(); // next middleware 
    } catch (err) {
        // Handle JWT errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'failed',
                message: 'Token has expired.'
            });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid token.'
            });
        }
        // for other errors
        res.status(400).json({
            status: "failed",
            error: err.message
        });
    }
};
