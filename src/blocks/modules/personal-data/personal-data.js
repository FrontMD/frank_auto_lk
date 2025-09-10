function pdContactsController() {
    const pdContactsBlocks = document.querySelectorAll('[data-js="pdContacts"]')

    if(pdContactsBlocks.length < 1) return

    const nameLayout = 'Контактное лицо №'
    const contactLayout = `
                                <div class="pd-contact__header">
                                  <div class="pd-contact__name" data-js="pdContactName"></div>
                                  <button class="pd-contact__remove" data-js="pdContactsRemove">
                                    <svg>
                                      <use xlink:href="img/sprites/sprite.svg#urn"></use>
                                    </svg>
                                  </button>
                                </div>
                                <div class="pd-contact__fields">
                                      <div class="field "data-js="formField">
                                        <label>
                                          <input class="field__input" type="text" placeholder="" required="" data-type="letters">
                                            <span class="field__placeholder">Фамилия</span>
                                            <span class="field__error" data-js="fieldError"></span>
                                        </label>
                                      </div>
                                      <div class="field "data-js="formField">
                                        <label>
                                          <input class="field__input" type="text" placeholder="" required="" data-type="letters">
                                          <span class="field__placeholder">Имя</span>
                                          <span class="field__error" data-js="fieldError"></span>
                                        </label>
                                      </div>
                                      <div class="field "data-js="formField">
                                        <label>
                                          <input class="field__input" type="text" placeholder="" data-type="letters">
                                          <span class="field__placeholder">Отчество</span>
                                          <span class="field__error" data-js="fieldError"></span>
                                        </label>
                                      </div>
                                      <div class="field "data-js="formField">
                                        <label>
                                          <input class="field__input" type="text" placeholder="" required="" data-v-name="phone" data-type="phoneNumber">
                                          <span class="field__placeholder">Номер телефона</span>
                                          <span class="field__error" data-js="fieldError"></span>
                                        </label>
                                      </div>
                                </div>
                        `

    pdContactsBlocks.forEach(block => {
        const contactsList = block.querySelector('[data-js="pdContactsList"]');
        const addBtn = block.querySelector('[data-js="pdContactsAdd"]');

        addBtn.addEventListener('click', function() {
            const newContact = document.createElement('div')
            newContact.classList.add('pd-contact')
            newContact.setAttribute('data-js', 'pdContactsItem')
            newContact.innerHTML = contactLayout

            let name = newContact.querySelector('[data-js="pdContactName"]')
            name.innerHTML = nameLayout + (contactsList.querySelectorAll('[data-js="pdContactsItem"]').length + 1)

            contactsList.appendChild(newContact)
        })

        contactsList.addEventListener('click', function(e) {
            const target = e.target

            if(target.closest('[data-js="pdContactsRemove"]')) {
                e.preventDefault()
                e.stopPropagation()
                
                if(contactsList.querySelectorAll('[data-js="pdContactsItem"]').length > 1) {
                    target.closest('[data-js="pdContactsItem"]').remove();
                    
                    const contactsItems = contactsList.querySelectorAll('[data-js="pdContactsItem"]')
                    contactsItems.forEach((item, index) => {
                        let name = item.querySelector('[data-js="pdContactName"]')
                        name.innerHTML = nameLayout + (index + 1)
                        console.log(name)
                    })
                }
            }
            
        })
    })
}