window.addEventListener('load', function () {
        new FastClick(document.body);
}, false);

var slider = new PageSlider($("#container"));
$(window).on('hashchange', route);

$('.goback').entwine({
        onclick: function(e){
                e.preventDefault();
                parent.history.back();
        }
});

// Basic page routing
function route(event) {
        var hash = window.location.hash;

        var searchpage = hash.substring(1);
        var remotehost = 'http://mathyscms.edith.techrus.co.nz/'

        if(!searchpage.trim()){
                slider.slidePage($("<a href='#page-2'>goto next</a>"));
        } else {
                $pageid=searchpage.substring(5);
                slider.slidePage($("<a href='#'>goto next</a>"));
        }
}

route();
