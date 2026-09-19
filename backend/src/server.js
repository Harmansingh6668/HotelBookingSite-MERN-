const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();