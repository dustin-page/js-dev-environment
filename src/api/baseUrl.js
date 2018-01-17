export default function getBaseUrl(){
	const inDevelopment = window.location.hostname === 'localhost';
	return inDevelopment ? 'http://localhost:3001/' : '/'; //port 3001 is where the json server is running
}
