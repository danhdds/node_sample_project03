/**
 * @author Danhdds (Danilo Abreu)
 * 
 */

var userId, usersName, userName, userEmail, userAccessToken;

$(() => {

    $('#login-form').on('submit', function (e) {

        e.preventDefault();

        let form = $(this);
        let username = form.find("input[name='loginUsername']").val();
        let password = form.find("input[name='loginPassword']").val();

        let url = '/signin';

        let body = {
            loginUsername: username,
            loginPassword: password
        };

        $.ajax({
            type: "POST",
            url: url,
            data: body,
            dataType: "json",
            success: (res) => {
                userContentHandler(res.accessToken);
                userId = res.id;
                usersName = res.name;
                userName = res.username;
                userEmail = res.email;
                userAccessToken = res.accessToken;
                alert("Seja bem vindo " + res.username);
                console.log(res);
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message)
            }
        }); // end ajax

    }); // end #login-form

    $('#sign-up-form').on('submit', function (e) {

        e.preventDefault();

        let form = $(this);
        let name = form.find("input[name='name']").val();
        let username = form.find("input[name='username']").val();
        let email = form.find("input[name='email']").val();
        let password = form.find("input[name='password']").val();

        //console.log(name);

        let url = '/signup';

        let body = {
            name: name,
            username: username,
            email: email,
            password: password
        };

        $.ajax({
            type: "POST",
            url: url,
            data: body,
            dataType: "json",
            success: (res) => {
                alert(res.message);
                console.log(res);
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message)
            }
        }); // end ajax

    });

    const userContentHandler = (accessToken) => {

        let url = '/user-board';

        $.ajax({
            type: "GET",
            url: url,
            async: true,
            headers: { 'x-access-token': accessToken },
            success: (data) => {
                $(".container").html(data);
            },
            error: (err) => {
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    } // end userContentHandler

    /**
     * To avoid synchronous depracated warning on console.... 
     */
    const appendScriprts = () => {

        var jQueryScript = document.createElement("script");
        jQueryScript.src = "/public/js/jquery.js";
        document.body.appendChild(jQueryScript);

        var mainScript = document.createElement("script");
        mainScript.src = "/public/js/main.js";
        document.body.appendChild(mainScript);

    } // appendScriprts

});


const editUser = () => {

    let url = '/edit-user';

    $.ajax({
        type: "GET",
        url: url,
        headers: { 'x-access-token': userAccessToken },
        success: (data) => {
            $('.container').html(data);
            $('input[name="name"]').val(usersName);
            $('input[name="username"]').val(userName);
            $('input[name="email"]').val(userEmail);
        },
        error: (err) => {
            console.log(err.responseJSON.message);
        }
    }); // end ajax

};

const updateUser = (event) => {

    event.preventDefault();

    let form = $('#update-form');
    let name = form.find("input[name='name']").val();
    let username = form.find("input[name='username']").val();
    let email = form.find("input[name='email']").val();
    let password = form.find("input[name='password']").val();

    // for username and email checking
    let userCheck = "false";
    let emailCheck = "false";

    if(username !== userName){
       userCheck = "true";
    }

    if(email !== userEmail){
       emailCheck = "true";
    }

    let body = {
        id: userId,
        name: name,
        username: username,
        email: email,
        password: password,
        usercheck: userCheck,
        emailcheck: emailCheck
    };

    console.log("user check: "+userCheck);

    let url = '/edit-user';

    $.ajax({
        type: "POST",
        url: url,
        data: body,
        dataType: "json",
        headers: { 'x-access-token': userAccessToken },
        success: (res) => {
            alert(res.message);
            usersName = name;
            userName = username; 
            userEmail = email;
            console.log(res)
        },
        error: (err) => {
            alert(err.responseJSON.message);
            console.log(err.responseJSON.message);
        }
    }); // end ajax

}