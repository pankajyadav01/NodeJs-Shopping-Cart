var curruser
$(()=>{
    
    checkLogin()
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
                checkLogin()
            }
        )
    })
    $('#logout').click(()=>{
        $.post(
            '/logout',
            (data)=>{
                if(data.success){
                    checkLogin()
                }
            }
        )
    })

    function checkLogin(){
    
        $.get('/login',(data)=>{
            if(data.success){
                $('#form1').hide()
                $('#form2').show()
                console.log(data.message)
                if(data.message!=null){
                    $('#msg').text("Welcome "+data.message)
                }
                
            }
            else{
                console.log('here')
                $('#form1').show()
                $('#form2').hide()
            }
        })
    }

})

