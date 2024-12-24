const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");

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
        url: "http://rest.sarajevoexpats.com/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/events/", require("./routes/eventRoutes"));
app.use("/api/qaas/", require("./routes/QaARoutes"));
app.use("/api/news/", require("./routes/newsRoutes"));
app.use("/api/places/", require("./routes/placeRoutes"));
app.use("/api/placeTypes/", require("./routes/placeTypeRoutes"));
app.use("/api/services/", require("./routes/serviceRoutes"));
app.use("/api/serviceTypes/", require("./routes/serviceTypeRoutes"));
app.use("/api/serviceSubtypes/", require("./routes/serviceSubtypeRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/photos", express.static(path.join(__dirname, "photos")));
app.use("/api/upload", require("./routes/uploadRoutes"));
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
