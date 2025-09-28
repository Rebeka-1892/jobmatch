// src/authMiddleware.js
const { verifyToken, extractTokenFromHeader } = require('./jwtUtils');
const pool = require('./db');

/**
 * JWT Authentication Middleware
 * Verifies JWT token and adds user info to request object
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({ 
        message: 'Token d\'accès requis',
        error: 'MISSING_TOKEN'
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ 
        message: 'Token invalide ou expiré',
        error: 'INVALID_TOKEN'
      });
    }

    // Verify user still exists in database
    let user;
    if (decoded.userType === 'user') {
      const result = await pool.query("SELECT * FROM candidat WHERE idcandidat = $1", [decoded.id]);
      if (result.rows.length === 0) {
        return res.status(401).json({ 
          message: 'Utilisateur non trouvé',
          error: 'USER_NOT_FOUND'
        });
      }
      user = result.rows[0];
    } else if (decoded.userType === 'enterprise') {
      const result = await pool.query("SELECT * FROM entreprise WHERE identreprise = $1", [decoded.id]);
      if (result.rows.length === 0) {
        return res.status(401).json({ 
          message: 'Entreprise non trouvée',
          error: 'ENTERPRISE_NOT_FOUND'
        });
      }
      user = result.rows[0];
    } else {
      return res.status(401).json({ 
        message: 'Type d\'utilisateur invalide',
        error: 'INVALID_USER_TYPE'
      });
    }

    // Add user info to request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      userType: decoded.userType,
      nom: decoded.nom,
      fullUser: user
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      message: 'Erreur d\'authentification',
      error: 'AUTH_ERROR'
    });
  }
};

/**
 * Middleware to check if user is a regular user (candidat)
 */
const requireUser = (req, res, next) => {
  if (req.user && req.user.userType === 'user') {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Accès refusé - Utilisateur requis',
      error: 'USER_REQUIRED'
    });
  }
};

/**
 * Middleware to check if user is an enterprise
 */
const requireEnterprise = (req, res, next) => {
  if (req.user && req.user.userType === 'enterprise') {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Accès refusé - Entreprise requise',
      error: 'ENTERPRISE_REQUIRED'
    });
  }
};

/**
 * Optional authentication middleware
 * Doesn't fail if no token, but adds user info if token is valid
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        // Verify user still exists
        let user;
        if (decoded.userType === 'user') {
          const result = await pool.query("SELECT * FROM candidat WHERE idcandidat = $1", [decoded.id]);
          if (result.rows.length > 0) {
            user = result.rows[0];
            req.user = {
              id: decoded.id,
              email: decoded.email,
              userType: decoded.userType,
              nom: decoded.nom,
              fullUser: user
            };
          }
        } else if (decoded.userType === 'enterprise') {
          const result = await pool.query("SELECT * FROM entreprise WHERE identreprise = $1", [decoded.id]);
          if (result.rows.length > 0) {
            user = result.rows[0];
            req.user = {
              id: decoded.id,
              email: decoded.email,
              userType: decoded.userType,
              nom: decoded.nom,
              fullUser: user
            };
          }
        }
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if there's an error
  }
};

module.exports = {
  authenticateToken,
  requireUser,
  requireEnterprise,
  optionalAuth
};
