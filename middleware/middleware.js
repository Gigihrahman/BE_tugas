import jwt from "jsonwebtoken";

const jwtMiddleware = (request, response, next) => {
  const token = request.headers["token"];
  console.log(request.path);
  if (
    request.path === "/login" ||
    request.path === "/register" ||
    request.path === "/admin"
  ) {
    next();
  } else {
    jwt.verify(token, "secretkey", (err, authData) => {
      console.log(err);
      if (err) {
        response.status(403).json("Forbidden");
      } else {
        next();
      }
    });
  }
};

export default jwtMiddleware;

