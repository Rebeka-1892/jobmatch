// src/jwtUtils.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate JWT token for user
 * @param {Object} user - User object containing id, email, and other user data
 * @param {string} userType - Type of user ('user' or 'enterprise')
 * @returns {string} JWT token
 */
const generateToken = (user, userType) => {
  const payload = {
    id: user.idcandidat || user.identreprise,
    email: user.email,
    userType: userType,
    nom: user.nom
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'jobmatch-api',
    audience: 'jobmatch-client'
  });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'jobmatch-api',
      audience: 'jobmatch-client'
    });
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Token or null if not found
 */
const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
};

/**
 * Generate refresh token (longer expiration)
 * @param {Object} user - User object
 * @param {string} userType - Type of user
 * @returns {string} Refresh token
 */
const generateRefreshToken = (user, userType) => {
  const payload = {
    id: user.idcandidat || user.identreprise,
    email: user.email,
    userType: userType,
    type: 'refresh'
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Refresh token valid for 7 days
    issuer: 'jobmatch-api',
    audience: 'jobmatch-client'
  });
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader,
  generateRefreshToken
};
