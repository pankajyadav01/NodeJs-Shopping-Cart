$(()=>{
    var currVendor;
    

    refreshList()
    $('#addVendor').click(()=>{
        $.post(
            '/vendor',
            {
                name: $('#name').val(),
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
    $.get('/vendor',(data)=>{
        $('#vendorList').empty()

        //data.sort((a,b) => a.priority - b.priority)

        var count = 1;
        for(let vendor of data){
            $('#vendorList').append(
                `<div class="col-xs-12">
                <label class="col-xs-2">${count}</label>
                <label class="col-xs-7">${vendor.name}</label>
                <button onclick="deleteVendor(${vendor.id})"  class="col-xs-3">Delete</button>
              </div>
              <br>
              <hr>`
              
            )
            count++;
        }
    })
} 

function deleteVendor(id){
    $.ajax({
        url : '/vendor/'+id,
        type: 'DELETE',
        success: function(result) {
            console.log(result.success)
            if(result.success){
                
               refreshList()
            }
        }
    })
}