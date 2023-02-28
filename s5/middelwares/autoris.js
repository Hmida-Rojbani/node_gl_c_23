module.exports = function (req,res,next) {
    if(!req.user_token.isAdmin)
        return res.status(401).send('You are not authorise to do this action.');
    next();
}