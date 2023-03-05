module.exports = {
	apps: [ {
		script: 'index.js',
		watch: '.',
		env: {
            "PORT": 2999,
            "NODE_ENV": "production"
        },
	}, ],
}
