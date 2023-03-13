module.exports = {
	apps: [ {
		log_date_format : "YYYY-MM-DD-HH:mm:ss Z",
		script: 'index.js',
		watch: '.',
		env: {
            "PORT": 2999,
            "NODE_ENV": "production"
        },
	}, ],
}
