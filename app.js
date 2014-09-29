window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);


(function($){

        $('mathys').entwine(function($){

                var slider = new PageSlider($("#container"));
                var spinner = $("#spinner");

//                var homePage =
//                        '<div>' +
//                                '<div class="header"><h1>Page Slider</h1></div>' +
//                                '<div class="scroller">' +
//                                '<ul class="list">' +
//                                '<li><a href="#page1"><strong>Build Bot</strong></a></li>' +
//                                '<li><a href="#page2"><strong>Medi Bot</strong></a></li>' +
//                                '<li><a href="#page3"><strong>Ripple Bot</strong></a></li>' +
//                                '</ul>' +
//                                '</div>' +
//                                '</div>';
//
//                var detailsPage =
//                        '<div>' +
//                                '<div class="header"><a href="#" class="btn">Back</a><h1>Robot</h1></div>' +
//                                '<div class="scroller">' +
//                                '<div class="robot">' +
//                                '<img src="images/{{img}}"/>' +
//                                '<h2>{{name}}</h2>' +
//                                '<p>{{description}}</p>' +
//                                '</div>' +
//                                '</div>' +
//                                '</div>';

                function merge(tpl, data) {
                        return tpl.replace("{{img}}", data.img)
                                .replace("{{name}}", data.name)
                                .replace("{{description}}", data.description);
                }


                function route(event){
                        var page,
                            hash = window.location.hash;

                        var searchpage = hash.substring(1);

                        //var remotehost = 'http://mathyscms.edith.techrus.co.nz'
                        var remotehost = 'http://mathyscms.edith.techrus.co.nz/'

                        if(!searchpage.trim()){
                                spinner.hide();
                                spinner.show();
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
                        } else {
                                console.log(searchpage.substring(0,4));
                                if(searchpage.substring(0,4) == 'page'){
                                        $pageid=searchpage.substring(5);
                                        spinner.hide();
                                        spinner.show();
                                        $.ajax({
                                                type: 'GET',
                                                url: remotehost + '/mathys_api/get_subcategory_page/?pageid='+$pageid,
                                                jsonp: "callback",
                                                dataType: "jsonp",
                                                complete: function(){
                                                },
                                                success: function(data){
                                                        spinner.hide();
                                                        slider.slidePage($(data));
                                                }
                                        });
                                } else {
                                        $pageid=searchpage.substring(5);
                                        spinner.hide();
                                        spinner.show();
                                        $.ajax({
                                                type: 'GET',
                                                url: remotehost + '/mathys_api/get_media_page/?pageid='+$pageid,
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
                        }

                }


//                function route(event){
//                        var page,
//                                hash = window.location.hash;
//
//                        if (hash === "#page1") {
//                                spinner.show();
//                                $.ajax({
//                                        type: 'GET',
//                                        url: 'http://mathys.cms/mathys_api/get-main-categories',
//                                        jsonp: "callback",
//                                        dataType: "jsonp",
//                                        complete: function(){
//
//                                        },
//                                        success: function(data){
//                                                spinner.hide();
//                                                slider.slidePage($(data));
//                                        }
//                                });
//                        } else if (hash === "#page2") {
//                                page = merge(detailsPage, {img: "medibot.jpg", name: "Medi Bot", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."});
//                        } else if (hash === "#page3") {
//                                page = merge(detailsPage, {img: "ripplebot.jpg", name: "Ripple Bot", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."});
//                        }
//                        else {
//                                page = homePage;
//                        }
//
//                        slider.slidePage($(page));
//                }

                $('.goback').entwine({
                        onclick: function(e){
                                e.preventDefault();
                                parent.history.back();
                        }
                });

                $('body').entwine({
                        onadd: function(){
                                console.log(window.localStorage.getItem('test'));
                                route();
                                spinner.hide();
                        }
//                        ,
//                        initialize: function(){
//                                $.ajax({
//                                        type: 'GET',
//                                        url: 'http://mathys.cms/mathys_api/get-main-categories',
//                                        jsonp: "callback",
//                                        dataType: "jsonp",
//                                        success: function(data){
//                                                slider.slidePage($(data));
//                                                return;
//                                        }
//                                });
//                        }
                });

                $(window).on('hashchange', route);

        });

})(jQuery);
