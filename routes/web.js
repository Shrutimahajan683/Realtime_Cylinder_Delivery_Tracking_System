const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customers/cartController')
const guest=require('../app/http/middleware/guest')
const orderController = require('../app/http/controllers/customers/ordercontroller')
const auth=require('../app/http/middleware/auth')
const admin=require('../app/http/middleware/admin')
const adminorderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

function intitRoutes(app){
    app.get('/',homeController().index)
       app.get('/cart',cartController().index)
       app.get('/login',guest,authController().login)
       app.post('/login',authController().postLogin)
        app.get('/register',guest,authController().register)
        app.post('/register',authController().postRegister)
        app.post('/logout',authController().logout)
    app.post('/update-cart',cartController().update)
    app.post('/orders',auth,orderController().store)
    app.get('/customers/orders',auth,orderController().index)
    app.get('/customers/orders/:id',auth,orderController().show)
    app.get('/admin/orders',admin,adminorderController().index)
    app.post('/admin/order/status',admin,statusController().update)
}

module.exports=intitRoutes