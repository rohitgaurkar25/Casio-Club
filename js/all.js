$('.index-link').on('click', function(e) {
    e.preventDefault();
    var getrel = $(this).attr('rel');
    var getoffset = $('#' + getrel).offset().top - $("#teenpatti .header_bg_color").height();
    $('body,html').animate({
        'scrollTop': getoffset + 'px'
    }, 1000)
})
/*var videos = document.querySelectorAll('.features_video video');
for(var i=0; i<videos.length; i++)
   videos[i].addEventListener('play', function(){pauseAll(this)}, true);

function pauseAll(elem){
    for(var i=0; i<videos.length; i++){
        //Is this the one we want to play?
        if(videos[i] == elem) continue;
        //Have we already played it && is it already paused?
        if(videos[i].played.length > 0 && !videos[i].paused){
        // Then pause it now
          videos[i].pause();
        }
    }
  }*/
/*$(document).ready(function(){
      var player, playing = false;
    var videos = document.querySelectorAll('.features_video iframe');
        for(var i=0; i<videos.length; i++)
            console.log("videos",i,"length",videos.length)
        $('.video_groups').each(function(index) {
             $(this).attr('src', $(this).attr('src'));
             return false;
      });
})
*/
$(document).ready(function() {
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});
var player;

function onYouTubeIframeAPIReady() {
    home_banner = new YT.Player('home_banner', {
        videoId: 'llnxNv27jRY',
        playerVars: {
            rel: 0,
            autoplay: 1,
            loop: 1,
            showinfo: 0,
            autohide: 1,
            modestbranding: 1,
            host: 'https://youtube.com',
            enablejsapi: 1,
            playlist: 'llnxNv27jRY',
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
    home_dealer = new YT.Player('home_dealer', {
        videoId: 'r9jR2FU0WlI',
        playerVars: {
            rel: 0,
            enablejsapi: 1,
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
    feature_player1 = new YT.Player('feature_player1', {
        videoId: 'V2Nhtom2LTE',
        playerVars: {
            rel: 0,
            enablejsapi: 1,
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
    feature_player2 = new YT.Player('feature_player2', {
        videoId: 'NgnjuMYerJc',
        playerVars: {
            rel: 0,
            enablejsapi: 1,
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        stopVideo(event.target.a.id);
    }

}

function stopVideo(player_id) {
    if (player_id == "feature_player1") {
        feature_player2.stopVideo();
    } else if (player_id == "feature_player2") {
        feature_player1.stopVideo();
    }
    if (player_id == "home_banner") {
        home_dealer.stopVideo();
    } else if (player_id == "home_dealer") {
        home_banner.stopVideo();
    }
}


/*$(document).on("click",".features_video  a.video_play_btn ",function(){
    
    var video =$(this).parent(".features_video").find(".video").get(0);
    
   for(var i = 0; i < $('.features_video video').length; i++){
    var video_pause = $(".features_video").find(".video").get(i);
    video_pause.pause();    
    $("a.video_pause_btn").not(this).css("display","none");
    $("a.video_play_btn").not(this).removeClass("active");
   }

   $(this).parent(".features_video").find("a.video_play_btn").addClass("active");
    video.play();
    $(this).parent(".features_video").find("a.video_pause_btn").css("display","block");

})
$(document).on("click",".features_video  a.video_pause_btn",function(){
     var video =$(this).parent(".features_video").find(".video").get(0);

     video.pause();

     $(this).parent(".features_video").find("a.video_play_btn").removeClass("active");
     $(this).parent(".features_video").find("a.video_pause_btn").removeClass("active");    
     $(this).parent(".features_video").find("a.video_pause_btn").css("display","none");     

})*/


$(document).ready(function() {})
var hasvalue = window.location.hash
if (hasvalue != '') {
    var hashoffsetID = $(hasvalue).offset().top - $("#teenpatti .header_bg_color").height();
    if (hashoffsetID) {
        $('body,html').animate({
            'scrollTop': hashoffsetID + 'px'
        }, 1500)
    }
}

/*custom js*/
var flag;
var flagscreen;
var flagtest;
var datarates;
var dataplan;
var spinner_data;
var siteMainTimer;
(function($) {
    "use strict";

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscription-success').html('<span class="icon_check_alt2"></span>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
        } else if (resp.result === 'error') {
            $('.subscription-error').html('<span class="icon_close_alt2"></span>' + resp.msg).fadeIn(1000);
        }
    }

    $('.game_icon a').on('click', function() {
        socialplay();
    });
    mainNav();
    getMobileOperatingSystem();
    $(window).scroll(function() {
        if ($(window).width() > 480) {
            mainNav();
        }
    });

    function socialplay() {
        if ($('.social_network_part').hasClass('open')) {
            $('.social_network_part').removeClass('open');
        } else {
            $('.social_network_part').addClass('open');
        }
    }

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40 && flag) {
            $('.sticky-navigation').stop().animate({
                "opacity": '1',
                "top": '0'
            });
            socialplay();
            $('.social_network_part').addClass('open');
            flag = false;
        } else if (top < 40 && !flag) {
            $('.sticky-navigation').stop().animate({
                "opacity": '1',
                "top": '0'
            });
            $('.social_network_part').removeClass('open');
            flag = true;
        }
    }

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/android/i.test(userAgent)) {
            $('.link_btm_button').attr('href', 'https://play.google.com/store/apps/details?id=com.teenpattithreecardspoker');
            $('.playnow_inner .game_link').attr('href', 'https://play.google.com/store/apps/details?id=com.teenpattithreecardspoker');
            console.log('Android Phone');
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            $('.link_btm_button').attr('href', 'https://itunes.apple.com/us/app/teen-patti-three-cards-poker/id824748752');
            $('.playnow_inner .game_link').attr('href', 'https://itunes.apple.com/us/app/teen-patti-three-cards-poker/id824748752');
            console.log('iOS Phone');
            return "iOS";

        }
        return "unknown";
    }
    /*$(".twitter_popup").click(function(){
        var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1';
        
        window.open(url, 'twitter', opts);
        return false;
    });*/


    // var socket = io.connect('https://live.gamewithpals.com:3001');
    //proto/host/port


    //var socket = io.connect('https://tp.gamewithpals.com:4020');
    var socket = io.connect("" + urls + "");
    socket_connect('CWS', jQuery('.client_idss').val());
    //alert(urls);

    function socket_connect(en, data) {
        socket.emit('req', {
            en: en,
            data: data
        })
    }

    function spinner_call(en, data) {
        socket.emit('req', {
            en: en,
            data: data
        })
    }

    function spinner_end(en, data) {
        socket.emit('req', {
            en: en,
            data: data
        })
    }
    //spinner_call('GSDW', { spinner_id: '1', ispreview: 1 });
    socket.on('resw', function(data) {

        console.log(data);
        spinner_data = data;
        if (typeof(data) == 'object') {
            if (data.en == 'GSRW') {
                console.log("GSRW data -->", data)
                var add_rewards = 0;
                if (data.data.item2 == "chips") {
                    add_rewards = data.data.extra;

                    console.log(add_rewards);
                    console.log(parseInt(jQuery('.user_chips').text().replace(/,/g, '')));
                    console.log(parseInt(jQuery('.user_chips').text().replace(/,/g, '')) + add_rewards);
                    jQuery('.user_chips').text(inr_currency(parseInt(jQuery('.user_chips').text().replace(/,/g, '')) + add_rewards));
                    $("#user_chips_image").effect("shake", 5000);
                } else if (data.data.item2 == "diamonds") {
                    add_rewards = data.data.extra;

                    console.log(add_rewards);
                    console.log(parseInt(jQuery('.user_diamonds').text().replace(/,/g, '')));
                    console.log(parseInt(jQuery('.user_diamonds').text().replace(/,/g, '')) + add_rewards);

                    jQuery('.user_diamonds').text(inr_currency(parseInt(jQuery('.user_diamonds').text().replace(/,/g, '')) + add_rewards));

                    $("#user_diamonds_image").effect("shake", 5000);
                }
                $('.success_message_popup p').text(spinner_data.dialogTitle);
                $('.success_message_popup h3').text(spinner_data.msg);
                jQuery(".success_message_popup").fadeIn("slow");
                //setTimeout(function() { $('.popup_custom').hide(); }, 10000);

            }
            if (data.en == 'GSDW') {
                popup_call(data);
            }
            if (data.en == 'UOT') {
                clearInterval(siteMainTimer);
                if (data.data.Timer <= 0) {
                    jQuery('.special_offer_blance_block').parents('.col-xs-12').remove();
                    return false;
                }
                time_offers(data.data.Timer, data.data.BlinkTimer);
            }
            if (data.en == 'UOSC') {
                console.log('ffdfd');
                sold_stock(data.data.Stock, data.data.Sold);
            }
        }

    });

    function inr_currency(x) {
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res
    }

    /* animation */
    /*
    function runEffect() {
        // get effect type from
        var selectedEffect = $( "#effectTypes" ).val();
 
        // Most effect types need no options passed by default
        var options = {};
        // some effects have required parameters
        options = { to: "#button", className: "ui-effects-transfer" };
      
        // Run the effect
        $( "#effect" ).effect( selectedEffect, options, 500, callback );
    };
 
    // Callback function to bring a hidden box back
    function callback() {
      setTimeout(function() {
        $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
      }, 1000 );
    };
      */

    $('.special_offer_blance_block_img').each(function() {
        // console.log('===========>',$(this).attr('data-timer'));
        var data = $(this).parents('.col-xs-12');
        setTimeout(function() {
            console.log(data);
            data.remove();
        }, ($(this).attr('data-timer') * 1000));
    });

    function popup_call(data) {
        spinner_data = data;
        $('.header_spinner_popup p').text(data.data.Header);
        $('.pointer_button').attr('src', 'https://tp-game-uploads.s3.amazonaws.com/' + data.data.SpinnerArrow +
            '');
        $('.spinbutton').attr('src', 'https://tp-game-uploads.s3.amazonaws.com/' + data.data.SpinnerButton +
            '');
        $('#rotate_spin_img').attr('src', 'https://tp-game-uploads.s3.amazonaws.com/' + data.data.SpinnerImage +
            '');
        $('#rotate_spin_img').css('transform', 'rotate(0deg)');
        /* $('.preloader3').show();*/
        $("#rotate_spin_img").load(function() {
            $('.preloader3').hide();
            $('.popup_custom').show();
        });

    }

    function time_offers(sitetimer, BlinkTimer) {

        //console.log(sitetimer, BlinkTimer);
        var sitei = sitetimer;
        // var i = timer;
        siteMainTimer = setInterval(function() {
            if (sitei > 0) {
                var siteseconds = SecondsTohhmmss(Number(sitei));
                // console.log(siteseconds);
                if (sitei <= BlinkTimer) {
                    $('#sitet1,#sitet2,#sitet3,#sitet4,#t1,#t2,#t3,#t4').addClass('active_blink');
                }
                if (sitei >= 600) {
                    if (document.getElementById("sitet1")) {
                        document.getElementById("sitet1").innerHTML = siteseconds.split(':')[0][0];
                        document.getElementById("sitet2").innerHTML = siteseconds.split(':')[0][1];
                        document.getElementById("sitet3").innerHTML = siteseconds.split(':')[1][0];
                        document.getElementById("sitet4").innerHTML = siteseconds.split(':')[1][1];
                        document.getElementById("siteth1").innerHTML = 'Hrs';
                        document.getElementById("siteth2").innerHTML = 'Min';
                    } else {
                        clearInterval(siteMainTimer);
                    }
                    if (document.getElementById("t1")) {
                        document.getElementById("t1").innerHTML = siteseconds.split(':')[0][0];
                        document.getElementById("t2").innerHTML = siteseconds.split(':')[0][1];
                        document.getElementById("t3").innerHTML = siteseconds.split(':')[1][0];
                        document.getElementById("t4").innerHTML = siteseconds.split(':')[1][1];
                        document.getElementById("th1").innerHTML = 'Hrs';
                        document.getElementById("th2").innerHTML = 'Min';
                    }
                } else {
                    if (document.getElementById("sitet1")) {
                        document.getElementById("sitet1").innerHTML = siteseconds.split(':')[1][0];
                        document.getElementById("sitet2").innerHTML = siteseconds.split(':')[1][1];
                        document.getElementById("sitet3").innerHTML = siteseconds.split(':')[2][0];
                        document.getElementById("sitet4").innerHTML = siteseconds.split(':')[2][1];
                        document.getElementById("siteth1").innerHTML = 'Min';
                        document.getElementById("siteth2").innerHTML = 'Sec';
                    } else {
                        clearInterval(siteMainTimer);
                    }
                    if (document.getElementById("t1")) {
                        document.getElementById("t1").innerHTML = siteseconds.split(':')[1][0];
                        document.getElementById("t2").innerHTML = siteseconds.split(':')[1][1];
                        document.getElementById("t3").innerHTML = siteseconds.split(':')[2][0];
                        document.getElementById("t4").innerHTML = siteseconds.split(':')[2][1];
                        document.getElementById("th1").innerHTML = 'Min';
                        document.getElementById("th2").innerHTML = 'Sec';
                    }
                }
                sitei--;
            } else {
                clearInterval(siteMainTimer);
                $('.site_time_offers').parents('.col-xs-12').remove();
            }
        }, 1000);
    }
    var SecondsTohhmmss = function(totalSeconds, hhmm) {
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

        // round seconds
        seconds = Math.round(seconds * 100) / 100

        var result = (hours < 10 ? "0" + hours : hours);
        result += ":" + (minutes < 10 ? "0" + minutes : minutes);
        result += ":" + (seconds < 10 ? "0" + seconds : seconds);
        return result;
    }

    function sold_stock(total, sold) {
        var percentage = Math.round(sold / (total / 100));
        $('.white_progress,.sub_progress').css('width', '' + percentage + '%');
        $('.progress_popup_parents p,.progress_bar p').html(+percentage + '% Claimed');
        if (percentage == 100) {
            $('.progress_popup_parents').parents('.col-xs-12').remove();
        }
        // console.log(percentage);
    }
    if (document.getElementById("total_stock")) {
        sold_stock(document.getElementById("total_stock").value, document.getElementById("sold_stock").value);
    }
    if (document.getElementById("time_offers")) {
        time_offers(document.getElementById("time_offers").value, $('.site_time_offers').attr('data-BlinkTimer'));
    }
    $(document).on('click', '.spinnersub img', function() {
        /* local dev call */
        /*spinner_call('GSDW', { spinner_id: '1', ispreview: 1 });*/

        /* live call changed */
        var spinner_id = $('.spinnersub').attr('data-id')
        console.log('spinner_id : ', spinner_id);
        spinner_call('GSDW', {
            spinner_id: spinner_id,
            ispreview: 1
        });
        //spinner_call('GSDW', { spinner_id: '1', ispreview: 1 });
        clicked = 1;
    });
    var clicked = 1;
    $(document).on('click', '.spinbutton', function() {
        if (clicked > 1) {
            return false;
        }
        clicked = 10;
        jQuery(".success_message_popup").hide();
        var randomnumber = spinner_data.data.result;
        console.log(randomnumber);
        if (randomnumber == 0) {
            randomnumber = 7200;
        } else {
            randomnumber = randomnumber * 37 * 60;
        }
        console.log(randomnumber);
        var div = document.getElementById('rotate_spin_img');
        div.style.transform = 'rotate(' + randomnumber + 'deg)';
        setTimeout(function() {
            // console.log(spinner_data.data.ispreview);
            $('.success_message_popup p').text('');
            $('.success_message_popup h3').text('');
            spinner_end('GSRW', {
                ispreview: spinner_data.data.ispreview
            });
        }, 10000);
    });


    /* close all popup when click on close button */
    jQuery(document).on('click', '.close_btn', function() {
        jQuery('.special_offer_menu').hide();
        jQuery('.success_message_popup').hide();
        jQuery('.popup_custom').hide();
    });


    $(".twitter_popup").click(function() {
        $(this).parents("li").find(".twitter_feed").addClass("active_twitter_feed");
    });

    $(document).on('click', '.buy_chips ', function(e) {
        $('.preloader3').show();
        var special_offer = "no";

        var btns = $(this).data('id');
        var href = $(this).data('href');
        if (href != "") {
            special_offer = "yes";
        }
        var positions = $(this).offset();
        special_offer = "yes";
        if (special_offer == "yes" && btns == 0) {
            $('.custom_payment_popup1,.custom_payment_popup2,.special_offer_menu').hide();
            jQuery.ajax({
                type: 'POST',
                data: {
                    'get_offer_page': 'yes',
                    'url_is': href
                },
                url: "ajax/offer_ajax.php",
                success: function(res) {
                    var response = $.parseJSON(res);
                    console.log(response);
                    $('.special_offer_menu .top_p').html(response.html);
                    if ($('.linked_plan_button').length) {
                        $('.linked_plan_button').attr("data-plan_id", response.settle_linkplanid_set);
                        $('.linked_plan_button').attr("data-unique", response.settle_unique_linkedid);
                        $('.linked_plan_button').attr("data-url", response.offers_linkplan_link);
                    }
                    if ($('.plan_button').length) {
                        $('.plan_button').attr("data-plan_id", response.settle_planid_set);
                        $('.plan_button').attr("data-unique", response.settle_unique_planid);
                        $('.plan_button').attr("data-url", response.offers_plan_link);
                    }

                    var i = 0;
                    $('.special_offer_menu .top_p img').load(function() {
                        i = i + 1;
                        if ($('.special_offer_menu .top_p img').length <= i) {
                            setTimeout(function() {
                                $('.special_offer_menu').show();
                                $('.preloader3').hide();
                            }, 1000);
                        }
                    });
                }
            });

        } else {
            $('.custom_payment_popup1,.custom_payment_popup2,.special_offer_menu').hide();
            $(this).parents('.balance_block').find('.custom_payment_popup1').show();
            $('.preloader3').hide();
        }

    });

    /* offer page buy chips click button as offers_buy_chips */
    $(document).on('click', '.offers_buy_chips ', function(e) {
        $('.preloader3').show();
        var special_offer = "no";

        var btns = $(this).data('id');
        var href = $(this).data('href');
        if (href != "") {
            special_offer = "yes";
        }
        var positions = $(this).offset();
        special_offer = "yes";
        if (special_offer == "yes" && btns == 0) {
            $('.custom_payment_popup1,.custom_payment_popup2,.special_offer_menu').hide();
            jQuery.ajax({
                type: 'POST',
                data: {
                    'get_offer_page': 'yes',
                    'url_is': href
                },
                url: "ajax/offer_ajax.php",
                success: function(res) {
                    var response = $.parseJSON(res);
                    console.log(response);
                    $('.special_offer_menu .top_p').html(response.html);
                    if ($('.linked_plan_button').length) {
                        $('.linked_plan_button').attr("data-plan_id", response.settle_linkplanid_set);
                        $('.linked_plan_button').attr("data-unique", response.settle_unique_linkedid);
                        $('.linked_plan_button').attr("data-url", response.offers_linkplan_link);
                    }
                    if ($('.plan_button').length) {
                        $('.plan_button').attr("data-plan_id", response.settle_planid_set);
                        $('.plan_button').attr("data-unique", response.settle_unique_planid);
                        $('.plan_button').attr("data-url", response.offers_plan_link);
                    }

                    var i = 0;
                    $('.special_offer_menu .top_p img').load(function() {
                        i = i + 1;
                        console.log(">>>>>>>>>>", i)
                        if ($('.special_offer_menu .top_p img').length <= i) {
                            console.log("if >>>>>>>>>>>>");
                            setTimeout(function() {
                                $('.special_offer_menu').show();
                                $('.preloader3').hide();
                            }, 1000);
                        }
                    });
                }
            });

        } else {
            //console.log("hello it is in else");
            //console.log(btns);
            $('.custom_payment_popup1,.custom_payment_popup2,.special_offer_menu').hide("fast", function() {
                $('#custom_pp_' + btns).show();
            });
            //$(this).parents('#checker_'+btns).find('#custom_pp_'+btns).show();

            // $(this).parents('#checker_'+btns).find('#custom_pp_'+btns).css("display","block");
            $('.preloader3').hide();
        }

    });
    jQuery(document).on('click', '.close_button', function() {
        $('.special_offer_menu').hide();
    });
    jQuery(document).on('click', '.closebutton', function() {
        $(this).parents('.custom_payment_popup').hide();
    });
    /* new code for offer */
    jQuery(document).on('click', '.button_rupies', function() {
        var id = $(this).attr('data-plan_id');
        if ($('#' + id + '').length == 0) {
            console.log('aaa');
            $('.popup_custom2').show();
        } else {
            $('.special_offer_menu').find('.custom_payment_popup4 p').text('Amount :' + $(this).text() + '');
            $(this).parents('.special_offer_menu').find('.custom_payment_popup3').show();
            $(this).parents('.special_offer_menu').find('.custom_payment_popup3').find('.social_paytm_two_2').attr('data-unique_id', jQuery(this).attr("data-unique"));
            $(this).parents('.special_offer_menu').find('.custom_payment_popup3').find('.offer_links').attr('href', jQuery(this).attr("data-url"));
        }
    });
    /* new code for offer */

    $(document).on("click", function(event) {
        var $trigger = $(".buy_chips ");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".custom_payment_popup1").hide();
        }
    });
    $(document).on("click", function(event) {
        var $trigger = $(this);

        if (!$(event.target).hasClass('social_paytm_two') && !$(event.target).parents('.custom_payment_popup').hasClass('custom_payment_popup2') && !$(event.target).hasClass('button_rupies')) {
            $(".custom_payment_popup2").hide();
        }
    });
    $(document).on('click', '.social_paytm_two', function(e) {
        //dataplan=$(this).data('plan');
        //datarates = localStorage.getItem(dataplan);
        /* ajax call to get all plan rates and datas  */
        jQuery.ajax({
            type: 'POST',
            data: {
                'unique_id': jQuery(this).data('unique_id')
            },
            url: "ajax/get_plan.php",
            success: function(res) {
                if (res == "error") {
                    alert("Sorry, data are not able to get process");
                    location.reload();
                    return false;
                } else {
                    var result = res.split(",");
                    dataplan = result[0];
                    datarates = result[1];
                }
            }
        });
        /* ajax call to get all plan rates and datas  */
        $('.custom_payment_popup2').hide();
        $(this).parents('.balance_block').find('.custom_payment_popup2').show();
    });

    /* offers page paytm button */

    $(document).on('click', '.social_paytm_two_offer_page', function(e) {
        var _this = $(this);
        //console.log("Button clicked");
        //dataplan=$(this).data('plan');
        //datarates = localStorage.getItem(dataplan);
        // ajax call to get all plan rates and datas 
        jQuery.ajax({
            type: 'POST',
            data: {
                'unique_id': jQuery(this).data('unique_id')
            },
            url: "ajax/get_plan.php",
            success: function(res) {
                if (res == "error") {
                    alert("Sorry, data are not able to get process");
                    location.reload();
                    return false;
                } else {
                    var result = res.split(",");
                    dataplan = result[0];
                    datarates = result[1];
                }
            }
        });

        //console.log("popup hide");
        // ajax call to get all plan rates and datas 
        //$('.custom_payment_popup2').hide();
        //_this.parents('li').find('.custom_payment_popup2').show();
        $('.custom_payment_popup2').hide("fast", function() {
            setTimeout(function() {
                _this.parents('li').find('.custom_payment_popup2').show();
            }, 100);
        });
    });

    /* click for the new specail foffer popup */
    $(document).on('click', '.social_paytm_two_2', function(e) {
        /* ajax call to get all plan rates and datas  */
        jQuery.ajax({
            type: 'POST',
            data: {
                'unique_id': jQuery(this).attr('data-unique_id')
            },
            url: "ajax/get_plan.php",
            success: function(res) {
                if (res == "error") {
                    alert("Sorry, data are not able to get process");
                    location.reload();
                    return false;
                } else {
                    var result = res.split(",");
                    dataplan = result[0];
                    datarates = result[1];
                }
            }
        });
        /* ajax call to get all plan rates and datas  */
        /*$('.custom_payment_popup3').hide();
        $(this).parents('.balance_block').find('.custom_payment_popup3').show();*/
        $('.custom_payment_popup3').hide();
        $(this).parents('.special_offer_menu').find('.custom_payment_popup4').show();
    });
    /*
    $(document).on('click', '.social_paytm_two_2', function(e) {
        $('.custom_payment_popup3').hide();
        $(this).parents('.balance_block').find('.custom_payment_popup4').show();
    });
    */
    $(document).on('keyup', '.custom_payment_popup2 input', function(e) {
        $(this).removeClass('error2');
    });
    // $(document).on('click','.custom_payment_popup2submit',function(e){
    //  var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //        $('.validemail,.validphone').removeClass('error2');
    //        console.log($(this).parents('form').find('.validemail').val());
    //        if($(this).parents('form').find('.validemail').val() == "" || filter.test($(this).parents('form').find('.validemail').val()) == false){
    //      console.log('email');
    //      $(this).parents('form').find('.validemail').addClass('error2'); 
    //      return false;
    //  }else if( $(this).parents('form').find('.validphone').val() == '' || $(this).parents('form').find('.validphone').val().length !== 10){
    //            console.log('phone no');
    //            $(this).parents('form').find('.validphone').addClass('error2');
    //       return false;
    //  }

    // });

    $(document).on("click", function(e) {
        if (!$(e.target).is(".twitter_popup , .twitter_popup *")) {
            $(".twitter_feed").removeClass("active_twitter_feed");
        }
    });

    $("#contact").submit(function(e) {
        e.preventDefault();
        var name = $("#cf-name").val();
        var email = $("#cf-email").val();
        var subject = $("#cf-subject").val();
        var message = $("#cf-message").val();
        var captcha = $("#g-recaptcha-response").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message + '&g-recaptcha-response=' + captcha;

        function isValidEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };
        if (isValidEmail(email) && (message.length > 1) && (name.length > 1) && (captcha.length > 1)) {
            $.ajax({
                type: "POST",
                url: "sendmail",
                data: dataString,
                success: function(json_data) {
                    json_data = JSON.parse(json_data);
                    var error = json_data.error;
                    var msg = json_data.msg;
                    if (error == 1) {
                        $('.error').fadeIn(500).children('.success_inner').html(msg);
                    } else {
                        $('.success').fadeIn(1000).children('.success_inner').html(msg);
                        $('.error').fadeOut(500);
                        $('#contact input,#contact textarea').val("");
                        setTimeout(function() {
                            location.reload();
                        }, 2000);
                    }
                }
            });
        } else {
            $('.error').fadeIn(1000);
            $('.success').fadeOut(500);
        }
        return false;
    });

    /* UserProfile Save Button */
    /*$("#UserInfo_SaveBtn").submit(function(e) {*/
    $("#UserInfo_SaveBtn").on("click", function(e) {
        var _UserEmail = $("#UserEmail").val().trim();
        var _UserNumber = $("#UserNumber").val().trim();

        var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var numberReg = /^[0-9]+$/;

        $(".lbl_error").css("display", "none");
        if (_UserEmail == '') {
            $("#UserEmail").parent("label").find(".lbl_error").css("display", "block");
            return false;
        } else if (!_UserEmail.match(email_regex)) {
            $("#UserEmail").parent("label").find(".lbl_error").css("display", "block").text("Plaese Enter Valid Email Address");
            return false;
        } else if (_UserNumber == '') {
            $("#UserNumber").parent("label").find(".lbl_error").css("display", "block");
            return false;
        } else if (!_UserNumber.match(numberReg)) {
            $("#UserNumber").parent("label").find(".lbl_error").css("display", "block").text("Plaese Enter Valid Phone Number");
            return false;
        } else if (_UserEmail == '' && _UserNumber == '') {
            console.log("success");
        }

    });
    /* UserProfile Save Button */

    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';
    $('a.scrollto').bind('click.smoothscroll', function(event) {
        event.preventDefault();
        var target = this.hash;
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollAnimationTime, scrollAnimation, function() {
            window.location.hash = target;
        });
    });
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'))
        document.querySelector('head').appendChild(msViewportStyle)
    }



    if ($('#screenshots').length) {
        var owl = $("#screenshots");
        owl.owlCarousel({
            items: 3,
            itemsDesktop: [1000, 3],
            itemsDesktopSmall: [900, 2],
            itemsTablet: [600, 1],
            itemsMobile: false,
            navigation: false,
            slideSpeed: 800,
            paginationSpeed: 400,
            autoPlay: 5000,
            stopOnHover: true
        });
        $('#screenshots a').nivoLightbox({
            effect: 'fadeScale',
        });
    }
    if ($('#paytm_pay').length) {
        var owl_paytm_pay = $("#paytm_pay");
        owl_paytm_pay.owlCarousel({
            items: 1,
            itemsDesktop: [1000, 1],
            itemsDesktopSmall: [900, 1],
            itemsTablet: [600, 1],
            itemsMobile: false,
            navigation: false,
            slideSpeed: 800,
            paginationSpeed: 400,
            stopOnHover: true,
        });

    }
    $('.paybutton_slider.next_slide').on('click', function() {
        owl_paytm_pay.trigger('owl.next');
    });
    $('.paybutton_slider.prev_slide').on('click', function() {
        owl_paytm_pay.trigger('owl.prev');
    });
    if ($('#feedbacks').length) {
        var owl = $("#feedbacks");
        owl.owlCarousel({
            items: 3,
            itemsDesktop: [1000, 2],
            itemsDesktopSmall: [900, 2],
            itemsTablet: [600, 1],
            itemsMobile: false,
            navigation: false,
            autoPlay: 5000,
            stopOnHover: true
        });
    }

    $('#spanYear').html(new Date().getFullYear());
    $('.copyright').attr('title', 'Super Star Teen Patti Pals Copyright ©' + new Date().getFullYear());

})(jQuery);
$(window).resize(function() {
    "use strict";
    var ww = $(window).width();
    if (ww < 480) {
        $('.main-navigation a').on('click', function() {
            $(".navbar-toggle").click();
        });
    }
});

