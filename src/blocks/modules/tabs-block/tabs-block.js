function tabsBlockInit() {
    const tabsBlock = document.querySelector('[data-js="tabsBlock"]');

    if(!tabsBlock) return

    const slidesList = tabsBlock.querySelectorAll('[data-js="tabsBlockSlide"]')
    const tabsList = tabsBlock.querySelectorAll('[data-js="tabsBlockTab"]')

    let tabsHeight = tabsBlock.offsetHeight

    tabsList.forEach(tab => {
        tab.addEventListener('click', e => {

            currentTab = e.target.closest('[data-js="tabsBlockTab"]')
            currentIndex = currentTab.dataset.index

            tabsList.forEach(iTab => {
                iTab.classList.remove('active')
            })

            currentTab.classList.add('active')

            slidesList.forEach((slide, index) => {
                if(index == currentIndex) {
                    slide.classList.add('active')
                    slide.dispatchEvent(new CustomEvent("activatedSlide"))
                } else {
                    slide.classList.remove('active')
                }
            })

            if(tabsHeight !== tabsBlock.offsetHeight) {
                tabsHeight = tabsBlock.offsetHeight;

                scrollTriggerRefresh(400)
            }

        })
    })

}