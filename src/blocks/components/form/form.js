window.formsProcessors = {}; // Функция из данного объекта будет вызвана в случае успешной валидации формы. Значение атрибута data-formprocessor формы будут служить ключами для функций-обработчиков
window.formsSending = {}; // Хранилище индикаторов отправки для избежания повторной отправки
//window.formsProcessors должны добавляться в additional.js

//включать в formsProcessors в случае успешной отправки там, где это требуется
function defaultAfterSubmit(form, doReset) {
    if(doReset===true){
        let fileFields = form.querySelectorAll('.field-file[data-js="formField"]')
        form.reset();

        //сбрасываем поле ФАЙЛ
        if(fileFields.length > 0) {
            fileFields.forEach(fileField => {
                let placeholderText = fileField.getAttribute('data-placeholder');
                let fileName = fileField.querySelector('[data-js="fileName"]');

                fileField.classList.remove('field-file--full');
                fileName.innerHTML = placeholderText;
            });
        }
    }

    //проверяем какой тип благодарности в форме и показываем его
    if(form.querySelector("[data-js='form-thanks']") !== null) {
        form.style.minHeight = form.offsetHeight + 'px'
        form.classList.add("form--sent")
    } else {
        thanksMessageShow(form);
    }

    toggleLoading(form, false)
}

function validation() {

    const forms = document.querySelectorAll('[data-validate]')

    if (!forms.length) return

    forms.forEach(form => {

        inputMasksInit(form);

        form.addEventListener('submit', event => {

            if(form.getAttribute('data-valid') == 'true') {
                return
            }

            event.preventDefault()

            const inputFields = form.querySelectorAll('[data-js="formField"]');

            const dataReqexp = {
                email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                space: /^(\s)+$/,
                date: /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/
            }

            function error(el, errorText = "") {
                let errorField = el.querySelector("[data-js='fieldError']")
                return {
                    set: () => {
                        el.classList.add("field--invalid")

                        if(errorField) {
                            errorField.innerHTML = errorText
                        }
                    },
                    remove: () => {
                        el.classList.remove("field--invalid")

                        if(errorField) {
                            errorField.innerHTML = errorText
                        }
                    },
                }
            }

            function validateInput(input) {
                const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                if(!field) return

                const name = field.getAttribute('data-v-name');
                let valueField = name === "file" ? field.files : field.value;
                let spaceTrigger = name === "file" ? true : !valueField.match(dataReqexp.space);

                if (field.hasAttribute('required') && !field.hasAttribute('disabled')) {
                    if (valueField !== '' && spaceTrigger) {
                        switch (name) {
                            case 'email':
                                if (valueField.match(dataReqexp.email)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ввести корректный e-mail').set()
                                }
                                break
                            case 'phone':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 11) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Некорректное количество знаков').set()
                                }
                                break
                            case 'kpp':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 9) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Некорректное количество знаков').set()
                                }
                                break
                            case 'inn':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 10 || valueField.length === 12) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Некорректное количество знаков').set()
                                }
                                break
                            case 'pasport':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 10) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Некорректное количество знаков').set()
                                }
                                break
                            case 'pasportOffice':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 6) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Некорректное количество знаков').set()
                                }
                                break
                            case 'vin':
                                if (valueField.length === 17) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Некорректное количество знаков').set()
                                }
                                break
                            case 'age':
                                valueField = valueField.replace(/[^0-9.]/g, '');

                                if(valueField.length < 10) {
                                    error(input, 'Некорректная дата').set()
                                }else if (isAdult(valueField)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Возраст не может быть меньше 18 лет').set()
                                }
                                break
                            case 'checkbox':
                                if (field.checked) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ознакомиться и дать согласие').set()
                                }
                                break
                            case 'file':
                                if (valueField.length > 0) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо прикрепить файл').set()
                                }
                                break                          
                            default:
                                if (valueField.length !== 0) {
                                    error(input).remove()
                                } else {
                                    error(input, "Необходимо заполнить это поле").set()
                                }
                        }
                    } else {
                        error(input, 'Необходимо заполнить это поле').set()
                    }
                }
            }

            function checkFields() {
            
                inputFields.forEach(input => {
                    validateInput(input)
                })
            }

            function lifeValidate() {
                inputFields.forEach(input => {
                    input.addEventListener('click', () => {
                        if (form.getAttribute('data-validate')) {
                            const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                            if(!field) return

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )

                            checkFields()

                            if(field.dataset.js === 'formSelect') {
                                field.closest('[data-js="formField"]').classList.remove('field--invalid')
                            }

                        }
                    })
                })
            }

            function validate() {
                let errors = 0

                inputFields.forEach(input => {
                    if (input.classList.contains('field--invalid')) {
                        errors += 1
                    }
                })

                // тут отправляем данные
                if (errors === 0) {
                    if(form.getAttribute('data-auth') && form.getAttribute('data-auth') == 'true') {
                        form.setAttribute('data-valid', 'true')
                        let event = new Event("submit");
                        form.dispatchEvent(event);
                        form.submit()  
                    } else {
                        submitFunctionKey = form.getAttribute('data-submit-function');
                        if (typeof (submitFunctionKey) === 'string' && submitFunctionKey.length > 0) {
                            try {
                                window.formsProcessors[submitFunctionKey](form);
    
                            } catch (e) {
                                alert('Обработчик формы не обнаружен');
                            }
                        } else {
                            alert('Обработчик формы не указан');
                        }
                    }
                    

                    //toggleLoading(form, true)
                    //defaultAfterSubmit(form, true)
                }
            }

            lifeValidate()
            checkFields()
            form.setAttribute('data-validate', 'true')

            validate()

        })
    })
}

