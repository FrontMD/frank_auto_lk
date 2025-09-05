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


