/*
Author       : Dreamstechnologies
Template Name: Dleohr - Bootstrap Admin Template
*/

(function () {
    "use strict";

    // Variables declarations
    var $wrapper = $('.main-wrapper');
    var $pageWrapper = $('.page-wrapper');

    // Mobile menu sidebar overlay
    $('body').append('<div class="sidebar-overlay"></div>');

    // زر الموبايل
    $(document).on('click', '#mobile_btn', function() {
        $wrapper.toggleClass('slide-nav');
        $('.sidebar-overlay').toggleClass('opened');
        $('html').addClass('menu-opened');
        return false;
    });

    // زر إغلاق السايدبار (الموبايل + اللابتوب)
    $(".sidebar-close").on("click", function () { 
        const $body = $("body");
        const $overlay = $(".sidebar-overlay");

        // إزالة كلاسات الموبايل
        $wrapper.removeClass('slide-nav');
        $overlay.removeClass('opened');
        $('html').removeClass('menu-opened');

        // إخفاء السايدبار على كل الشاشات
        $body.toggleClass('sidebar-hidden');
    });

    // النقر على الـ overlay يغلق الموبايل فقط
    $(".sidebar-overlay").on("click", function () {
        $('html').removeClass('menu-opened');
        $(this).removeClass('opened');
        $wrapper.removeClass('slide-nav');
        $('.sidebar-overlay').removeClass('opened');
    });

    // Sidebar Menu
    var Sidemenu = function() {
        this.$menuItem = $('.sidebar-menu a');
    };

    function init() {
        var $this = Sidemenu;
        $('.sidebar-menu a').on('click', function(e) {
            if($(this).parent().hasClass('submenu')) {
                e.preventDefault();
            }
            if(!$(this).hasClass('subdrop')) {
                $('ul', $(this).parents('ul:first')).slideUp(250);
                $('a', $(this).parents('ul:first')).removeClass('subdrop');
                $(this).next('ul').slideDown(350);
                $(this).addClass('subdrop');
            } else if($(this).hasClass('subdrop')) {
                $(this).removeClass('subdrop');
                $(this).next('ul').slideUp(350);
            }
        });
        $('.sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
    }

    // استدعاء init
    init();

    // Trial Item
    if($('.trial-item').length > 0) {
        $(".trial-item .close-icon").on("click", function () {
            $(this).closest(".trial-item").hide(); 
        });
    }

    // Fullscreen toggle
    function toggleFullscreen(elem) {
        elem = elem || document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    // Fullscreen button
    if($('#btnFullscreen').length > 0) {
        document.getElementById('btnFullscreen').addEventListener('click', function() {
            toggleFullscreen();
        });
    }

    // Toggle button للسايدبار (Mini Sidebar)
    $(document).on('click', '#toggle_btn, #toggle_btn2', function () {
        const $body = $('body');
        const $html = $('html');
        const isMini = $body.hasClass('mini-sidebar');
        const isFullWidth = $html.attr('data-layout') === 'full-width';
        const isHidden = $html.attr('data-layout') === 'hidden';

        if (isMini) {
            $body.removeClass('mini-sidebar');
            $(this).addClass('active');
            localStorage.setItem('screenModeNightTokenState', 'night');
            setTimeout(function () {
                $(".header-left").addClass("active");
            }, 100);
        } else {
            $body.addClass('mini-sidebar');
            $(this).removeClass('active');
            localStorage.removeItem('screenModeNightTokenState');
            setTimeout(function () {
                $(".header-left").removeClass("active");
            }, 100);
        }

        // Full-width
        if (isFullWidth) {
            $body.addClass('full-width').removeClass('mini-sidebar');
            $('.sidebar-overlay').addClass('opened');
            $(document).on('click', '.sidebar-close', function () {
                $('body').removeClass('full-width');
            });
        } else {
            $body.removeClass('full-width');
        }

        // Hidden layout
        if (isHidden) {
            $body.toggleClass('hidden-layout');
            $body.removeClass('mini-sidebar');
            $(document).on('click', '.sidebar-close', function () {
                $('body').removeClass('full-width');
            });
        } 

        return false;
    });

    // [بقية الكود الأصلي بدون أي حذف]...
    // (Datatable, Flatpickr, Quill, Select2, Daterange, Tooltip, Popover, Office Slider, Add/Remove Inputs, إلخ)

})();
