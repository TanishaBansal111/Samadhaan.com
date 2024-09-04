$(document).ready(function () {                                      // blur -after 
    $("#txtEmail").keyup(function ()     //keydown - The key is on its way down
    {                                   //keyup - The key is released
      var email = $("#txtEmail").val();
      var r = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (r.test(email) == false) {
        $("#errEmail").html("Invalid").addClass("not-ok").removeClass("ok");
      }
      else {
        $("#errEmail").html("Valid").addClass("ok").removeClass("not-ok");
      }
    });
  
    $("#txtPass").keyup(function () {
      let pass = $("#txtPass").val();
  
      var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  
      if (r.test(pass) == false) {
        $("#errPass").html("Invalid").addClass("not-ok").removeClass("ok");
      }
      else {
        $("#errPass").html("Valid").addClass("ok").removeClass("not-ok");
      }
  
    });
  
    $("#sbtn").click(function () {
      if ($("#txtEmail").val() == "" || $("#txtPass").val() == "" || $("#seluser").val() == "none") {
        alert("Please Fill All the values");
      }
      else if ($("#errEmail").html() == "Invalid" || $("#errPass").html() == "Invalid") {
        alert("Please fill valid data")
      }
      else {
        let obj = {
          type: "get",
          url: "/profile-save",
          data: {
            kuchEmail: $("#txtEmail").val(),
            kuchPass: $("#txtPass").val(),
            kuchUser: $("#seluser").val()
          }
        }
        $.ajax(obj).done(function (resp) {
          $("#stat").html(resp);
  
        }).fail(function (err) {
          $("#stat").html(err);
        })
  
  
      }
  
    })
  
    $("#txtEmail").blur(function () {
      {
        let obj = {
          type: "get",
          url: "/chkav",
          data: {
            kuchEmail: $("#txtEmail").val()
          }
        }
        $.ajax(obj).done(function (resp) {
          $("#ava").html(resp);
          if (resp == "Not available") {
            $("#ava").removeClass("ava").addClass("not-ava");
          }
          else {
            $("#ava").addClass("ava").removeClass("not-ava");
          }
        }).fail(function (err) {
          $("#ava").html(err);
        })
  
      }
    })
  
     $(".fa-solid").mousedown(function () {
      $("#txtPass").prop("type", "text");
      $("#ltxtPass").prop("type", "text");
      $(".fa-solid").addClass("fa-eye").removeClass("fa-eye-slash");
      });
     $(".fa-solid").mouseup(function () {
  
      $("#txtPass").prop("type", "password");
      $("#ltxtPass").prop("type", "password");
      $(".fa-solid").addClass("fa-eye-slash").removeClass("fa-eye");
    } );
    
    $("#lbtn").click(function()
    {
      if ($("#ltxtEmail").val() == "" || $("#ltxtPass").val() == "") {
        alert("Please Fill All the values");
      }
      else
      {
      let obj={
        url: "/check-login",
        type: "post",        // also write get here
        data:{
          email:$("#ltxtEmail").val(),
          pass:$("#ltxtPass").val()
          }
      }
      $.ajax(obj).done(function(resp)
      {
        if(resp=="Customer")
        {
           localStorage.setItem("user",$("#ltxtEmail").val());
            location.href="Customer-Dash.html";
        }
        else if(resp=="Service Provider")
        {
           localStorage.setItem("user",$("#ltxtEmail").val());
            location.href="Service-Provider_Dash.html";
        }
  
      }).fail(function(err)
      {
         alert("Error="+ err);
      });
    }
  
    })
  
  });
  
  