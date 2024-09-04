function doprev(refFile, prevImg) {
    const [file] = refFile.files;
    if (file) {
        prevImg.src = URL.createObjectURL(file);
    }
}
function doit(ref, svbtn, mdbtn) {
    if (ref.checked) {
        document.querySelector("#svbtn").disabled = false;
        document.querySelector("#mdbtn").disabled = false;
    }
    else {
        document.querySelector("#svbtn").disabled = true;
        document.querySelector("#mdbtn").disabled = true;
    }
}

$(document).ready(function () {
    
    let user=localStorage.getItem("user");
     $("#inputEmail").val(user);
    

    $("#searchbtn").click(function () {
        if ($("#inputEmail").val() == "") {
            alert("Fill email");
        }
        let obj = {
            type: "get",  //by default get
            url: "/check-email",
            data: {
                kuchEmail: $("#inputEmail").val()
            }

        }
        $.ajax(obj).done(function (resp) {

            if (resp == "Not Present") {
                $("#errEmail").html(resp).addClass("not-ok");
            }
            else {
                $("#inputName").val(resp[0].name);
                $("#inputContact").val(resp[0].contact);
                $("#inputAddress").val(resp[0].address);
                $("#inputCity").val(resp[0].city);
                $("#inputState").val(resp[0].state);
                $("#prev").prop("src", "pics/" + resp[0].ppic);
                $("#ihdn").val(resp[0].ppic);  // pic namestored in hidden fild

            }
        }).fail(function (err) {
            alert(err);
        });

    })
})