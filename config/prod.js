/*
module.exports = {
    googleClientId: '876935226747-c99sf0ferumscj2vukconuuovacncg8b.apps.googleusercontent.com',
    googleClientSecret: 'NGJEWoQyHxFOmctScbf-1rnu',
    mongoURI: 'mongodb+srv://user1:ilI80EiajsyFYfBv@cluster0-fanfm.mongodb.net/test?retryWrites=true&w=majority',
    cookieKey:'akuhaKIHSKHkidhkppnkGkuGvlnsbkuhkau'
};
*/

module.exports = {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
};