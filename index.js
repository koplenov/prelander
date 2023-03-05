const api = 'http://127.0.0.1:8007/land='
const fastify = require( 'fastify' )( {
	logger: true
} )

fastify.get( '/', async ( request, reply ) => {
	reply.header( "Content-Type", "text/html; charset=utf-8" )
	const { _escaped_fragment_ } = request.query
	if( _escaped_fragment_ ) {
		const proxy_request = await fetch(
			`${ api }${ _escaped_fragment_ }=(title_text;release_ref(release_blob))`,
			{
				headers: {
					"Accept": "text/html",
				},
			}
		)
		return await proxy_request.text()
	}
	return null
} )

fastify.listen( { port: 3000 }, ( err, address ) => {
	if( err ) throw err
} )
