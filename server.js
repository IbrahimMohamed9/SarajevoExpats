const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./backend/config/dbConnection");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./backend/middleware/errorHandler");

dotenv.config();

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sarajevo Expats",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3030",
      },
    ],
  },
  apis: ["./backend/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

connectDb();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/events/", require("./backend/routes/eventRoutes"));
app.use("/api/news/", require("./backend/routes/newsRoutes"));
app.use("/api/places/", require("./backend/routes/placeRoutes"));
app.use("/api/placeTypes/", require("./backend/routes/placeTypeRoutes"));
app.use("/api/services/", require("./backend/routes/serviceRoutes"));
app.use("/api/serviceTypes/", require("./backend/routes/serviceTypeRoutes"));
app.use(
  "/api/serviceSubtypes/",
  require("./backend/routes/serviceSubtypeRoutes")
);
app.use("/api/users/", require("./backend/routes/userRoutes"));
app.use(errorHandler);

const host_name = process.env.HOST_NAME || "localhost";
const port = process.env.PORT || 3333;

const server = app.listen(port, host_name, () => {
  console.log(
    `The connection stablished in http://${server.address().address}:${
      server.address().port
    }`
  );
});
