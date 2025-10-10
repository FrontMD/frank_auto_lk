function selects() {
	const formSelects = document.querySelectorAll("[data-js='formSelect']")

	formSelects.forEach(formSelect => {
		let placeholder = $(formSelect).attr('data-placeholder')

		$(formSelect).select2({
			placeholder: placeholder,
			allowClear: true
		});


		const field = formSelect.closest('[data-js="formField"]')

		if(!field.classList.contains('field--sort')) {
			const placeholderEl = document.createElement('span');
			placeholderEl.innerHTML = placeholder;
			placeholderEl.classList.add('field__placeholder', 'field__placeholder--select')
	
			formSelect.insertAdjacentElement('afterend', placeholderEl);
		}

	}) 

	$("[data-js='formSelect']").on('select2:open', function() {
		$(".select2-dropdown").addClass("select2-dropdown--form")

		const field = this.closest('[data-js="formField"]')

		if(field.classList.contains('has-search')) {
			$(".select2-search.select2-search--dropdown").addClass('active')
		}
	})

	$("[data-js='formSelect']").on('select2:select', function() {
		const field = this.closest('[data-js="formField"]')
		const placeholder = field.querySelector('.field__placeholder.field__placeholder--select')
		placeholder.classList.add('active')
	})
}