var maintenance = {
    int: '',
    timer: function(hourHold, minuteHold, secondHold, time) {
        var self = this,
            all_seconds = Math.round(time / 1000),
            second = all_seconds % 60,
            ref_minutes = all_seconds - second,
            minute = (ref_minutes / 60) % 60,
            all_hours = Math.floor(time / 3600000),
            hour = all_hours % 24,
            secondText = (second.toString().length === 2) ? second : '0' + second,
            minuteText = (minute.toString().length === 2) ? minute : '0' + minute,
            hourText = (hour.toString().length === 2) ? hour : '0' + hour;

        if (hourHold) {
            hourHold.innerHTML = hourText;
        }
        if (minuteHold) {
            minuteHold.innerHTML = minuteText;
        }
        if (secondHold) {
            secondHold.innerHTML = secondText;
        }

        clearInterval(self.int);
        self.int = setInterval(function() {
            second--;
            if (second === -1) {
                second = 59;
                minute--;
            }
            if (minute === -1) {
                minute = 59;
                hour--;
            }
            // set text
            secondText = (second.toString().length === 2) ? second : '0' + second;
            minuteText = (minute.toString().length === 2) ? minute : '0' + minute;
            hourText = (hour.toString().length === 2) ? hour : '0' + hour;
            if (hourHold) {
                hourHold.innerHTML = hourText;
            }
            if (minuteHold) {
                minuteHold.innerHTML = minuteText;
            }
            if (secondHold) {
                secondHold.innerHTML = secondText;
            }

            // stop if 00:00
            if (second <= 0 && minute <= 0 && hour <= 0) {
                clearInterval(self.int);
            }
        }, 1000);
    }
}



