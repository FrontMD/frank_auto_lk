function spoilers() {
    const accordions = document.querySelectorAll("[data-js='accordion']");

	if(accordions.length < 1) return

	accordions.forEach(accordion => {

		let firstSpoiler = accordion.querySelector('[data-js="spoiler"]')

		if(firstSpoiler) {
			openSpoiler(firstSpoiler)
		}

		accordion.addEventListener('click', (e) => {
			let eventTarget = e.target


			if(eventTarget.closest('[data-js="spoiler"]')) {
				let clickedSpoiler = eventTarget.closest('[data-js="spoiler"]')

				if(clickedSpoiler.classList.contains('active')) {
					return
				}

				let spoilers = accordion.querySelectorAll('[data-js="spoiler"]')

				spoilers.forEach(spoiler => {
					closeSpoiler(spoiler)
				})

				openSpoiler(clickedSpoiler)
			}
		})
	})

	function openSpoiler(spoiler) {
		const content = $(spoiler).find('[data-js="spoilerContent"]');
		spoiler.classList.add("active");
		$(content).slideDown(400);
	};

	function closeSpoiler(spoiler) {
		const content = $(spoiler).find('[data-js="spoilerContent"]');
		spoiler.classList.remove("active");
		$(content).slideUp(400);
	};
}