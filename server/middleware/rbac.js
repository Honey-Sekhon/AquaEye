module.exports = function (requiredRole) {
  return function (req, res, next) {
      if (!req.user || !req.user.role) {
          return res.status(403).json({ message: 'Access denied.' });
      }
      const rolesHierarchy = {
          superAdmin: 4,
          admin: 3,
          coach: 2,
          athlete: 1,
          user: 0
      };
      if (rolesHierarchy[req.user.role] < rolesHierarchy[requiredRole]) {
          return res.status(403).json({ message: 'You do not have the necessary permissions.' });
      }
      next();
  };
};
