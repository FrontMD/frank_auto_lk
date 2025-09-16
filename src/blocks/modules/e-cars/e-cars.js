function eCarsController() {
    const eCars = document.querySelector('[data-js="eCars"]')

    if(!eCars) return

    const selects = eCars.querySelector('[data-js="eCarsSelects"]')
    const commonCheckbox  = eCars.querySelector('[data-js="eCarsCheckbox"]')
    const commonCheckboxText  = commonCheckbox.querySelector('[data-js="eCarsCheckboxText"]')
    const commonCheckboxInput  = commonCheckbox.querySelector('[data-js="eCarsCheckboxInput"]')
    const checkboxesList = eCars.querySelectorAll('[data-js="eCarCheckbox"]')

    if(checkboxesList.length > 0) {
        checkboxesList.forEach(checkBox => {
            checkBox.addEventListener('change', function() {
                let checkedCounter =  0 
                
                checkboxesList.forEach(item => {
                    if(item.checked) {
                        checkedCounter++  
                    }
                })

                if(checkedCounter > 0) {
                    commonCheckboxText.innerHTML = 'Выбрано ' + checkedCounter
                    commonCheckboxInput.checked = true
                    selects.classList.add('active')
                } else {
                    selects.classList.remove('active')
                    commonCheckboxText.innerHTML = 'Выбрано 0'
                    commonCheckboxInput.checked = false
                }
            })

            commonCheckboxInput.addEventListener('change', function() {
                if(!this.checked) {
                    selects.classList.remove('active')
                    commonCheckboxText.innerHTML = 'Выбрано 0'
                    commonCheckboxInput.checked = false
                    checkboxesList.forEach(item => {
                        item.checked = false
                    })
                }
            })
        })
    }

}