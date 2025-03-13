// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const url = require('url');

const app = express();
const PORT = process.env.PORT || 9000;

// Debug logging middleware
app.use((req, res, next) => {
	console.log(`Request: ${req.method} ${req.url}`);
	next();
});

// Serve static files with verbose logging
app.use((req, res, next) => {
	const filePath = path.join(__dirname, req.url.split('?')[0]);

	// Check if file exists and serve it
	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (!err && fs.statSync(filePath).isFile()) {
			console.log(`Serving file: ${filePath}`);
			return res.sendFile(filePath);
		}
		next();
	});
});

// Redirect root to inspector.html preserving query params
app.get('/', (req, res) => {
	const queryString = url.parse(req.url).search || '';
	res.redirect(`/inspector.html${queryString}`);
});

// Fallback to inspector.html for non-file routes
app.use((req, res) => {
	// If it's a file request that wasn't found
	if (req.path.includes('.')) {
		console.log(`File not found: ${req.path}`);
		return res.status(404).send(`File not found: ${req.path}`);
	}

	// Otherwise serve inspector.html
	console.log(`Serving inspector.html for path: ${req.path}`);
	res.sendFile(path.join(__dirname, 'inspector.html'));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

module.exports = app;