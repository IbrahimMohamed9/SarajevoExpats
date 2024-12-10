const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middleware/errorHandler");

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
  apis: [__dirname + "/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

connectDb();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/events/", require("./routes/eventRoutes"));
app.use("/news/", require("./routes/newsRoutes"));
app.use("/places/", require("./routes/placeRoutes"));
app.use("/placeTypes/", require("./routes/placeTypeRoutes"));
app.use("/services/", require("./routes/serviceRoutes"));
app.use("/serviceTypes/", require("./routes/serviceTypeRoutes"));
app.use("/serviceSubtypes/", require("./routes/serviceSubtypeRoutes"));
app.use("/users/", require("./routes/userRoutes"));
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
