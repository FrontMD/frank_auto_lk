function formFilterController() {
    const formsFilter = document.querySelectorAll('[data-js="formFilter"]')

    if(formsFilter.length < 1) return

    formsFilter.forEach(formFilter => {
        formSpoilerController(formFilter)
        inputMasksInit(formFilter)

        const resetBtns = formFilter.querySelectorAll('[data-js="formResetBtn"]')

        if(resetBtns.length > 0) {
            resetBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    formReset(formFilter)
                })
            })
        }


    })
}

function catalogFilter() {
    const catalogFilterEl = document.querySelector('[data-js="catalogFilter"]')
    const catalogFilterOpenBtns = document.querySelectorAll('[data-js="catalogFilterOpen"]')

    if(!catalogFilter || catalogFilterOpenBtns.length < 1) return
    const catalogFilterCloseBtns = document.querySelectorAll('[data-js="catalogFilterClose"]')

    catalogFilterOpenBtns.forEach(openBtn => {
        openBtn.addEventListener('click', function() {
            lockBody();
            catalogFilterEl.classList.add('active')
        })
    })

    catalogFilterCloseBtns.forEach(openBtn => {
        openBtn.addEventListener('click', function() {
            unlockBody();
            catalogFilterEl.classList.remove('active')
        })
    })
}


