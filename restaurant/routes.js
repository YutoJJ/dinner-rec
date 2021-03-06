const router = require('express').Router();
const restaurant = require('./model');



router.route('/')
  .get((req,res)=>{
    restaurant.find().then(rests=>{
        res.send(rests);
    })
  })
  .post((req,res)=>{
    console.log('data from http post',req.body);
    restaurant.create({
        name:req.body.name,
        address: req.body.address,
        date: new Date(req.body.dob).getTime(),
        menu:req.body.menu,
        note: req.body.note
    }).then(rest => {
        res.send(`restaurant ${rest.name} created with id: ${rest._id}`);

    })
  })
  

router.route('/:id')
  .get((req,res) =>{
    restaurant.findById(req.params.id).then(rest => res.send(rest));
  })
  .patch((req,res) => {
      //normally here update existing user.......
      res.ok().send('restaurant updated successfully');
  })
  .delete((req,res) => {
      restaurant.findByIdAndDelete(req.params.id).then(() =>res.ok());
  })

  
module.exports = router;

