import {registerUser, loginUser} from  '../services/authService.js'; 
export const register = async (req,res) => {
    try{

    const {email, password, name} = req.body;
    await registerUser(email,password,name);
    return res.status(201).json({message:'Usuario registrado con exito!!'})
    }
    catch(error){
        return res.json({error: error.message});
    }
}; 

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const token = await loginUser(email,password);
        return res.json({token});
    }catch(error) {
         return res.json({error: error.message});
    }
};