jQuery(document).on('click', '.dev_paytm_payment_get', function() {
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    $('.validemail,.validphone').removeClass('error2');
    console.log($(this).parents('form').find('.validemail').val());
    if ($(this).parents('form').find('.validemail').val() == "" || filter.test($(this).parents('form').find('.validemail').val()) == false) {
        console.log('email');
        $(this).parents('form').find('.validemail').addClass('error2');
        return false;
    } else if ($(this).parents('form').find('.validphone').val() == '' || $(this).parents('form').find('.validphone').val().length !== 10) {
        console.log('phone no');
        $(this).parents('form').find('.validphone').addClass('error2');
        return false;
    }
    $('.preloader2').show();
    //console.log(jQuery('.client_idss').val()+"===="+jQuery(this).parents('form').find('.dev_user_phone').val()+"==="+jQuery(this).parents('form').find('.dev_user_email').val()+"==="+datarates+"==="+dataplan);

    jQuery.redirect("PaytmKit/pgRedirect.php", {
            CUST_ID: jQuery('.client_idss').val(),
            TXN_AMOUNT: datarates,
            plan_id: dataplan,
            MOBILE_NO: jQuery(this).parents('form').find('.dev_user_phone').val(),
            EMAIL: jQuery(this).parents('form').find('.dev_user_email').val(),
        },
        "POST", null, null, true);

    // jQuery.redirect("test.php", {
    //         CUST_ID: jQuery('.client_idss').val(),
    //         TXN_AMOUNT: datarates,
    //         plan_id: dataplan,
    //         MOBILE_NO: jQuery(this).parents('form').find('.dev_user_phone').val(),
    //         EMAIL: jQuery(this).parents('form').find('.dev_user_email').val(),
    //     },
    //     "POST", null, null, true);
});
jQuery(document).on('click', '.dev_paytm_payment_get_special', function() {
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    $('.validemail,.validphone').removeClass('error2');
    console.log('>> ', $(this).parents('form').find('.validemail').val());
    if ($(this).parents('form').find('.validemail').val() == "" || filter.test($(this).parents('form').find('.validemail').val()) == false) {
        console.log('email');
        $(this).parents('form').find('.validemail').addClass('error2');
        return false;
    } else if ($(this).parents('form').find('.validphone').val() == '' || $(this).parents('form').find('.validphone').val().length !== 10) {
        console.log('phone no');
        $(this).parents('form').find('.validphone').addClass('error2');
        return false;
    }
    $('.preloader2').show();
    //console.log('>> ', jQuery('.client_idss').val()+"===="+jQuery(this).parents('form').find('.dev_user_phone').val()+"==="+jQuery(this).parents('form').find('.dev_user_email').val()+"==="+datarates+"==="+dataplan);

    jQuery.redirect("PaytmKit/pgRedirect.php", {
            CUST_ID: jQuery('.client_idss').val(),
            TXN_AMOUNT: datarates,
            plan_id: dataplan,
            MOBILE_NO: parseInt(jQuery(this).parents('form').find('.dev_user_phone').val()),
            EMAIL: jQuery(this).parents('form').find('.dev_user_email').val(),
        },
        "POST", null, null, true);
});

/* click event only for the 1 rs plan */
jQuery(document).on('click', '.dev_paytm_payment_get1', function() {
    alert("zxczxczxcxc");
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    $('.validemail,.validphone').removeClass('error2');
    console.log($(this).parents('form').find('.validemail').val());
    if ($(this).parents('form').find('.validemail').val() == "" || filter.test($(this).parents('form').find('.validemail').val()) == false) {
        console.log('email');
        $(this).parents('form').find('.validemail').addClass('error2');
        return false;
    } else if ($(this).parents('form').find('.validphone').val() == '' || $(this).parents('form').find('.validphone').val().length !== 10) {
        console.log('phone no');
        $(this).parents('form').find('.validphone').addClass('error2');
        return false;
    }
    var rates = jQuery(this).data('rates');
    $('.preloader2,.status2').show();
    $.redirect("PaytmKit/pgRedirect.php", {
            CUST_ID: jQuery('.client_idss').val(),
            TXN_AMOUNT: 1,
            plan_id: dataplan,
            MOBILE_NO: jQuery('.dev_user_phone1').val(),
            EMAIL: jQuery('.dev_user_email1').val(),
        },
        "POST", null, null, true);
});