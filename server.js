// server.js
const express = require('express');
const path = require('path');
const url = require('url');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 9000;
// pray for the best

// Log middleware to see all requests
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
	next();
});

// IMPORTANT: Make sure to serve all static files properly
// This should be configured before any routes
app.use(express.static(path.join(__dirname), {
	dotfiles: 'allow',
	etag: true,
	extensions: ['html', 'css', 'js'],
	index: false,
	maxAge: '1d',
	redirect: false
}));

// Redirect root to inspector.html while preserving query parameters
app.get('/', (req, res) => {
	console.log('Root path accessed, redirecting to inspector.html');
	const queryString = url.parse(req.url).search || '';
	res.redirect(`/inspector.html${queryString}`);
});

// For other routes that don't match static files
app.get('*', (req, res) => {
	// If the path doesn't include a file extension
	if (!req.path.includes('.')) {
		console.log(`Non-file route, serving inspector.html: ${req.path}`);
		res.sendFile(path.join(__dirname, 'inspector.html'));
	} else {
		// Let the static middleware try to handle it first
		const filePath = path.join(__dirname, req.path);
		fs.access(filePath, fs.constants.F_OK, (err) => {
			if (err) {
				console.log(`File not found: ${req.path}`);
				res.status(404).send(`File not found: ${req.path}`);
			} else {
				// This should not be reached as express.static should handle it
				res.sendFile(filePath);
			}
		});
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