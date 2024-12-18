var winH,         // Window height
    isSp,         // Is SP or not
    winScrollTop, // Window scrollTop
    winH = $(window).height();

function initScroll() {
    $(window).scroll(function () {
        winScrollTop = $(window).scrollTop();
    }).trigger('scroll');
}

var noSc = true;

function setNav() {
    if (!isMobile) {
        if (winScrollTop > winH - (isSp ? 60 : 96)) {
            $('.indexBody').addClass('sc');
            noSc = false;
        } else {
            if (noSc) return;
            noSc = true;
            $('.indexBody').addClass('scOut');
            setTimeout(function () {
                $('.indexBody').removeClass('sc scOut');
            }, 600);
        }
    }
}

function goTop() {
    $('html,body').animate({scrollTop: 0}, 500);
}

//判断是否是手机
let isMobile = false;

function pageBox() {
    let width = $(window).width();
    if (width <= 1024) {
        isMobile = true;
    } else if (width > 1024) {
        isMobile = false;
    }
    ;
};

$(window).resize(() => {
    pageBox();
});

$(function () {
    initScroll()
    $(window).scroll(function () {
        setNav();
        scrollTab();
    }).trigger('scroll');

    function scrollTab() {
        var top = $(window).scrollTop();
        if (!isMobile) {
            (top > $('section').eq(0).innerHeight()) ? $('.rightNav').addClass('rightNavShow') : $('.rightNav').removeClass('rightNavShow');
        }
    }

    if (!isMobile) {
        pageBox();
        if ($('.animationBox').length != 0) {
            for (let i = 0; i < $('.animationBox').length; i++) {
                $($(".animationBox")[i]).parent("section").bind("mousemove", function (e) {
                    TweenLite.to(jQuery(".animationBox")[i], 1.5,
                        {
                            x: -((e.clientX - (window.innerWidth / 2)) / 20),
                            y: -((e.clientY - (window.innerHeight / 2)) / 20)
                        });
                });
            }
        }
        ;

        $(".navBox .navList").mouseenter(function () {
            let el = $(this).data('show');
            $(".navShow").stop(true, true).fadeOut(1000);
            el ? $(el).stop(true, true).fadeIn(1000) : '';
            $("#headerBox").addClass("openList");
            $(this).addClass("colorIn");
            $(".navAll").stop(true, true).fadeOut(1000)
        }).mouseleave(function () {
            $("#headerBox").removeClass("openList");
            $(".colorIn").removeClass('colorIn');
        })

        $(".languageBox").mouseleave(function () {
            $(this).find('.langList').stop(true, true).fadeOut(300)
        })

        $(".navShow").mouseenter(function () {
            let el = $(this).data('hover');
            el ? $(el).addClass("colorIn") : '';
            $("#headerBox").addClass("openList");
            $(".navAll").stop(true, true).fadeOut(300)
        }).mouseleave(function () {
            $(".navShow").stop(true, true).fadeOut(300);
            $("#headerBox").removeClass("openList");
            $(".colorIn").removeClass('colorIn');
        });

        $(".navListAllBtn").mouseenter(function () {
            $(".navAll").stop(true, true).fadeIn(1000);
            $("#headerBox").addClass("openList");
        })
        $(".navAll").mouseleave(function () {
            $(this).stop(true, true).fadeOut(300);
            $("#headerBox").removeClass("openList");
        })
    }
    ;

    $(".mobileTop .openBtn").click(function () {
        if ($(this).hasClass('closeBtn')) {
            $(".mobileTop").css('position', 'absolute');
        } else {
            $(".mobileTop").css('position', 'fixed');
        }
        $(".mobileNav").fadeToggle();
        $(this).toggleClass("closeBtn");
    })

    $(".mobileNav .listBox .more").click(function () {
        $(this).find('.childBox').slideToggle();
        $(this).toggleClass("closeBtn");
    })
})


