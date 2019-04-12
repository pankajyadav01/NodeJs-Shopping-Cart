
$(()=>{
    var currVendor;
    
    
    function getOptions(){
        $.get('/vendor',(data)=>{
            $('#taskList').empty()

            //data.sort((a,b) => a.priority - b.priority)

            for(let vendor of data){
                $('#vendorOptions').append(
                    `<option value="${vendor.id}">${vendor.name}</option>`
                )
            }
        })
    } 

    refreshList()
    getOptions()
    var x;
    $("#vendorOptions").change(function(){
        
      x = $('#vendorOptions option:selected').val();
       // x =  document.getElementById("#vendorOptions optio").value;
        console.log('the final value is = '+ x)
       });
    $('#addProduct').click(()=>{
        $.post(
            '/product',
            {
                name: $('#name').val(),
                price: $('#price').val(),
                vendor: $('#vendorOptions option:selected').text(),
                qty: $('#qty').val(),
                vendorId: $('#vendorOptions option:selected').val()
            },
            (data)=>{
                if(data.success){
                    refreshList()
                }
            }
        )
    })

})

function refreshList(){
    $.get('/product',(data)=>{
        $('#productList').empty()

        //data.sort((a,b) => a.priority - b.priority)
        var count = 1;
        for(let product of data){
            $('#productList').append(
                `<div class="col-xs-12">
                <label class="col-xs-2">${count}</label>
                <label class="col-xs-7">${product.name}</label>
                <button onclick="deleteProduct(${product.id})" class="col-xs-3">Delete</label>
              </div>
              <br>
              <hr>`
              
            )
            count++;
        }
    })
} 

function deleteProduct(id){
    $.ajax({
        url : '/product/'+id,
        type: 'DELETE',
        success: function(result) {
            console.log(result.success)
            if(result.success){
                
                refreshList()
            }
        }
    })
}