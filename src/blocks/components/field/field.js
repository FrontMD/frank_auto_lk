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
