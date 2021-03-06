const passport = require('passport');

module.exports = (app) => {

    app.get(
        '/auth/google',
        passport.authenticate('google',{
            scope: ['profile','email']
        })
    );
    
    app.get('/auth/google/callback',
             passport.authenticate('google'),
            (req,res) => {
                 res.redirect('/surveys');
            }
    );

    app.post('/api/current_user',(req,res) => {
        res.send(req.user);
    });

    app.get('/api/logout',(req,res) => {
        /* calling logout function attached by the passport */
        req.logout();
        res.redirect('/');
    });
};
