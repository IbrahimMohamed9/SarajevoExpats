/**
 * Utility function to extract JWT token from various sources in the request
 * Checks authorization header, cookies, and the cookies header from Next.js SSR
 * @param {Object} req - Express request object
 * @returns {String|null} - The extracted token or null if no token found
 */
const extractToken = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }
    const tokenFromCookie = req.cookies?.access_token;
    if (tokenFromCookie) {
      if (tokenFromCookie.startsWith("Bearer ")) {
        return tokenFromCookie.substring(7);
      }
      return tokenFromCookie;
    }
    const cookiesHeader = req.headers.cookie || req.headers.cookies;
    if (cookiesHeader && cookiesHeader.includes("access_token=")) {
      const tokenMatch = cookiesHeader.match(/access_token=([^;]+)/);
      if (tokenMatch && tokenMatch[1]) {
        const token = tokenMatch[1];
        if (token.startsWith("Bearer ")) {
          return token.substring(7);
        }
        return token;
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting token:", error);
    return null;
  }
};

module.exports = { extractToken };
