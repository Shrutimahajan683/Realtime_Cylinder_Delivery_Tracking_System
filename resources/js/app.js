import axios from 'axios'
import Noty from 'noty'
let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')

function updateCart(oxygen){
axios.post('/update-cart',oxygen).then(res=>{
    cartCounter.innerText=res.data.totalQty
})
}

addToCart.forEach((btn)=>{
   btn.addEventListener('click',(e)=>{
    let oxygen=JSON.parse(btn.dataset.oxygen);
    updateCart(oxygen);
   })
})