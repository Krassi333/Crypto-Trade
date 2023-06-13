const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const cryptoController = require('../controllers/cryptoController');


module.exports = (app) => {

     app.use('/', homeController);
     app.use('/auth', authController);
     app.use('/crypto', cryptoController);
   
     app.use('*',(req,res)=>{
          res.render('404');
     })
}