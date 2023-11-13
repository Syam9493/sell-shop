import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
   

    // @desc Auth user & get token 
    // @route POST/api/users/login
    //@acces Public

    const authUser = asyncHandler(async(req,res)=>{

        const {email , password } = req.body;


        const user = await User.findOne({ email });

        if(user && (await user.matchPassword(password))){
          
               generateToken(res, user._id);

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400);
            throw new Error('Invalid email or Password');
        }
        
    });


     // @desc Register User
    // @route POST/api/users
    //@acces Public

    const registerUser = asyncHandler(async(req,res)=>{
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});

        if(userExists){
            res.status(400);
            throw new Error('User alredy exits');
        };

        const user = await User.create({
            name,
            email,
            password
        });

        if(user){
            
            generateToken(res, user._id);

            res.status(201).json({
                _id: user._id,
                 name: user.name,
                 email: user.email,
                 isAdmin: user.isAdmin
            });
        } else {
            res.status(400);
           throw new Error('Invalid user data');
        }
    });

     // @desc Logout user/ clear cookie 
    // @route POST/api/users/logout
    //@acces Public

    const logoutUser = asyncHandler(async(req,res)=>{
        res.cookie('jwt','',{
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({message: 'Logged out successfully'});
    });

     // @desc Get user  Profile
    // @route GET/api/users/login
    //@acces Private

    const getUserProfile = asyncHandler(async(req,res)=>{
       const user = await User.findById(req.user._id);

       if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
       })
       }else{
        res.status(404);
        throw new Error('User not found');
       }
    });


    // @desc Update user Profile
    // @route PUT/api/users/login
    //@acces Private

    const updateUserProfile = asyncHandler(async(req,res)=>{
       const user = await User.findById(req.user._id);
        
       if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        };

        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
       } else {
        res.status(404);
        throw new Error('User not found');
       };
    });


     // @desc Get users 
    // @route GET/api/users
    //@acces Private/Admin

    const getUsers = asyncHandler(async(req,res)=>{
        res.send('get users');
    });

      // @desc Get users by id 
    // @route GET/api/users/:id
    //@acces Private/Admin

    const getUsersById = asyncHandler(async(req,res)=>{
        res.send('get users by id');
    });


     // @desc Delete user 
    // @route DELETE/api/users/:id
    //@acces Private/Admin

    const deleteUser = asyncHandler(async(req,res)=>{
        res.send('delete user');
    });

    // @desc Update user 
    // @route PUT/api/users/:id
    //@acces Private/Admin

    const updateUser = asyncHandler(async(req,res)=>{
        res.send('update user');
    });


    export {
        authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        getUsers,
        deleteUser,
        getUsersById,
        updateUser,
    }