let api_url = "https://yuanjing-server.azurewebsites.net";
// if (__DEV__) {
//     api_url = "http://192.168.31.91:4000"
// }
const config = {
    API_URL: api_url
};
console.log(`config:${JSON.stringify(config)}`);
export default config;
