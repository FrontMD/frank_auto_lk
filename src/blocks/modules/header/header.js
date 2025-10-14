function headerController() {
    const header = document.querySelector('[data-js="siteHeader"]')

    if(!header) return

    // высота по скроллу
   /*let lastScroll = window.scrollY ? window.scrollY : 0

    if(lastScroll > 10) {
        header.classList.add('small')
    }

    window.addEventListener('scroll', function() {
        let currentScroll = window.scrollY
        toggleHeader(lastScroll, currentScroll)
        lastScroll = currentScroll
    })

    function toggleHeader(lastScroll, currentScroll) {
        if(currentScroll <= lastScroll || currentScroll === 0) {
            header.classList.remove('small')
        } else {
            header.classList.add('small')
        }
    }*/

    // открытие бургера
    const burger = document.querySelector('[data-js="headerBurger"]')

    console.log('init:')
    console.log(burger)

    if(burger) {
        console.log('hasBurger:')
        console.log(burger)
        const burgerToggle = burger.querySelector('[data-js="headerBurgerToggle"]')

        console.log('hasToggle:')
        console.log(burgerToggle)

        burgerToggle.addEventListener('click', (e) => {
            console.log('clickedToggle:')
            console.log(e.target)

            const ww = window.innerWidth
            if(burger.classList.contains('active')) {
                burger.classList.remove('active')
                unlockBody()
            } else {
                burger.classList.add('active')
                lockBody()
            }
        })

        // подменю в бургере 
        const menuItems = burger.querySelectorAll('[data-js="headerMenuItem"]')

        if(menuItems.length > 0) {
            menuItems.forEach(item => {
                const submenu = item.querySelector('[data-js="headerMenuItemSubmenu"]')
                const minHeight = 0

                if(submenu) {
                    const maxHeight = submenu.scrollHeight

                    const openBtn = item.querySelector('[data-js="headerMenuItemOpen"]')
                    const closeBtn = item.querySelector('[data-js="headerMenuItemClose"]')

                    openBtn.addEventListener('click', () => {
                        submenu.style.maxHeight = maxHeight + 'px'
                        item.classList.add('active')
                    })

                    closeBtn.addEventListener('click', () => {
                        submenu.style.maxHeight = minHeight + 'px'
                        item.classList.remove('active')
                    })
                }
            })
        }
    }
}