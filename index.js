const api = 'https://sync.hyoo.ru/land'
const domain = 'https://page.hyoo.ru'
const default_page = '=iy8wtn_tky6pc'
const query = '=(title_text;release_ref(release_blob);pages_ref=(title_text);book_ref=(title_text))'
const port = process.env.PORT || 3000

const { Readable } = require( 'stream' )
const http = require( 'http' )
const url = require( 'url' )

http.createServer( async function( request, responce ) {
	let { _escaped_fragment_ } = url.parse( request.url, true ).query

	console.log( request.url, request.headers )

	if( _escaped_fragment_ === undefined ) {
		return responce.end()
	}

	const splited = _escaped_fragment_.split( "/" )
	if( splited.length > 1 ) {
		responce.writeHead( 302, { 'Location': `${ domain }/?_escaped_fragment_=${ splited[ 0 ] }` } )
		return responce.end()
	}

	if( _escaped_fragment_ === "" ) {
		_escaped_fragment_ = default_page
	}

	const proxy_request = await fetch(
		`${ api }${ decodeURIComponent( _escaped_fragment_ ) }${ query }`,
		{
			headers: {
				"Accept": "text/html",
			},
		}
	)
	const headers = Object.fromEntries( proxy_request.headers )
	delete headers[ 'content-encoding' ]
	responce.writeHead( proxy_request.status, headers )

	Readable.fromWeb( proxy_request.body )
		.pipe( responce, { end: true } )
} ).listen( port )
