$(document).ready(function () {
    let user=localStorage.getItem("user");
    $("#active").html(user);
    $("#txtEmail").val(user);
    $("#txtemail").val(user);
    $("#btnLogout").click(function()
   {
     localStorage.removeItem("user");
     location.href="../index.html";
   })




   

   $("#tbtn").click(function () {
       if ($("#txtEmail").val() == "" || $(".nradadd").val() == "" || $("#seltask").val() == "none" || $("#txtAdd").val()=="" || $("#txtCity").val()=="" ||$("#txtdate").val()=="" || $("#txttask").val()=="" ) {
           alert("Please Fill All the values");
       }
       else {
           let obj = {
               type: "get",
               url: "/task-save",
               data: {
                   kuchEmail: $("#txtEmail").val(),
                   kuchCategory:$("#seltask").val(),
                   kuchAddress:$("#txtAdd").val(),
                   kuchCity:$("#txtCity").val(),
                   kuchDate:$("#txtdate").val(),
                   kuchTask:$("#txttask").val()
                   
               }
           }
           $.ajax(obj).done(function (resp) {
               alert(resp);

           }).fail(function (err) {
               alert(err);
           })


       }

   })
   $("#radhome").click(function()
   {
       if($("#txtAdd").prop("disabled")==false && $("#txtCity").prop("disabled")==false)
       {
           $("#txtAdd").prop("disabled",true);
           $("#txtCity").prop("disabled",true);
       }
       let obj={
           type:"get",
           url:"/fetchadd",
           data:{
               kuchEmail:$("#txtEmail").val()

           }
       }
           $.ajax(obj).done(function(resp)
           {
               $("#txtAdd").val(resp[0].address);
               $("#txtCity").val(resp[0].city);

           }).fail(function(err)
           {
               alert(err);
           })

       
   })
   $("#radother").click(function()
   {
       $("#txtAdd").prop("disabled",false);
       $("#txtCity").prop("disabled",false);
       $("#txtAdd").val("");
       $("#txtCity").val("");


   })
   $("#stbtn").click(function()
   {
       if ($("#txtemail").val() == "" || $("#txtold").val() == "" || $("#txtnew").val() == ""  ) {
           alert("Please Fill All the values");
       }
       let obj={
           type:"get",
           url:"/passwordchange",
           data:{
                   kuchpwd:$("#txtnew").val(),
                   kucheml:$("#txtemail").val()
           }
       }
       $.ajax(obj).done(function(resp)
       {
           alert(resp);
       }).fail(function(err)
       {
             alert(err);
       })
   })
  

})