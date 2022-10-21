const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        return res.status(404).json({message: "UNABLE TO LOGGED IN not - middleware"})
    }
    next();
}

const isCookied = (req, res, next) =>{
    if(!req.cookies['user_token']){
        return res.status(404).json({message: "no cookie for the user"})
    }
    next();
}

module.exports = {
    isLoggedIn,
    isCookied
};