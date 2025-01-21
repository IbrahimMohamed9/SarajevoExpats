const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");
const { scheduleInstagramEventsFetch } = require("./cronJobs");

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sarajevo Expats API",
      version: "1.0.0",
      description: "API documentation for Sarajevo Expats platform",
      contact: {
        name: "Sarajevo Expats Support",
        email: "support@sarajevoexpats.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3030",
        description: "Development server",
      },
      {
        url: "https://sarajevoexpats.com",
        description: "Production server",
      },
    ],
  },
  apis: [
    path.join(__dirname, "./routes/*.js"),
    path.join(__dirname, "./routes/swagger/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sarajevoexpats.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    maxAge: 600,
  })
);

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
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/insta", require("./routes/insta.js"));

const mediaDir = path.join(__dirname, "media");
console.log("Serving media from:", mediaDir);
const getMedia = (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": [
      "http://localhost:3000",
      "https://sarajevoexpats.com",
    ].includes(req.headers.origin)
      ? req.headers.origin
      : null,
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
    "Access-Control-Allow-Credentials": "true",
  });
  next();
};
app.use(
  "/api/media/",
  (req, res, next) => {
    getMedia(req, res, next);
  },
  express.static(mediaDir, {
    dotfiles: "deny",
  })
);

app.use(errorHandler);

const host_name = process.env.HOST_NAME || "localhost";
const port = process.env.PORT || 3333;

const server = app.listen(port, host_name, () => {
  console.log(
    `The connection stablished in http://${server.address().address}:${
      server.address().port
    }`
  );

  // Initialize cron jobs
  scheduleInstagramEventsFetch();
});
