export default function getBaseUrl() {
	/* const inDevelopment = window.location.hostname === 'localhost';
	return inDevelopment ? 'http://localhost:3001/' : '/'; //port 3001 is where the json server is running
	*/
	//return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : '/';
	return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : 'https://fast-temple-39297.herokuapp.com/'; //Point production API URL to Heroku
}

function getQueryStringParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
