/* This file is created so that in dev mode whenever browser makes request to the create react app 
 server it is forwarded to the node server - by using this we can eliminate cors error , in production mode since there is only one server running 
 this file can be omitted */
const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(proxy('/auth/google',{target:'http://localhost:5000'}));
    app.use(proxy('/api/**',{target:'http://localhost:5000'}));
}