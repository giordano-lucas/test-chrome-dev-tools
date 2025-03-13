// server.js
const express = require('express');
const path = require('path');
const url = require('url');

const app = express();
const PORT = process.env.PORT || 9000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '/')));

// Redirect root to inspector.html while preserving query parameters
app.get('/', (req, res) => {
	const queryString = url.parse(req.url).search || '';
	res.redirect(`/inspector.html${queryString}`);
});

// For other routes that don't match static files
app.get('*', (req, res) => {
	// Check if the request is for a specific file
	if (req.path.includes('.')) {
		// Let the static middleware handle it
		res.status(404).send('File not found');
	} else {
		// For non-file routes, serve inspector.html
		res.sendFile(path.join(__dirname, 'inspector.html'));
	}
});

// Only needed for local development
if (process.env.NODE_ENV !== 'production') {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
		console.log(`Default page: http://localhost:${PORT}/inspector.html`);
	});
}

// Export the express app for Vercel
module.exports = app;