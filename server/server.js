const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://www.sarajevoexpats.com",
      "https://sarajevoexpats.com",
      "http://localhost:3030",
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400,
};

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
        url: "https://sarajevoexpats.com/api",
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
app.use(cors(corsOptions));
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
// Add pre-flight OPTIONS handling
app.options("*", cors(corsOptions));
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/events/", require("./routes/eventRoutes"));
app.use("/api/qaas/", require("./routes/QaARoutes"));
app.use("/api/news/", require("./routes/newsRoutes"));
app.use("/api/places/", require("./routes/placeRoutes"));
app.use("/api/placeTypes/", require("./routes/placeTypeRoutes"));
app.use("/api/services/", require("./routes/serviceRoutes"));
app.use("/api/serviceTypes/", require("./routes/serviceTypeRoutes"));
app.use("/api/serviceSubtypes/", require("./routes/serviceSubtypeRoutes"));
app.get("/api/users", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://www.sarajevoexpats.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.json({ message: "Users API is working!" });
});
app.use("/api/upload", require("./routes/uploadRoutes"));

const photosDir = path.join(__dirname, "photos");
console.log("Serving photos from:", photosDir);
app.use(
  "/api/photos",
  express.static(photosDir, {
    dotfiles: "deny",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
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
});