function pasportMasksInit(form) {
    const dependence = form.querySelector('[data-dependence="pasport"]');
    
    const dependenceVals = ['россия', 'рф', 'российская федерация']

    $(dependence).on('change', function() {

       
        const selectedText = $(this).find('option:selected').text().toLowerCase();

        if (dependenceVals.includes(selectedText)) {
            pasportMasksToggle(true)
        } else {
            pasportMasksToggle(false)
        }
    });
    
    function pasportMasksToggle(maskOn) {
        const pasports = form.querySelectorAll('input[data-type="pasport"]');
        const pasportOffices = form.querySelectorAll('input[data-type="pasportOffice"]');

        if(pasports.length > 0) {
            pasports.forEach(pasport => {
                if(maskOn) {
                    Inputmask({
                        'mask': '9999 999999',
                        'showMaskOnHover': false
                    }).mask(pasport);
                    pasport.setAttribute('data-v-name', 'pasport')
                } else {
                    Inputmask.remove(pasport)
                    pasport.removeAttribute('data-v-name')
                }
            })
        }

        if(pasportOffices.length > 0) {
            pasportOffices.forEach(pasportOffice => {
                if(maskOn) {
                    Inputmask({
                        'mask': '999-999',
                        'showMaskOnHover': false
                    }).mask(pasportOffice);
                    pasportOffice.setAttribute('data-v-name', 'pasportOffice')
                } else {
                    Inputmask.remove(pasportOffice)
                    pasportOffice.removeAttribute('data-v-name')
                }
            })
        }
    }
}

