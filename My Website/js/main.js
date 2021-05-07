$(document).ready(function() {

    /* Nav bar dropdown */
    $('[data-trigger="dropdown"]').on('mouseenter', function() {
        var submenu = $(this).parent().find('.submenu');
        submenu.fadeIn(300); //(ms) 

        $('.menu').on('mouseleave', function() {
            submenu.fadeOut(300); //(ms) 
        });
    });

    /* Active button for scroll */
    window.onscroll = function() {
        var location = $(document).scrollTop() + 300 //default is 70
        $('.tab').removeClass('active');
        if($(window).scrollTop() + $(window).height() == $(document).height()) { $('#contact-button').addClass('active') } 
        else if (location >= $('#projects').position().top) { $('#projects-button').addClass('active') } 
        else if (location >= $('#abilities').position().top) { $('#abilities-button').addClass('active') } 
        else if (location >= $('#experience').position().top) { $('#experience-button').addClass('active') } 
        else if (location >= $('#about').position().top) { $('#about-button').addClass('active') } 
        else if (location >= $('#home').position().top) { $('#home-button').addClass('active') } 
        else { 
            console.log("Location: " + location)
        }
    }

    /* Smooth scrolling Navigation */
    $('.tab').on('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        var topOfElement = document.querySelector(href).offsetTop - 70;
        window.scroll({top: topOfElement, behavior: "smooth"});

    });

    $('#banner').on('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        var topOfElement = document.querySelector(href).offsetTop - 70;
        window.scroll({top: topOfElement, behavior: "smooth"});
    });

    

})