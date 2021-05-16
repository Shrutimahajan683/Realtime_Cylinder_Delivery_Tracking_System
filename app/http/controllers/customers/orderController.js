const { model } = require("mongoose")
const Order =require('../../../models/order')
const moment=require('moment')

function orderController(){
    return{
        store(req,res){
         const {phone ,address} =req.body
         if(!phone||!address){
             flash.req('error','All fields required')
             return res.redirect('/cart')
         }
         const order = new Order({
            customerId: req.user._id,
            items: req.session.cart.items,
            phone,
            address
        })
          order.save().then((result)=>{
              Order.populate(result,{path:'customerId'},(err,placedOrder)=>{
                req.flash('success','Order Placed Successfully')
                delete req.session.cart
                const eventEmitter=req.app.get('eventEmitter')
                eventEmitter.emit('orderPlaced',placedOrder)
                return res.redirect('/customers/orders')
              })
          }).catch(err=>{
              req.flash('error','something went wrong')
              return res.redirect('./cart')
          })
        },
        async index(req,res){
            const orders=await Order.find({customerId:req.user._id},null,{sort:{'createdAt':-1}})
            res.render('customers/orders',{orders:orders,moment:moment})
        },
        async show(req,res){
            const order=await Order.findById(req.params.id)
            if(req.user._id.toString()===order.customerId.toString()){
                res.render('customers/singleOrder',{order:order})
            }
            else
            {
                res.redirect('/')
            }
        }
    }
}

module.exports=orderController