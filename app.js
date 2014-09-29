window.addEventListener('load', function () {
        new FastClick(document.body);
}, false);

var slider = new PageSlider($("#container"));
var remotehost = 'http://mathyscms.edith.techrus.co.nz/'

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
                                slider.slidePage($(data));
                        }
                });
}

// Basic page routing
function route(event) {
        var hash = window.location.hash;

        var searchpage = hash.substring(1);
        var remotehost = 'http://mathyscms.edith.techrus.co.nz/'

        if(!searchpage.trim()){
                renderhomepage();
        } else {
                pageid=searchpage.substring(5);
                rendercategorypage(pageid);
        }
}

route();
