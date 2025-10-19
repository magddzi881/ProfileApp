import jwt from "jsonwebtoken";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

// JWKS client
const jwksClient = jwksRsa({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Function to get signing key
function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// JWT validation middleware
export function checkJwt(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = auth.split(" ")[1];

  const options = {
    audience: AUTH0_AUDIENCE,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ["RS256"],
  };

  jwt.verify(token, getKey, options, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Role checking middleware
export function checkRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    const rolesClaimNames = [
      `${AUTH0_AUDIENCE}/roles`,
      "roles",
      "role",
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    ];

    let roles = [];

    for (const claim of rolesClaimNames) {
      const val = req.user[claim];
      if (Array.isArray(val)) { roles = val; break; }
      if (typeof val === "string") { roles = [val]; break; }
    }
    if (!roles.length && req.user.authorization?.roles) {
      roles = req.user.authorization.roles;
    }

    if (!roles.includes(requiredRole)) {
      return res.status(403).json({ message: "Forbidden: Admin role required" });
    }

    next();
  };
}
