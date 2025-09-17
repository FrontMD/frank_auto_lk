function fileFieldInit() {
    const fileFields = document.querySelectorAll('[data-js="formField"] input[type="file"]');

    if(fileFields.length < 1) return

    fileFields.forEach(field => {
        let fieldLabel = field.closest('.field-file');
        let fileName = fieldLabel.querySelector('[data-js="fileName"]');
        let fieldPlaceholder = fileName.innerHTML;
        let fileMaxSize = parseInt(field.getAttribute("data-size"));
        let fileError = fieldLabel.querySelector('[data-js="fieldError"]');

        field.addEventListener('change', () => {
            if(field.files.length > 0) {
                let isInvalidType = true;
                let validAccept= field.getAttribute('accept');
                let currentFileType = field.files[0].type
                let validParams = validAccept === null ? [] : validAccept.replace(/\s/g, '').split(',');

                let validExtentions = [];
                let validTypes = [];
                let validGroups = [];

                if(validParams.length > 0) {
                    //получаем список разрешённых расширений и проверяем загруженный файл на соответствие
                    validExtentions = validParams.filter(item => /^\..+/.test(item));
                    if(validExtentions.length > 0) {
                        let currentFileExtention = field.files[0].name.split('.');
                        currentFileExtention = '.' + currentFileExtention[currentFileExtention.length - 1];
                        
                        for(let i = 0; i < validExtentions.length; i++) {
                            if(validExtentions[i] == currentFileExtention) {
                                
                                isInvalidType = false;
                                break
                            }
                        }
                    }

                    //получаем список разрешённых типов и проверяем загруженный файл на соответствие
                    validTypes = validParams.filter(item => /.+\/.+[^\*]$/.test(item));
                    if(validTypes.length > 0) {
                        for(let i = 0; i < validTypes.length; i++) {
                            if(validTypes[i] == currentFileType) {
                                
                                isInvalidType = false;
                                break
                            }
                        }
                    }

                    //получаем список разрешённых групп и проверяем загруженный файл на соответствие
                    validGroups = validParams.filter(item => /\/\*$/.test(item));

                    if(validGroups.length > 0) {
                        for(let i = 0; i < validGroups.length; i++) {
                            let currentValidGroup = validGroups[i].replace(/\*$/, '');
                            if(currentFileType.startsWith(currentValidGroup)) {
                               
                                isInvalidType = false;
                                break
                            }
                        }
                    }


                } else {
                    isInvalidType = false;
                }

                //проверяем размер файла
                if(!isNaN(fileMaxSize) && field.files[0].size > fileMaxSize) {
                    field.value = '';
                    fieldLabel.classList.remove('field-file--full');
                    fieldLabel.classList.add('field--invalid');
                    fileName.innerHTML = fieldPlaceholder;
                    fileError.innerHTML = 'Файл превышает допустимый размер';
                //проверяем тип файла
                } else if(isInvalidType) {
                    field.value = '';
                    fieldLabel.classList.remove('field-file--full');
                    fieldLabel.classList.add('field--invalid');
                    fileName.innerHTML = fieldPlaceholder;
                    fileError.innerHTML = `Перезагрузите файл в формате ${validParams.join(', ')}`;
                }  else {
                    fieldLabel.classList.remove('field--invalid');
                    fieldLabel.classList.add('field-file--full');
                    fileName.innerHTML = field.files[0].name;
                    fileError.innerHTML = '';
                }
            } else {
                fieldLabel.classList.remove('field-file--full')
                fileName.innerHTML = fieldPlaceholder;
            }
        })

    })
}