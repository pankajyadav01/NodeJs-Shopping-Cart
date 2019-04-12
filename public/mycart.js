$(()=>{
    var currVendor;
    function refreshList(){
        $.get('/cart',(data)=>{
            $('#productList').empty()

            //data.sort((a,b) => a.priority - b.priority)

            var count = 1;
            for(let product of data){
                $('#productList').append(
                    `<div class="col-xs-12">
                    <label class="col-xs-4">${count}</label>
                    <label class="col-xs-4">${product.name}</label>
                    <label class="col-xs-4">${product.qty}</label>
                    
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
                console.log(data.total)
                $('#total').append(
                    `${data.total}`)
                  
            
            
        })
    }

    refreshList()
    getTotal()
    

})