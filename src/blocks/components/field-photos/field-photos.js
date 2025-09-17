function fieldPhotosController() {

    const fields = document.querySelectorAll('[data-js="fieldPhotos"]')

    /*const filesBlock = form.querySelector(".form__files");
    const addFileBtn = filesBlock.querySelector(".form__more-files");
    const newFieldHtml = `<div class="form__file-bg"></div>
                                        <input type="file" class="form__input" name="photo[]" multiple="multiple">
                                        <img loading="lazy" src="/local/templates/bikecenter_main/components/bikecenter/unity/trade-in/img/arrow-top.svg" alt="">
                                        <span>Перетащите изображение либо нажмите, чтобы добавить</span>
                                        <div class="form__file-overlay">
                                            <div class="form__file-delete">
                                                <img loading="lazy" src="/local/templates/bikecenter_main/components/bikecenter/unity/trade-in/img/close.svg" alt="">
                                            </div>
                                        </div>`

    //Добавляем обработчик полей файл
    addFileFieldHandler();
    addDragAndDropFileHandler();

    if (window.innerWidth > 768) {
        for (let i = 0; i < 5; i++) {
            let newField = document.createElement('label');
            newField.classList.add('form__file', '_empty');
            newField.innerHTML = newFieldHtml;
            addFileBtn.before(newField);
        }
        filesBlock.querySelectorAll("input[type='file']").forEach(function (item) {
            addFileFieldHandler();
            addDragAndDropFileHandler();
        })
    }

    //Обработчик кнопки "ещё" - добавляет новое поле
    addFileBtn.addEventListener('click', function () {
        let newField = document.createElement('label');
        newField.classList.add('form__file', '_empty');
        newField.innerHTML = newFieldHtml;
        addFileBtn.before(newField);
        filesBlock.querySelectorAll("input[type='file']").forEach(function (item, index) {
            if (index == 9) {
                addFileBtn.classList.add('_hidden');
            }
            addFileFieldHandler();
            addDragAndDropFileHandler();
        })
        /*newField.click(); //тут вызов загрузки сразу после добавления поля.
    })

    //Добавляет обработчики полей "файл"
    function addFileFieldHandler() {
        filesBlock.querySelectorAll("input[type='file']").forEach(function (item) {
            item.addEventListener('change', fileFieldHandler)
        })
    }

    //Удаляет обработчики полей "файл"
    function removeFileFieldHandler() {
        filesBlock.querySelectorAll("input[type='file']").forEach(function (item) {
            item.removeEventListener('change', fileFieldHandler)
        })
    }

    //Добавляет drag-n-drop обработчик
    function addDragAndDropFileHandler() {
        filesBlock.querySelectorAll("label.form__file:not(._full)").forEach(function (item) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                item.addEventListener(eventName, dragAndDropFileHandler, false)
            })
        })
    }

    //добавляет кнопку "ещё" если полей меньше 10
    function addMoreBtn() {
        let triggerEmptyField = true;
        filesBlock.querySelectorAll("input[type='file']").forEach(function (el, index, array) {
            if (el.files.length == 0 || array.length > 9) {
                triggerEmptyField = false;
            }
        })
        if (triggerEmptyField) {
            addFileBtn.classList.remove('_hidden');
            removeFileFieldHandler();
        }
    }

    //подставляет картинку в фон поля
    function showImg(targetInput) {
        let selectedFile = targetInput.files[0];
        let reader = new FileReader();
        let targetField = targetInput.closest("label.form__file");
        let targetFieldBg = targetField.querySelector(".form__file-bg");

        reader.onload = function (event) {
            targetFieldBg.style.backgroundImage = `url(${event.target.result})`;
        };

        reader.readAsDataURL(selectedFile);
        targetField.classList.remove('_empty')
        targetField.classList.add('_full');
        targetField.querySelector('.form__file-overlay').addEventListener('click', fileDeleteHandler);
    }

    //Обработчик изменения поля файл
    function fileFieldHandler() {
        //убираем кнопку "ещё" если полей больше 10
        if (filesBlock.querySelectorAll("input[type='file']").length >= 10) {
            addFileBtn.classList.add('_hidden');
        }

        //подставляем фото в фон элемента
        if (event.target.files.length > 0) {
            showImg(event.target)
        }

        fullFileFieldsCounter();

    }

    //обработчик удаления файла
    function fileDeleteHandler() {
        if (event.target.closest('.form__file-delete')) {
            event.stopPropagation();
            event.preventDefault();
            event.target.closest("label.form__file").remove();
            addMoreBtn();
        } else if (event.target.classList.contains('form__file-overlay') && window.screen.width < 768) {
            event.stopPropagation();
            event.preventDefault();
        }

        fullFileFieldsCounter();
    }

    //обработчик drag and drop событий
    function dragAndDropFileHandler() {
        event.preventDefault()
        event.stopPropagation()

        let targetDropArea = event.target.closest('.form__file')
        let targetInput = targetDropArea.querySelector('input')

        if (event.type === 'dragenter' || event.type === 'dragover') {
            targetDropArea.classList.add('_highlight');
        } else if (event.type === 'dragleave' || event.type === 'drop') {
            targetDropArea.classList.remove('_highlight');
        }

        if (event.type === 'drop') {
            let filesData = event.dataTransfer;
            let fileList = filesData.files;
            let newDataTransfer = new DataTransfer();

            newDataTransfer.items.add(fileList.item(0));
            targetInput.files = newDataTransfer.files;

            showImg(targetInput)

            let i;
            for (i = 1; i < fileList.length; i++) {
                let existingFullFields = filesBlock.querySelectorAll('.form__file._full').length;

                if (existingFullFields > 9) break

                let existingEmptyFields = filesBlock.querySelectorAll('.form__file._empty');

                let newDataTransfer = new DataTransfer();
                let targetInput;
                if (existingEmptyFields.length > 0) {
                    targetInput = existingEmptyFields[0].querySelector('input');
                } else {
                    let newField = document.createElement('label');
                    newField.classList.add('form__file');
                    newField.innerHTML = newFieldHtml;
                    addFileBtn.before(newField);
                    targetInput = newField.querySelector('input');
                }


                newDataTransfer.items.add(fileList.item(i));
                targetInput.files = newDataTransfer.files;

                showImg(targetInput);
            }

            if (filesBlock.querySelectorAll("input[type='file']").length >= 10) {
                addFileBtn.classList.add('_hidden');
            }

            filesBlock.querySelectorAll("input[type='file']").forEach(function (item) {
                addFileFieldHandler();
                addDragAndDropFileHandler();
            })
        }

        fullFileFieldsCounter();

    }*/

    /*Счётчик заполненых полей Файл*/
    function fullFileFieldsCounter() {
        const photoCount = filesBlock.querySelector("input[name='photoCount']");
        photoCount.value = [...filesBlock.querySelectorAll(".form__file._full")].length;
        photoCount.dispatchEvent(new Event('change'));
    }
    
}