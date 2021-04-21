$(() => {

    $('#login-form').on('submit', function(e){

         e.preventDefault();

         let form = $(this);
         let username = form.find( "input[name='loginUsername']" ).val();
         let password = form.find( "input[name='loginPassword']" ).val();

         let url = '/signin';

         let body = {
            loginUsername: username,
            loginPassword: password
         };

         $.ajax({
            type: "POST",
            url: url,
            data: body,
            dataType:"json",
            success: (res)=>{
                userContentHandler(res.accessToken);
                alert("Usuário:" + res.username);
                console.log(res);
            },
            error: (err)=>{
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

        console.log(name);

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
            headers: { 'x-access-token': accessToken },
            success: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err.responseJSON.message)
            }
        }); // end ajax

    } // end userContentHandler

});
