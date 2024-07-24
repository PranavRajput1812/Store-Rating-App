import jwt from 'jsonwebtoken'


const isLoggedIn = async (req,res,next)=>{
    const {token}= req.cookies
    console.log(`TOKEN => ${token}`);
    if(!token){
        return res.status(500).json({
            success: false ,
            message: 'Unauthenticated, please try again'
        });
    }

    const userDetails = await jwt.verify(token,process.env.SECRET)

    req.user = userDetails

    next() 
}
 
const  authorizedRoles = (...roles) => async (req,res,next) =>{
    const currentRole = req.user.role

    if(!roles.includes(currentRole)){
        return res.status(500).json({
            success: false ,
            message: 'You do not the permission to access this route!'
        });
    }

    next()
} 


export  {isLoggedIn,authorizedRoles}   