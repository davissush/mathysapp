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

function showMessage(message, title) {
        if (navigator.notification) {
                navigator.notification.alert(message, null, title, 'OK');
        } else {
                alert(title ? (title + ": " + message) : message);
        }
}

function renderhomepage(){
        slider.slidePage($('<a href="/#page-1">home</a>'));
}

function rendercategorypage(pageid){
                slider.slidePage($('<a href="#">page-' + pageid + '</a>'));
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
