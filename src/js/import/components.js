
@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/form-filter/form-filter.js")
@@include("../../blocks/components/field/field.js")
@@include("../../blocks/components/spoiler/spoiler.js")

document.addEventListener('DOMContentLoaded', () => {
    fieldsController();
    selects();
    spoilers();
    catalogFilter()
})

window.addEventListener('load', function() { 
    formFilterController();
    validation();
});