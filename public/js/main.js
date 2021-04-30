/**
 * @author Danhdds (Danilo Abreu)
 * 
 */

var userId, usersName, userName, userEmail, userAccessToken, home, characters, comics;

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
                fictionalCharactersBoard(res.accessToken);
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

    const fictionalCharactersBoard = (accessToken) => {

        $('.home').css('font-weight', 'bold');

        let url = '/user-board-characters';

        $.ajax({
            type: "GET",
            url: url,
            headers: { 'x-access-token': accessToken },
            success: (data) => {
                $('.main-nav').css('display', 'block');
                $('.main-content').html(data);
                getMarvelCharacters();
                home = data;
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    } // end fictionalCharactersBoard

    const comicsBoard = (accessToken) => {

        let url = '/user-board-comics';

        $.ajax({
            type: "GET",
            url: url,
            headers: { 'x-access-token': accessToken },
            success: (data) => {

                $('.main-content').html(data);
                comics = data;
                getMarvelComics();
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    } // end comicsBoard

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

                $('.main-search-field').prop("disabled", false);
                $('.main-search-field').attr("placeholder", "Pronto, pode buscar um character...");
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

    const getMarvelComics = () => {

        let url = '/get-comics';

        $.ajax({
            type: "GET",
            url: url,
            success: (data) => {

                comics = data.comics;

                console.log(data);
                //console.log("comics length: "+(data.comics).length);
                for (let i = 0; i < (data.comics).length; i++) {

                    $(".all-comics").append('<li class="placeholder-id">' + data.comics[i].title + '</li>');

                } // end for

                $('.main-search-field').prop("disabled", false);
                $('.main-search-field').attr("placeholder", "Pronto, pode buscar um character...");

                $('.main-search-field').on('focus', function () {

                    $(this).css("border-radius", "6px 6px 0px 0px");
                    $('.all-comics').css("visibility", "visible");

                });

                $('.all-comics li').on('click', function () {
                    $('.main-search-field').val($(this).text());
                    $('.all-comics').css("visibility", "hidden");
                    $('.main-search-field').css("border-radius", "6px 6px 6px 6px");
                });

                $('#get-comic-info').on('submit', function (e) {
                    e.preventDefault();
                    getAllComicInfo($(this).find("input[name='search']").val());
                });

                //console.log("Title: "+data.comics[0].title);
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

    $('.home').on('click', function () {

        fictionalCharactersBoard(userAccessToken);
        $('.comics').css('font-weight', 'normal');
        $('.view-favorites').css('font-weight', 'normal');
        $('.edit-user-info').css('font-weight', 'normal');

    });

    $('.edit-user-info').on('click', function () {

        $('.home').css('font-weight', 'normal');
        $('.comics').css('font-weight', 'normal');
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

    $('.comics').on('click', function () {

        comicsBoard(userAccessToken);
        $('.home').css('font-weight', 'normal');
        $('.view-favorites').css('font-weight', 'normal');
        $('.edit-user-info').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');

    });

    $('.view-favorites').on('click', function () {

        $('.home').css('font-weight', 'normal');
        $('.comics').css('font-weight', 'normal');
        $('.edit-user-info').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');

        let url = '/favorites';

        $.ajax({
            type: "GET",
            url: url,
            headers: { 'x-access-token': userAccessToken },
            success: (data) => {
                $('.main-content').html(data);
                //console.log(data)
                $('.show-char-fav').on('click', function () {
                    getUserFavCharacters();
                });
                $('.show-com-fav').on('click', function () {
                    getUserFavComics()
                });
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    });

    $('.log-out').on('click', function () {
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
        type: "PUT",
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

const getAllCaracterInfo = (character) => {

    let potentialFavorite;

    for (let i = 0; i < characters.length; i++) {

        if (characters[i].name == character) {

            potentialFavorite = characters[i];

            $('.character-info').empty();

            $('.character-info').append('<div class="description"><b>Nome: </b>' + character + '<br>' + '<b>Descrição: </b>' + characters[i].description + '</div><button class="add-to-fav">Adicionar aos favoritos</button><br>');

            for (let x = 0; x < (characters[i].comics.items).length; x++) {

                $('.character-info').append('<div class="comic' + x + '"><b>Comic ' + (x + 1) + ': </b>' + characters[i].comics.items[x].name + '<br><button comic-id="' + x + '"comic="' + characters[i].comics.items[x].resourceURI + '" class="button">Obter info</button>' + '</div>');

            } // end if

        } // end if

    } // end for

    $('.add-to-fav').on('click', function () {

        let body = {
            id: userId,
            character: potentialFavorite
        }

        let url = '/add-character-tofav';

        $.ajax({
            type: "POST",
            url: url,
            data: body,
            dataType: "json",
            headers: { 'x-access-token': userAccessToken },
            success: (res) => {
                alert(res.message);
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    });

    $('.button').on('click', function () {
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

                $('.comic' + comicId).append('<img style="width:165px; height: auto" src="' + data.comic[0].images[0].path + '.' + data.comic[0].images[0].extension + '"><br>');

                $('.comic' + comicId).append('<b>Descrição: </b><p>' + data.comic[0].description + '</p><b>Criadores: </b><br>');

                for (let x = 0; x < (data.comic[0].creators.items).length; x++) {

                    $('.comic' + comicId).append('<span>' + data.comic[0].creators.items[x].name + '<span><br>');

                } // end if

                $('.comic' + comicId).append('<br>');

                console.log(data)
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    });

} // end getAllCaracterInfo

const getAllComicInfo = (comic) => {

    let potentialFavorite;

    for (let i = 0; i < comics.length; i++) {

        if (comics[i].title == comic) {

            potentialFavorite = comics[i];

            $('.comic-info').empty();

            $('.comic-info').append('<div class="description"><b>Comic: </b>' + comic + '<br>');
            if (comics[i].images[0] != undefined)
                $('.comic-info').append('<img style="width:165px; height: auto" src="' + comics[i].images[0].path + '.' + comics[i].images[0].extension + '"><br>');
            $('.comic-info').append('<b>Descrição: </b>' + comics[i].description + '</div><br><b>Criadores: </b><br>');

            for (let x = 0; x < (comics[i].creators.items).length; x++) {

                $('.comic-info').append('<span>' + comics[i].creators.items[x].name + '<span><br>');

            } // end if

            $('.comic-info').append('<button class="add-to-fav">Adicionar aos favoritos</button><br>');

            for (let x = 0; x < (comics[i].characters.items).length; x++) {

                $('.comic-info').append('<div class="character' + x + '"><b>Character ' + (x + 1) + ': </b>' + comics[i].characters.items[x].name + '<br><button character-id="' + x + '" character="' + comics[i].characters.items[x].resourceURI + '" class="button">Obter info</button>' + '</div>');

            } // end if

        } // end if

    } // end for

    $('.add-to-fav').on('click', function () {

        let body = {
            id: userId,
            comic: potentialFavorite
        }

        let url = '/add-comic-tofav';

        $.ajax({
            type: "POST",
            url: url,
            data: body,
            dataType: "json",
            headers: { 'x-access-token': userAccessToken },
            success: (res) => {
                alert(res.message);
            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    });

    $('.button').on('click', function () {

        characterId = $(this).attr('character-id');

        let body = {
            url: $(this).attr('character')
        }

        let url = '/get-character';

        $.ajax({
            type: "POST",
            url: url,
            data: body,
            dataType: "json",
            success: (data) => {

                $(this).hide();

                $('.character' + characterId).append('<b>Nome: </b><p>' + data.character[0].name + '</p><b>Descrição: </b><br><span>' + data.character[0].description + '</span><br>');

                //console.log("Single character :"+JSON.stringify(data));
                //console.log(data.character[0])

            },
            error: (err) => {
                alert(err.responseJSON.message);
                console.log(err.responseJSON.message);
            }
        }); // end ajax

    });

} // end getAllComicInfo

const getUserFavCharacters = () => {

    let url = '/user-fav-chars';

    let body = {
        id: userId
    };

    $.ajax({
        type: "POST",
        url: url,
        data: body,
        dataType: "json",
        headers: { 'x-access-token': userAccessToken },
        success: (data) => {
            $('.show-char-fav').hide();
            $('.show-com-fav').hide();
            for (let i = 0; i < (data.characters).length; i++) {
                $('.favorite-content').append('<b>Nome: </b><p>' + data.characters[i].name + '</p><b>Descrição: </b><br><span>' + data.characters[i].description + '</span><br><b>Comics: </b><br>');
                
                if (data.characters[i].comics.items != undefined) {
                    for (let x = 0; x < (data.characters[i].comics.items).length; x++) {
                        $('.favorite-content').append('<span>' + data.characters[i].comics.items[x].name + '</span><br>');
                    }
                }

                $('.favorite-content').append('<br>');
            } // end for
            //console.log("User fav chars: "+JSON.stringify(data));
        },
        error: (err) => {
            alert(err.responseJSON.message);
            console.log(err.responseJSON.message)
        }
    }); // end ajax

} // end getUserFavCharacters

const getUserFavComics = () => {

    let url = '/user-fav-comics';

    let body = {
        id: userId
    };

    $.ajax({
        type: "POST",
        url: url,
        data: body,
        dataType: "json",
        headers: { 'x-access-token': userAccessToken },
        success: (data) => {
            $('.show-char-fav').hide();
            $('.show-com-fav').hide();
            for (let i = 0; i < (data.comics).length; i++) {

                $('.favorite-content').append('<b>Comic: </b><p>' + data.comics[i].title + '</p><br>');
                if (data.comics[i].images[0] != undefined)
                    $('.favorite-content').append('<img style="width:165px; height: auto" src="' + data.comics[i].images[0].path + '.' + data.comics[i].images[0].extension + '"><br>');
                $('.favorite-content').append('<b>Descrição: </b><br><span>' + data.comics[i].description + '</span><br><b>Criadores: </b></br>');

                if (data.comics[i].creators.items != undefined) {
                    for (let j = 0; j < (data.comics[i].creators.items).length; j++) {
                        $('.favorite-content').append('<span>' + data.comics[i].creators.items[j].name + '</span><br>');
                    }
                }

                $('.favorite-content').append('<b>Characters:</b><br>');

                if (data.comics[i].characters.items != undefined) {
                    for (let x = 0; x < (data.comics[i].characters.items).length; x++) {
                        $('.favorite-content').append('<span>' + data.comics[i].characters.items[x].name + '</span><br>');
                    }
                }

                $('.favorite-content').append('<br>');

            } // end for
            //console.log("User fav coms :"+ JSON.stringify(data));
        },
        error: (err) => {
            alert(err.responseJSON.message);
            console.log(err.responseJSON.message)
        }
    }); // end ajax

} // getUserFavComics