function fieldPhotosController() {

    const photoBlocks = document.querySelectorAll('[data-js="fieldPhotos"]')

    if(photoBlocks.length < 1) return

    if (typeof window.distPath == 'undefined') {
        window.distPath = '';
    }
    
    const newFieldHtml = `
                            <input type="hidden">
                            <input class="field-photos__input" type="file" accept=".png, .jpg, .jpeg, .webp">
                            <div class="field-photos__img">
                            <img src="" alt=""></div>
                            <div class="field-photos__remove" data-js="fieldPhotosRemove">
                            <svg>
                                <use xlink:href="${window.distPath}img/sprites/sprite.svg#close"></use>
                            </svg>
                            </div>
                        `

                            
    photoBlocks.forEach(photoBlock => {
        const label = photoBlock.querySelector('[data-js="fieldPhotosLabel"]')
        const fieldHidden = photoBlock.dataset.hidden
        const fieldName = photoBlock.dataset.name
        const startItems = photoBlock.querySelectorAll('[data-js="fieldPhotosItem"]')
        const isEditPage = photoBlock.getAttribute('data-page') === 'edit' ? true : false

        let inputsCount = 0

        if(startItems.length > 0) {
            startItems.forEach(startItem => {
                const imgPath = startItem.querySelector('img').getAttribute('src')
                const imgName = imgPath.substring(imgPath.lastIndexOf('/') + 1);
                
                fetch(imgPath)
                .then(response => response.blob())
                .then(blob => {
                    const file = new File([blob], imgName);
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    const input = startItem.querySelector('input[type="file"]')
                    const inputHidden = startItem.querySelector('input[type="hidden"]')

                    input.files = dataTransfer.files;

                    input.setAttribute('name', `${isEditPage ? fieldName : fieldName + inputsCount}`)
                    inputHidden.setAttribute('name', fieldHidden + '[' + inputsCount + ']')

                    inputsCount++
                });
            })
        }

        label.addEventListener('click', function() {

            const commonInput = document.createElement('input')
            setAttributes(commonInput, {
                class: 'field-photos__common',
                type: 'file',
                multiple: '',
                accept: '.png, .jpg, .jpeg, .webp',
            });

            commonInput.click()

            commonInput.addEventListener('change', function() {
                for (const currentFile of commonInput.files) {
                    const newField = document.createElement('div')
                    newField.classList.add('field-photos__item')
                    newField.setAttribute('data-js',"fieldPhotosItem")
                    newField.innerHTML = newFieldHtml
        
                    const newFieldInput = newField.querySelector('input[type="file"]')
                    const newFieldHidden = newField.querySelector('input[type="hidden"]')
        
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(currentFile);
                    newFieldInput.files = dataTransfer.files;
        
          
                        
                        let selectedFile = newFieldInput.files[0];
                        let reader = new FileReader();
                        let targetField = newFieldInput.closest('[data-js="fieldPhotosItem"]');
                        let targetFieldImg = targetField.querySelector("img");
                        
                        reader.onload = function (event) {
                            let result = event.target.result
        
                            if(result.startsWith('data:image/jpeg') || result.startsWith('data:image/pjpeg') || result.startsWith('data:image/png') || result.startsWith('data:image/webp') ) {
                                targetFieldImg.setAttribute('src', result);
                                newField.classList.add('visible')
                                 newFieldInput.setAttribute('name', `${isEditPage ? fieldName : fieldName + inputsCount}`)
                                newFieldHidden.setAttribute('name', fieldHidden + '[' + inputsCount + ']')
                                inputsCount++
                            } else {
                                newField.remove()
                                label.classList.add('error')
        
                                setTimeout(function() {
                                    label.classList.remove('error')
                                }, 3000)
        
                                return
                            }
        
                        };

                        
                        reader.readAsDataURL(selectedFile);
          
        
                    photoBlock.insertBefore(newField, label)
                }

                commonInput.remove()
            })

        })

        photoBlock.addEventListener('click', function(event) {
            if(event.target.closest('[data-js="fieldPhotosRemove"]')) {
                event.preventDefault()
                event.stopPropagation()

                event.target.closest('[data-js="fieldPhotosItem"]').remove()
            }
        })
    })
    
}

function setAttributes(el, attrs) {
  Object.keys(attrs).forEach(key => {
    el.setAttribute(key, attrs[key]);
  });
}