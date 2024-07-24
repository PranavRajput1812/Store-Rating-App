import user from "../models/userModel.js";
import store from "../models/storeModel.js";
const storeListing = async(req,res)=>{
    try {
        const stores = await store.find();
         res.status(200).json({
            success: true,
            message: `Store load successfully`,
            stores
        })
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false ,
            message: err.message
        }) 
      }
}
const rateStore = async (req,res)=>{
    const { rating } = req.body;
    const userId = req.user.id;
    console.log('userId',userId);
    try {
      const storeRate = await store.findById(req.params.storeId);
      console.log(storeRate);
      if (!storeRate) {
        return res.status(404).json({ msg: 'Store not found' });
      }
      const userRating = storeRate.ratings.find(ele => ele.userId.toString() === userId);

      if (userRating) {
        userRating.rating = rating;
      } else {
        storeRate.ratings.push({ userId, rating });
      }
    //  console.log('userRating',userRating);
      storeRate.overallRating = storeRate.ratings.reduce((acc, r) => acc + r.rating, 0) / storeRate.ratings.length;
      await storeRate.save();
      
      let userSubmitedRating = await user.findById(userId);
      if(userSubmitedRating.role=='USER'){
          userSubmitedRating.isSumbmitedRating = true;
          await userSubmitedRating.save();
      }
    
      res.status(200).json({
        success: true ,
        message: 'Rating Save Successfully.',
        storeRate
      }) 
    
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false ,
        message: err.message
    }) 

    }
}
const addStore = async(req,res)=>{
    const{Name,email,Address,rating} = req.body;

    if(!Name || !email ||!Address){
        return next(new AppError(500,`All fields are required`)) 
    }
    const storeExists = await store.findOne({email})
    if(storeExists){
        return next(new AppError(500,`User already exists !`))
    }
    const newStore = await store.create({
        Name,
        email,
        Address,
        rating
    })
   // console.log(newStore);
    if(!newStore){
        return next(new AppError(500,`Store registration failed, please try again`))
    }

       // save user in DB
       await newStore.save();
       res.status(200).json({
        success: true ,
        message: `Store registered successfully`, 
        newStore
    })
}


const getUserThatRateStore = async(req,res)=>{
 // let storeId = req.params.storeId;
  try {
    let storeId = req.params.storeId;
    console.log(storeId);
    // Find the store by ID
    let storeUser = await store.findById(storeId);
    console.log(storeUser);
    if (!storeUser) {
      return res.status(404).json({ msg: 'Store not found' });
    }
    let averageRating = storeUser.overallRating;
    // Extract user IDs from the ratings
    let userIds = storeUser.ratings.map(r => r.userId);

    // Find all users that have rated the store
    let users = await user.find({ '_id': { $in: userIds } });

    res.status(200).json({
      success: true,
      message: 'Users who rated the store retrieved successfully',
      users,
      averageRating
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }

}

export {addStore,rateStore,storeListing,getUserThatRateStore};