
let modals = false

function modalsInit() {
    modals = new HystModal({
        linkAttributeName: "data-modal",
        catchFocus: false,
        beforeOpen: function(e){
            lockBody(true)
        },
        afterClose: function(){
            unlockBody()
        },
    });

    modalSlidesController()
}

function modalSlidesController() {
    const modalSlidesBlocks = document.querySelectorAll('[data-js="modalSlides"]')

    if(modalSlidesBlocks.length < 1) return

    modalSlidesBlocks.forEach(block => {
        const slidesList = block.querySelectorAll('[data-js="modalSlide"]')
        const radioTabsList = block.querySelectorAll('[data-js="modalSlidesTab"]')

        radioTabsList.forEach(tab => {
            tab.addEventListener('click', function() {

                const targetId = this.dataset.id

                if(targetId) {
                    changeSlide(slidesList, parseInt(targetId))
                }

            } )
        })
    })

    function changeSlide(slides, targetId) {
        slides.forEach((slide, index) => {
            if(index == targetId) {
                slide.classList.add('active')
            } else {
                slide.classList.remove('active')
            }
        })
    }
}
