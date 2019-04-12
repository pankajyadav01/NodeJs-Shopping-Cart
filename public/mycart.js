$(()=>{
    var currVendor;
    function refreshList(){
        $.get('/cart',(data)=>{
            $('#productList').empty()

            //data.sort((a,b) => a.priority - b.priority)
            var net = 0
            var count = 1;
            for(let item of data){
                net = item.product.price*item.qty
                // var net = item.qty * item.price.price
                $('#productList').append(
                    `<div class="col-xs-12">
                    <label class="col-xs-2">${count}</label>
                    <label class="col-xs-4">${item.product.name}</label>
                    <label class="col-xs-2">${item.qty}</label>
                    <label class="col-xs-2">${item.product.price}</label>
                    <label class="col-xs-2">${net}</label>
                    
                  </div>
                  <br>
                  <hr>`
                  
                )
                count++;
            }
        })
    } 

    function getTotal(){
        $.get('/cartTotal',(data)=>{
            $('#total').empty()

            //data.sort((a,b) => a.priority - b.priority)
                // console.log("==="+data.total)
                if(data.total==undefined){
                    alert('Please Login First')
                }
                $('#total').append(
                    `${data.total}`)
                  
            
            
        })
    }

    refreshList()
    getTotal()
    

})