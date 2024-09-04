function doprev(refFile, prevImg) {
    const [file] = refFile.files;
    if (file) {
        prevImg.src = URL.createObjectURL(file);
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
            url: "/search-email",
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
                $("#inputGender").val(resp[0].gender);
                $("#inputCategory").val(resp[0].category);
                $("#inputFirm").val(resp[0].firm);
                $("#inputWebsite").val(resp[0].website);
                $("#inputAdd").val(resp[0].location);
                $("#inputSince").val(resp[0].since);
               $("#prev").prop("src", "pics/" + resp[0].proofpic);
               $("#inputText").val(resp[0].otherinfo);
                $("#ihdn").val(resp[0].proofpic);  // pic namestored in hidden fild
              }
        }).fail(function (err) {
            alert(err);
        });

    })
})