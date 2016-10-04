import './landing-page.html';

Template.Landing_page.onRendered(function() {

    $('body')
        .addClass('landing-page');

    $('body')
        .scrollspy({
            target: '.navbar-fixed-top',
            offset: 80
        });

});

Template.Landing_page.onDestroyed(function() {

    $('body')
        .removeClass('landing-page');

});

Template.Landing_page.events({

    // Page scrolling feature
    'click a.page-scroll': function(event) {
        event.preventDefault();
        var link = $(event.target);
        $('html, body')
            .stop()
            .animate({
                scrollTop: $(link.attr('href'))
                    .offset()
                    .top - 50
            }, 500);
    }


});
