const jwt = require("jsonwebtoken");

async function Authorization(req, res, next) {
    try {
        const auth = req.headers["authorization"];

        if (!auth) return res.status(401).json({ message: "Unothorized access auth not provided" });

        const token = auth && auth.split(" ")[1];
        
        if (!token) return res.status(401).json({ message: "Unothorized access no token" });

        jwt.verify(token, process.env.TOKEN_KEY, (err, id) => {
            if (err) return res.status(401).json({ message: err.message })
            req.userId = id.id;
            return next();
        })

    } catch (error) {
        res.status(401).json({ message: "Unothorized err access error", message: error.message })
    }
}

async function socketAuthorization(socket, next) { 
    try { 
        const token = socket.handshake.auth?.token; 
        if (!token) { 
            console.log("no token") ;
            return new Error("Unothorized access");

         } 
         const user = await jwt.verify(token, process.env.TOKEN_KEY) 
         socket.userId = user.id;
          next(); 
        } catch (error) { 
            console.log(error.toString()) 
            return next(new Error("Unothorized access")); 
        } 
    }

module.exports = { Authorization ,socketAuthorization}