// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../src/db");
const { generateToken, generateRefreshToken, verifyToken } = require("../src/jwtUtils");
const { authenticateToken } = require("../src/authMiddleware");

const router = express.Router();

// User login
router.post("/user_login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email et mot de passe requis",
        error: "MISSING_CREDENTIALS"
      });
    }

    // Find user in database
    const result = await pool.query("SELECT * FROM candidat WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ 
        message: "Utilisateur introuvable",
        error: "USER_NOT_FOUND"
      });
    }

    const user = result.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.mdp);
    if (!validPassword) {
      return res.status(401).json({ 
        message: "Mot de passe incorrect",
        error: "INVALID_PASSWORD"
      });
    }

    // Generate tokens
    const accessToken = generateToken(user, 'user');
    const refreshToken = generateRefreshToken(user, 'user');

    // Return success response with tokens
    res.json({
      message: "Connecté avec succès",
      user: {
        id: user.idcandidat,
        email: user.email,
        nom: user.nom,
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ 
      message: "Erreur serveur", 
      error: "SERVER_ERROR"
    });
  }
});

// Enterprise login
router.post("/enterprise_login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email et mot de passe requis",
        error: "MISSING_CREDENTIALS"
      });
    }

    // Find enterprise in database
    const result = await pool.query("SELECT * FROM entreprise WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ 
        message: "Entreprise introuvable",
        error: "ENTERPRISE_NOT_FOUND"
      });
    }

    const user = result.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.mdp);
    if (!validPassword) {
      return res.status(401).json({ 
        message: "Mot de passe incorrect",
        error: "INVALID_PASSWORD"
      });
    }

    // Generate tokens
    const accessToken = generateToken(user, 'enterprise');
    const refreshToken = generateRefreshToken(user, 'enterprise');

    // Return success response with tokens
    res.json({
      message: "Connecté avec succès",
      user: {
        id: user.identreprise,
        email: user.email,
        nom: user.nom,
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Enterprise login error:', error);
    res.status(500).json({ 
      message: "Erreur serveur", 
      error: "SERVER_ERROR"
    });
  }
});

// Check authentication status
router.get("/status", authenticateToken, (req, res) => {
  res.json({ 
    authenticated: true, 
    user: {
      id: req.user.id,
      email: req.user.email,
      userType: req.user.userType,
      nom: req.user.nom
    }
  });
});

// Refresh token endpoint
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ 
        message: "Refresh token requis",
        error: "MISSING_REFRESH_TOKEN"
      });
    }

    const decoded = verifyToken(refreshToken);
    if (!decoded || decoded.type !== 'refresh') {
      return res.status(401).json({ 
        message: "Refresh token invalide",
        error: "INVALID_REFRESH_TOKEN"
      });
    }

    // Verify user still exists
    let user;
    if (decoded.userType === 'user') {
      const result = await pool.query("SELECT * FROM candidat WHERE idcandidat = $1", [decoded.id]);
      if (result.rows.length === 0) {
        return res.status(401).json({ 
          message: "Utilisateur non trouvé",
          error: "USER_NOT_FOUND"
        });
      }
      user = result.rows[0];
    } else if (decoded.userType === 'enterprise') {
      const result = await pool.query("SELECT * FROM entreprise WHERE identreprise = $1", [decoded.id]);
      if (result.rows.length === 0) {
        return res.status(401).json({ 
          message: "Entreprise non trouvée",
          error: "ENTERPRISE_NOT_FOUND"
        });
      }
      user = result.rows[0];
    } else {
      return res.status(401).json({ 
        message: "Type d'utilisateur invalide",
        error: "INVALID_USER_TYPE"
      });
    }

    // Generate new tokens
    const newAccessToken = generateToken(user, decoded.userType);
    const newRefreshToken = generateRefreshToken(user, decoded.userType);

    res.json({
      message: "Tokens rafraîchis avec succès",
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ 
      message: "Erreur serveur", 
      error: "SERVER_ERROR"
    });
  }
});

// Logout (client-side token removal)
router.post("/logout", (req, res) => {
  res.json({ 
    message: "Déconnecté avec succès - Supprimez les tokens côté client"
  });
});

module.exports = router;