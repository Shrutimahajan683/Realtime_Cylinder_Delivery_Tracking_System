const Menu=require('../../models/menu')

function homeController(){
    return{
        async index(req,res){
            const oxygen=await Menu.find()
            return res.render('home',{oxygen:oxygen})
        }
    }
}
module.exports=homeController