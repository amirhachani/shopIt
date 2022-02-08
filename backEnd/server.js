const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handle the uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

//setting up config file

dotenv.config({ path: "backEnd/config/config.env" });

//Connecting to database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
