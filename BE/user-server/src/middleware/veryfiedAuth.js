const { decode } = require("../jwt/decode");
const ResponseFactory = require("../response_design");

// Middleware xác thực role admin
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .json(
          ResponseFactory.createResponse(401, "Unauthorized: No token provided")
        );
    } else {
      // Giải mã JWT và lấy role từ payload
      const decodedToken = await decode(token);
      const { role,idUser } = decodedToken;

      // Kiểm tra role
      if (role === "admin") {
        req.idUser = idUser
        // Nếu là admin, tiếp tục middleware tiếp theo
        next();
      } else {
        return res
          .json(
            ResponseFactory.createResponse(403, "Forbidden: Access denied")
          );
      }
    }
  } catch (error) {
    return res
      .json(ResponseFactory.createResponse(500, error.message));
  }
};

// Middleware xác thực role user
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .json(
          ResponseFactory.createResponse(401, "Unauthorized: No token provided")
        );
    }

    // Giải mã JWT và lấy role từ payload
    const decodedToken = await decode(token);
    const { role,idUser } = decodedToken;

    // Kiểm tra role
    if (role === "user") {
      req.idUser = idUser
      // Nếu là user, tiếp tục middleware tiếp theo
      next();
    } else {
      return res
        .json(ResponseFactory.createResponse(403, "Forbidden: Access denied"));
    }
  } catch (error) {
    return res
      .json(ResponseFactory.createResponse(500, error.message));
  }
};

// Middleware xác thực cho cả hai role admin và user
const verifyAllRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .json(
          ResponseFactory.createResponse(401, "Unauthorized: No token provided")
        );
    }

    // Giải mã JWT và lấy role từ payload

    const decodedToken = await decode(token);
    const { role,idUser } = decodedToken;

    // Kiểm tra role
    if (role === "admin" || role === "user") {
      req.idUser = idUser
      // Nếu là admin hoặc user, tiếp tục middleware tiếp theo
      next();
    } else {
      return res
        .json(ResponseFactory.createResponse(403, "Forbidden: Access denied"));
    }
  } catch (error) {
    return res
      .json(ResponseFactory.createResponse(500, error.message));
  }
};

module.exports = { verifyAdmin, verifyUser, verifyAllRole };
