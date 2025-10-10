function autoCardInit() {
    const autoCards = document.querySelectorAll('[data-js="autoCard"]')

    if(autoCards.length > 0) {
        autoCards.forEach(autoCard => {
            const slider = autoCard.querySelector('[data-js="autoCardSlider"]')
            const thumbs = autoCard.querySelector('[data-js="autoCardThumbs"]')
            const prev = slider.querySelector('[data-js="sliderPrev"]')
            const next = slider.querySelector('[data-js="sliderNext"]')
    
            const thumbsEx = new Swiper(thumbs, {
                slidesPerView: 5,
                spaceBetween: 10,
            })
            
            const sliderEx = new Swiper(slider, {
                slidesPerView: 1.2,
                spaceBetween: 10,
                loop: true,
                thumbs: {
                    swiper: thumbs
                },
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1
                    }
                }
            })
        })
    }

    const acTables = document.querySelectorAll('[data-js="acTable"]')

    if(acTables.length > 0 && window.innerWidth < 2000) {
        acTables.forEach(table => {
            const minRows = parseInt(table.dataset.rows);
            const rowsBlock = table.querySelector('[data-js="acTableRows"]');
            const rowsList = rowsBlock.querySelectorAll('[data-js="acTableRow"]');
            const gap = parseInt(window.getComputedStyle(rowsList[2]).marginTop)
            const maxHeight = parseInt(rowsBlock.scrollHeight)
            const minHeight = minRows * rowsList[0].offsetHeight + gap * (minRows - 1)

            
            if(rowsList.length > minRows) {
                rowsBlock.style.maxHeight = minHeight + 'px'

                const btn = document.createElement('button');
                btn.classList.add('ac-table__all')
                btn.setAttribute('type', 'button')
                
                btn.innerHTML = `<span class="show">Все характеристики</span><span class="hide">Свернуть</span>`
                
                table.appendChild(btn)
                
                btn.addEventListener('click', function(e) {
                    if(this.classList.contains('expanded')) {
                        this.classList.remove('expanded')
                        rowsBlock.style.maxHeight = minHeight + 'px'
                    } else {
                        this.classList.add('expanded')
                        rowsBlock.style.maxHeight = maxHeight + 'px'
                    }
                })
            }
        })
    }
}