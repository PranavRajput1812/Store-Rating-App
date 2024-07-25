import user from "../models/userModel.js";
import store from "../models/storeModel.js";
const storeListing = async(req,res)=>{
    try {
      const userId = req.user.id
        const stores = await store.find();
        const storesWithUserRatings = stores.map(store => {
          const userRating = store.ratings.find(rating => rating.userId.toString() === userId);
          return {
              ...store._doc, 
              myRating: userRating ? userRating.rating : null 
          };
      });
      console.log(storesWithUserRatings);
         res.status(200).json({
            success: true,
            message: `Store load successfully`,
            stores: storesWithUserRatings 
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
      console.log('userRating',userRating);
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

const addStore = async (req, res) => {
  try {
    const { Name, email, Address, rating } = req.body;
    console.log(req.body);
    if (!Name || !email || !Address) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const storeExists = await store.findOne({ email });
    //console.log('Store Exists:', storeExists);
    if (storeExists) {
      return res.json({
        success: false,
        message: 'Store already exists!',
      });
    }

    const newStore = await store.create({
      Name,
      email,
      Address,
      rating,
    });
   // console.log('New Store:', newStore);

    return res.status(200).json({
      success: true,
      message: 'Store registered successfully',
      newStore,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserThatRateStore = async(req,res)=>{
 // let storeId = req.params.storeId;
  try {
    let email = req.params.email;
    console.log(email);
  
    let storeUser = await store.findOne({email});
    console.log(storeUser);
    if (!storeUser) {
      return res.status(404).json({ msg: 'Store not found' });
    }
    let averageRating = storeUser.overallRating;
  
    let userIds = storeUser.ratings.map(r => r.userId);

   
    let users = await user.find({ '_id': { $in: userIds } });

    res.status(200).json({
      success: true,
      message: 'Users who rated the store retrieved successfully',
      users,
      averageRating,
      storeUser
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message
    });
  }

}

export {addStore,rateStore,storeListing,getUserThatRateStore};