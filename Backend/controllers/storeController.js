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
    try {
      const storeRate = await store.findById(req.params.storeId);
      console.log(storeRate);
      if (!storeRate) {
        return res.status(404).json({ msg: 'Store not found' });
      }
      const userRating = storeRate.ratings.find(r => r.userId.toString() === userId);

      if (userRating) {
        userRating.rating = rating;
      } else {
        storeRate.ratings.push({ userId, rating });
      }

      storeRate.overallRating = storeRate.ratings.reduce((acc, r) => acc + r.rating, 0) / storeRate.ratings.length;
      await storeRate.save();

      res.json(storeRate);
    
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


export {addStore,rateStore,storeListing}