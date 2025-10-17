function sortController() {
	const sortControllers = document.querySelectorAll("[data-js='sortController']")

	if(sortControllers.length > 0) {
		sortControllers.forEach(sortController => {
			const header = sortController.querySelector('[data-js="sortControllerHeader"]')
			
			header.addEventListener('click', function(e) {
				e.stopPropagation();

				if(sortController.classList.contains('active')) {
					sortController.classList.remove('active');
					document.removeEventListener('click', handleDocumentClick);
				} else {
					sortController.classList.add('active');
					document.addEventListener('click', handleDocumentClick);
				}
			});

			function handleDocumentClick(e) {
			if (!e.target.closest('[data-js="sortController"]')) {
			sortController.classList.remove('active');
			document.removeEventListener('click', handleDocumentClick);
			}
		}
		})
	}

		
}
