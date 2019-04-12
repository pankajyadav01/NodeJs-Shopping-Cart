var curruser
$(()=>{
    
    
    refreshList()
    function refreshList(){
        $.get('/product',(data)=>{
            $('#products').empty()
            for(let product of data){
                $('#products').append(

                    `<div class="card card-1">
                    <div id="divN">
                            <a>${product.name}</a>
                    </div>
                    <div id="divN">
                        <a>Rs. ${product.price}</a>
                    </div>
                    <div id="divN">
                        <button onclick="
                            $.post('/cart',{
                                qty:${1},
                                productId:${product.id}
                            })
                        ">Add To Cart</button>
                    
                    </div>
                </div>`
                  
                )
            }
        })
    } 
    
    $('#checkUser').click(()=>{
        $.post(
            '/checkUser',
            {
                username: $('#name').val()
            },
            (data)=>{
                console.log(data)
                curruser = data.username
                refreshList()
                alert()
            }
        )
    })

})