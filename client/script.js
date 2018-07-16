
$(function(){
    var toDo = [];
    $.ajax({
        type:"GET",
        url:"/toDo",
        contentType:"application/json",
        success:function(data)
        {
            toDo = data;
            remake();
        }
    })
    function remake()
    {
        var list = $(".ul");
        $( ".list-item" ).remove();
        $(".i").remove();
        for(i=0;i<toDo.length;i++)
        {
            var li = $("<li>");
            var check= $("<i>");
            //var tick= $("<i>");
            var update=$("<input>");
            update.addClass("iii");
            check.addClass("fas fa-times i");
            //tick.addClass("fas fa-check ii");
            li.addClass("list-item");
            /*
            if(toDo[i].done)
                {
                    tick.addClass("red");
                    li.addClass("cut");
                }
            */
            li.html(toDo[i].title);
            list.append(li);
            li.append(update);
            li.append(check);
            //li.append(tick);
            
        }
    }
    $(".ul").on("keypress", ".iii", function(e) {
        
        if (e.which === 13)
        {
            var i=$( this ).parent().prevAll().length;
            var k=$(this).val()
            console.log(k);
            $.ajax({
                type:"PUT",
                url:"/toDo/" + toDo[i]._id + "/" +k,
                contentType:"application/json",
                success:function(data)
                {
                    toDo[i].title=k;
                    remake();
                }
            })
        }
        });

    $(".ul").on("click", ".ii", function() {
        var i=$( this ).parent().prevAll().length;
        if(toDo[i].done)
            toDo[i].done = false;
        else
            toDo[i].done = true;
        remake();
    });
    $(".ul").on("click", ".i", function() {
        currentItem= $( this ).parent().text();
        var i= $( this ).parent().prevAll().length;

        $.ajax({
            type:"DELETE",
            url:"/toDo/" + toDo[i]._id,
            contentType:"application/json",
            success:function(data)
            {
                toDo.splice(i,1);
                remake();
            }
        });
    });
    $("#button").on("click",function()
    {
        var content = $("#item");
        
        var text={title: content.val()};
        $.ajax({
            type:"POST",
            url:"/toDo",
            contentType:"application/json",
            data: JSON.stringify(text),
            success:function(data)
            {

                toDo.push(data);
                remake();
            }
        })
        content.val("");
        
    });
    
})

