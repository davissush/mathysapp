window.addEventListener('load', function () {
        new FastClick(document.body);
}, false);

var slider = new PageSlider($("#container"));
var remotehost = 'http://mathyscms.edith.techrus.co.nz/'
//var remotehost = 'http://mathys.cms'
var spinner = $("#spinner");

spinner.hide();

$(window).on('hashchange', route);

$('.goback').entwine({
        onclick: function(e){
                e.preventDefault();
                parent.history.back();
        }
});


function renderhomepage(){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get-main-categories',
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        spinner.hide();
                        slider.slidePage($(data));
                }
        });
}

function rendercategorypage(pageid){
                        $.ajax({
                        type: 'GET',
                        url: remotehost + '/mathys_api/get_subcategory_page/?pageid='+pageid,
                        jsonp: "callback",
                        dataType: "jsonp",
                        complete: function(){
                        },
                        success: function(data){
                                spinner.hide();
                                slider.slidePage($(data));
                        }
                });
}

function rendermediapage(pageid){
                        $.ajax({
                        type: 'GET',
                        url: remotehost + '/mathys_api/get_media_page/?pageid='+pageid,
                        jsonp: "callback",
                        dataType: "jsonp",
                        complete: function(){
                        },
                        success: function(data){
                                spinner.hide();
                                slider.slidePage($(data));
                        }
                });
}

function renderRegistrationForm(){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get_registration_form',
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        spinner.hide();
                        slider.slidePage($(data));
                }
        });
}

function renderIntroPage(){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get_intro_page',
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        spinner.hide();
                        slider.slidePage($(data));
                }
        });
}


// Basic page routing
function route(event) {
        var hash = window.location.hash;

        var searchpage = hash.substring(1);

        spinner.hide();
        spinner.show();
        if(!searchpage.trim()){

                window.localStorage.removeItem('isregistered');

                //console.log(window.localStorage.getItem("isregistered"));

                if(window.localStorage.getItem("isregistered")){
                        renderhomepage();
                } else {
                        renderIntroPage();
                        //renderRegistrationForm();
                }

//                if(window.localStorage.getItem("isregistered")){
//
//                } else {
//                        renderRegistrationForm();
//
//                }
        } else {
                pageid=searchpage.substring(5);
                if(searchpage.substring(0,4) == 'page'){
                        rendercategorypage(pageid);
                } else {
                        rendermediapage(pageid);
                }
        }
}

route();

(function($) {

        var IsLoading = false;


        $('mathys').entwine(function($){

                $('*').entwine({
                        showAlert: function (message, title) {
                                if (navigator.notification) {
                                        navigator.notification.alert(message, null, title, 'OK');
                                } else {
                                        alert(title ? (title + ": " + message) : message);
                                }
                        }
                });

                $("input[type='text']").entwine({
                        onfocusin: function(){
                                $('.bar-tab').hide();
                        },
                        onfocusout: function(){
                                $('.bar-tab').show();
                        }
                });

                $("#TermsAndCondition").entwine({
                        onclick: function(e){
                                e.preventDefault();
                        }
                });

                $("#CloseModal").entwine({
                        onclick: function(e){
                                e.preventDefault();
                        }
                });

                $(".TOCCheckLabel").entwine({
                        onclick: function(){
                                this.closest('.TOCCheck').find('.checkbox').trigger('click');
                        }
                });

                $("#SumbitRegForm").entwine({
                        onclick: function(e){
                                e.preventDefault();
                                self = this;

                                if(IsLoading) return;
                                        IsLoading = true;

                                if($('#IAgree').prop('checked')){
                                } else {
                                        self.showAlert('Please click T&C.', 'Message');
                                        IsLoading = false;
                                        return;
                                }

                                spinner.hide();
                                spinner.show();

                                $.ajax({
                                        url: remotehost + "/mathys_api/get_registration",
                                        type: 'POST',
                                        crossDomain: true,
                                        data: $('#RegistrationForm').serialize(),
                                        dataType: "html",
                                        success:function(data){
                                                $dataObj = JSON.stringify(data);

                                                console.log('tesat');
                                                window.localStorage.setItem("isregistered", "true");
                                                IsLoading = false;

                                                renderhomepage();
                                        },
                                        error:function(xhr,status,error){
                                                alert(error);
                                        }
                                });
                        }

                });

                $("#EnterApp").entwine({
                        onclick: function(e){
                                e.preventDefault();

                                spinner.hide();
                                spinner.show();
                                renderRegistrationForm();
                        }
                })


                $("#VideoPlay").entwine({
                        onclick: function(e){
                                e.preventDefault();

                                var videofile = $(this).data("videouri");

                                console.log(videofile);
                                VideoPlayer.play(videofile);
                        }
                })
        });

})(jQuery);
