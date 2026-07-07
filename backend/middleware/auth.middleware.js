import  jwt  from "jsonwebtoken"


export const verifyToken = (req,res,next) =>{
    const token = req.cookies.token
    console.log(token , 'haha')
    if(!token) return res.status(401).send("you dont have Token")
     
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){res.status(403).send("invalid Token")}
}