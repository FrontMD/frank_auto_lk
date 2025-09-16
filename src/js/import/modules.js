@@include("../../blocks/modules/header/header.js")
@@include("../../blocks/modules/modals/modals.js")
@@include("../../blocks/modules/personal-data/personal-data.js")
@@include("../../blocks/modules/auto-card/auto-card.js")
@@include("../../blocks/modules/e-cars/e-cars.js")

document.addEventListener('DOMContentLoaded', () => {
    modalsInit()
    headerController()
    pdContactsController()
    autoCardInit()
    eCarsController()
})