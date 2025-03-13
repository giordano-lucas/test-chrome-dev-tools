// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '/')));

// For single page applications (optional)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Only needed for local development
if (process.env.NODE_ENV !== 'production') {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

// Export the express app for Vercel
module.exports = app;