const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const myPostsController=require('../controllers/myPostsController');

module.exports = (app) => {

     app.use('/', homeController);
     app.use('/auth', authController);
     //app.use('/post', postController);
     //app.use('/myPosts', myPostsController);
     app.use('*',(req,res)=>{
          res.render('404');
     })
}