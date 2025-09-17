function fieldPhotosController() {

    const photoBlocks = document.querySelectorAll('[data-js="fieldPhotos"]')

    if(photoBlocks.length < 1) return
    
    const newFieldHtml = `
                            <input class="field-photos__input" type="file" 'accept'=".png, .jpg, .jpeg, .webp">
                            <div class="field-photos__img">
                            <img src="" alt=""></div>
                            <div class="field-photos__remove" data-js="fieldPhotosRemove">
                            <svg>
                                <use xlink:href="img/sprites/sprite.svg#close"></use>
                            </svg>
                            </div>
                        `

                            
    photoBlocks.forEach(photoBlock => {
        const label = photoBlock.querySelector('[data-js="fieldPhotosLabel"]')

        label.addEventListener('click', function() {
            const newField = document.createElement('div')
            newField.classList.add('field-photos__item')
            newField.setAttribute('data-js',"fieldPhotosItem")
            newField.innerHTML = newFieldHtml

            const newFieldInput = newField.querySelector('input')

            newFieldInput.click()

            newFieldInput.addEventListener('change', function() {
                let selectedFile = this.files[0];
                let reader = new FileReader();
                let targetField = this.closest('[data-js="fieldPhotosItem"]');
                let targetFieldImg = targetField.querySelector("img");
                
                reader.onload = function (event) {
                    let result = event.target.result

                    if(result.startsWith('data:image/jpeg') || result.startsWith('data:image/pjpeg') || result.startsWith('data:image/png') || result.startsWith('data:image/webp') ) {
                        targetFieldImg.setAttribute('src', result);
                        newField.classList.add('visible')
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
            })

            photoBlock.insertBefore(newField, label)
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