/**
 * @author Danhdds (Danilo Abreu)
 * 
 */

var userId, usersName, userName, userEmail, userAccessToken, characters;

$(() => {

    $('.login-wrap span').on('click', function () {
        $('.login-wrap').css('display', 'none');
        $('.sign-up-wrap').css('display', 'block');
    });

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
                $('.sign-up-wrap').css('display', 'none');
                $('.login-wrap').css('display', 'block');
                console.log(res);
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message)
            }
        }); // end ajax

    });

    const userContentHandler = (accessToken) => {

        $('.home').css('font-weight', 'bold');

        let url = '/user-board';

        $.ajax({
            type: "GET",
            url: url,
            headers: { 'x-access-token': accessToken },
            success: (data) => {
                $('.main-nav').css('display', 'block');
                $('.main-content').html(data);
                home = data;
                getMarvelCharacters();
            },
            error: (err) => {
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    } // end userContentHandler

    const getMarvelCharacters = () => {
        let url = '/get-characters';

        $.ajax({
            type: "GET",
            url: url,
            success: (data) => {
                characters = data.characters;

                for (let i = 0; i < (data.characters).length; i++) {

                    $(".all-characters").append('<li class="placeholder-id">' + data.characters[i].name + '</li>');

                } // end for

                $('.main-search-field').on('focus', function () {

                    $(this).css("border-radius", "6px 6px 0px 0px");
                    $('.all-characters').css("visibility", "visible");
                    
                });

                $('.all-characters li').on('click', function () {
                    $('.main-search-field').val($(this).text());
                    $('.all-characters').css("visibility", "hidden");
                    $('.main-search-field').css("border-radius", "6px 6px 6px 6px");
                });

                $('#get-character-info').on('submit', function (e) {
                    e.preventDefault();
                    getAllCaracterInfo($(this).find("input[name='search']").val());
                });

                console.log(data);
            },
            error: (err) => {
                console.log(err.responseJSON.message);
            }
        }); // end ajax
    }



    /**
     * To avoid synchronous depracated warning on console.... 
     * not using...
     */
    const appendScriprts = () => {

        var jQueryScript = document.createElement("script");
        jQueryScript.src = "/public/js/jquery.js";
        document.body.appendChild(jQueryScript);

        var mainScript = document.createElement("script");
        mainScript.src = "/public/js/main.js";
        document.body.appendChild(mainScript);

    } // appendScriprts

    $('.home').on('click', function() {
        
        userContentHandler(userAccessToken);
        $('.view-favorites').css('font-weight', 'normal');
        $('.edit-user-info').css('font-weight', 'normal');

    });

    $('.edit-user-info').on('click', function(){

        $('.home').css('font-weight', 'normal');
        $('.view-favorites').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');

        let url = '/edit-user';
    
        $.ajax({
            type: "GET",
            url: url,
            headers: { 'x-access-token': userAccessToken },
            success: (data) => {
                $('.main-content').html(data);
                $('input[name="name"]').val(usersName);
                $('input[name="username"]').val(userName);
                $('input[name="email"]').val(userEmail);
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax
    
    });

    $('.view-favorites').on('click', function() {
        
        $('.home').css('font-weight', 'normal');
        $('.edit-user-info').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');

    });

    $('.log-out').on('click', function(){
         window.location.href = '/';
    });

});

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

    if (username !== userName) {
        userCheck = "true";
    }

    if (email !== userEmail) {
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

    //console.log("user check: " + userCheck);

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

} // end updateUser

const getAllCaracterInfo = (character)=>{

    for (let i = 0; i < characters.length; i++){

        if(characters[i].name == character){
            
            $('.character-info').empty();
           
            $('.character-info').append('<div class="description"><b>Nome: </b>'+character+'<br>'+'<b>Descrição: </b>'+ characters[i].description+'</div>');

            for(let x = 0; x < (characters[i].comics.items).length; x++){

                $('.character-info').append('<div class="comic'+x+'"><b>Comic '+(x+1)+': </b>'+characters[i].comics.items[x].name+'<br><button comic-id="'+x+'"comic="'+characters[i].comics.items[x].resourceURI+'" class="button">Obter info</button>'+'</div>');

            } // end if

        } // end if
        
    } // end for

    $('.button').on('click', function(){
       //alert($(this).attr('comic'));

       comicId = $(this).attr('comic-id');

       let body = {
           url: $(this).attr('comic')
       }
        
        let url = '/get-comic';

        $.ajax({
            type: "POST",
            url: url,
            data: body,
            dataType: "json",
            success: (data) => {
                //alert(data.comic[0].description);
                $(this).hide();

                $('.comic'+comicId).append('<img style="width:165px; height: auto" src="'+data.comic[0].images[0].path+'.'+data.comic[0].images[0].extension+'"><br>');

                $('.comic'+comicId).append('<b>Descrição: </b><p>'+data.comic[0].description+'</p><b>Criadores: <br>');

                for(let x = 0; x < (data.comic[0].creators.items).length; x++){

                    $('.comic'+comicId).append('<span>'+data.comic[0].creators.items[x].name+'<span><br>');
    
                } // end if
                
                $('.comic'+comicId).append('<br>');
                
                console.log(data)
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    });
    
} // end getAllCaracterInfo