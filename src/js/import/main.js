document.addEventListener('DOMContentLoaded', () => {
    $('[data-js="customScrollbar"]').each((index, el) => {
        new SimpleBar(el, { autoHide: false });
    })
    fancyboxInit();
})

// Блокировка скролла при открытии модалок
function lockBody(onlyHeaderPadding = false) {
    let scrollbarWidth = getScrollbarWidth()

    if(!onlyHeaderPadding) {
        $('body').addClass('no-scroll');
        $('body').css('padding-right', scrollbarWidth)
    }

    $('[data-js="siteHeader"]').css('padding-right', scrollbarWidth)
}

function unlockBody() {
	$('body').removeClass('no-scroll');
    $('body').css('padding-right', 0);
    $('[data-js="siteHeader"]').css('padding-right', 0)
}

function getScrollbarWidth() {
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth
}

// инициализация фансибокса
function fancyboxInit() {
    if (typeof window.distPath == 'undefined') {
        window.distPath = '';
    }
    Fancybox.bind("[data-fancybox]", {
        placeFocusBack: false,
        mainClass: 'my-fancybox',
        idle: false,
        closeExisting: true,
        Carousel: {
            transition: "crossfade",
            Navigation: {
                prevTpl: `<svg><use xlink:href=${window.distPath}img/sprites/sprite.svg#arrow_slider_left></use></svg>`,
                nextTpl: `<svg><use xlink:href=${window.distPath}img/sprites/sprite.svg#arrow_slider_right></use></svg>`,
              },
              Video: {
                  loop: true
              },
        },
        Thumbs: {
            type: "classic",
        },
        Toolbar: {
            enabled: true,
            display: {
                left: [],
                middle: [],
                right: [
                  "close",
                ],
            },
        },

        on: {
            "Carousel.ready Carousel.change": (fancybox, event) => {
                let currentSlide = fancybox.getSlide()

                if(currentSlide.type == 'html5video') {
                    let videoEl = currentSlide.el.querySelector('video')

                    if(videoEl) {
                        videoEl.setAttribute('loop', '')
                    }
                }
            },
            close: () => {
                const articleMediaSlider = document.querySelector('.article-layout__body [data-js="mediaSlider"]')

                if(articleMediaSlider) {
                    setTimeout(() => {
                        mediaSliderInit()
                    }, 100)
                }
            },
            
        },

    });
}