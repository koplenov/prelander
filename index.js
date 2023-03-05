const api = 'https://sync.hyoo.ru/land'
const query = '=(title_text;release_ref(release_blob))'
const port = process.env.PORT || 3000

const http = require( 'http' )
const url = require( 'url' )

http.createServer( async function( request, responce ) {
	const { _escaped_fragment_ } = url.parse( request.url, true ).query

	if( !_escaped_fragment_ ) {
		responce.end()
		return
	}

	const proxy_request = await fetch(
		`${ api }${ decodeURIComponent( _escaped_fragment_ ) }${ query }`,
		{
			headers: {
				"Accept": "text/html",
			},
		}
	)
	const data = await proxy_request.text()
	responce.writeHead( 200, { 'Content-Type': 'text/html; charset=utf-8' } )
	responce.write( data )
	responce.end()
} ).listen( port )
