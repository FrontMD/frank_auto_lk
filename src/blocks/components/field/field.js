function fieldsController() {
    const fields = document.querySelectorAll('[data-js="formField"]')

    if(fields.length < 1) return

    fields.forEach(field => {
        //const resetBtn = field.querySelector('[data-js="fieldResetBtn"]');
        //const input = field.querySelector('input');
        //const hasPrompt = field.hasAttribute('data-has-prompt')
        //const fieldPrompt = field.querySelector('[data-js="fieldPrompt"]');

        /*if(resetBtn && input) {
            resetBtn.addEventListener('click', function() {
                input.value = ''
                input.dispatchEvent(new Event('change'));
            })
        }*/

        /*if(fieldPrompt && hasPrompt && input) {
            input.addEventListener('input', promptToggle)
            input.addEventListener('change', promptToggle)
        }*/

        /*function promptToggle() {
            if(input.value.length > 0) {
                fieldPrompt.classList.add('active')
            } else {
                fieldPrompt.classList.remove('active')
            }
        }*/
    })
    
}

function selects() {
	const formSelects = document.querySelectorAll("[data-js='formSelect']")

	formSelects.forEach(formSelect => {
		let placeholder = $(formSelect).attr('data-placeholder')

		$(formSelect).select2({
			placeholder: placeholder,
			allowClear: true
		});
	}) 

	$("[data-js='formSelect']").on('select2:open', () => {
		$(".select2-dropdown").addClass("select2-dropdown--form")
	})

}
