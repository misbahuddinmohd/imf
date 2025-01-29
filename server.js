const app = require('./app'); // Import your express app

const PORT = process.env.PORT || 5000;


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});