function inputMasksInit(form) {

    pasportMasksInit(form)

    const phones = form.querySelectorAll('input[data-type="phoneNumber"]');
    const dates = form.querySelectorAll('input[data-type="date"]');
    const numbers = form.querySelectorAll('input[data-type="number"]');
    const floats = form.querySelectorAll('input[data-type="float"]');
    const letters = form.querySelectorAll('input[data-type="letters"]');
    const vins = form.querySelectorAll('input[data-type="vin"]');

    if(phones.length > 0) {
        phones.forEach(phone => {
            Inputmask({
                'mask': '+7 (999) 999-99-99',
                'showMaskOnHover': false
            }).mask(phone); 
        })
    }

    if(dates.length > 0) {
        dates.forEach(date => {
            const dateMaskFormat =  '99.99.9999';
            const today = new Date()
            const position = date.dataset.position === 'top' ? 'top left' : 'bottom left'
            const year18YearsAgo = today.getFullYear() - 18;
            const maxDate = date.getAttribute('data-v-name') === 'age' ? new Date(year18YearsAgo, today.getMonth(), today.getDate()) : ''
            

            new AirDatepicker(date, {
                dateFormat: 'dd.MM.yyyy',
                minDate: '',
                maxDate: maxDate,
                position: position
            })
    
            Inputmask({
                'mask': dateMaskFormat,
                'showMaskOnHover': false
            }).mask(date);

            date.addEventListener('input', dateMask)

        })
    }

    if(numbers.length > 0) {
        numbers.forEach(number => {
            number.addEventListener('input', function(e){
                let val = e.target.value.replace(/\D/g, "");
                this.value = val;
            })
        })
    }

    if(floats.length > 0) {
        floats.forEach(float => {
            float.addEventListener('input', function(e){
                let firstDotFound = false;
                let val = e.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.').replace(/\./g, (match) => {
                    if (!firstDotFound) {
                    firstDotFound = true;
                    return '.';
                    }
                    return '';
                });

                this.value = val;
            })
        })
    }

    if(letters.length > 0) {
        letters.forEach(letter => {
            letter.addEventListener('input', function(e){
                let val = e.target.value.replace(/[^А-Яа-яA-Za-z\s-]/g, "");
                this.value = val;
            })
        })
    }

    if(vins.length > 0) {
        vins.forEach(vin => {
            vin.addEventListener('input', function(e){
                let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 17).toUpperCase();
                this.value = val;
            })
        })
    }

    function dateMask(e) {

        let val = e.target.value.replace(/\D/g, "");

        if(val.length == 1 && parseInt(val) > 3) {
            val = '3'
        }

        if(val.length == 2 && parseInt(val) > 31) {
        val = '31'
        }

        if(val.length == 3 && parseInt(val.substring(2)) > 1) {
        val = val.slice(0, 2) + "1";
        }
        
        if(val.length == 4 && parseInt(val.substring(2)) > 12) {
        val = val.slice(0, 2) + "12";
        }

        if(val.length == 10 && parseInt(val.substring(8)) > 23) {
            val = val.slice(0, 8) + "23";
        }
        
        if(val.length == 12 && parseInt(val.substring(10)) > 59) {
            val = val.slice(0, 10) + "59";
        }
        
        this.value = val;
    }
}

function toggleLoading(form, on) {
    const formSubmitBtn = form.querySelector(".btn.form__submit")

    if(on) {
        const loadingIcon = document.createElement('span')
        loadingIcon.classList.add('load-icon')
        loadingIcon.innerHTML = `<svg fill="none" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/></svg>`

        formSubmitBtn.appendChild(loadingIcon)
        formSubmitBtn.classList.add('loading')
    } else {
        formSubmitBtn.classList.remove('loading')
        const loadingIcon = formSubmitBtn.querySelector('.load-icon')

        if(loadingIcon) {
            loadingIcon.remove()
        }
    }
}

function formSpoilerController(form) {
    const spoiler = form.querySelector('[data-js="formSpoilerContent"]')
    const toggle = form.querySelector('[data-js="formSpoilerToggle"]')
    const ww = window.innerWidth

    if(!spoiler) return
    
    if(!toggle || ww < 768) {
        spoiler.style.maxHeight = 'none'
        return
    }

    const visibleRows = 2
    const oneRow = spoiler.querySelector('[data-js="formSpoilerRow"]')
    const rowHeight = oneRow.offsetHeight
    const gap = parseInt(window.getComputedStyle(spoiler).rowGap)

    const minHeight = rowHeight * visibleRows + (visibleRows - 1) * gap
    const maxHeight = spoiler.scrollHeight

    spoiler.style.maxHeight = minHeight + 'px'

    toggle.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()

        if(this.classList.contains('expanded')) {
            this.classList.remove('expanded');
            spoiler.style.maxHeight = minHeight + 'px'
        } else {
            this.classList.add('expanded');
            spoiler.style.maxHeight = maxHeight + 'px'
        }
    })
}

function formReset(form) {
    const fileFields = form.querySelectorAll('.field-file[data-js="formField"]')
    const selectFields = form.querySelectorAll('[data-js="formSelect"]')

    form.reset();
    form.classList.remove('form--ready')

    if(fileFields.length > 0) {
        fileFields.forEach(fileField => {
            let placeholderText = fileField.getAttribute('data-placeholder');
            let fileName = fileField.querySelector('[data-js="fileName"]');

            fileField.classList.remove('field-file--full');
            fileName.innerHTML = placeholderText;

        })
    }

    if(selectFields.length > 0) {
        selectFields.forEach(selectField => {
            $(selectField).val("").trigger('change')
        })
    }
}

function thanksMessageShow(form) {
    if(form.dataset.thanks) {
        modals.open(form.dataset.thanks)
    }
}

function isAdult(dateStr) {
  const parts = dateStr.split('.');
  if (parts.length !== 3) return false;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const birthDate = new Date(year, month, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}
