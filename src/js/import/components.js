
@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/form-filter/form-filter.js")
@@include("../../blocks/components/field/field.js")
@@include("../../blocks/components/field-file/field-file.js")
@@include("../../blocks/components/field-photos/field-photos.js")
@@include("../../blocks/components/spoiler/spoiler.js")
@@include("../../blocks/components/sort-controller/sort-controller.js")

document.addEventListener('DOMContentLoaded', () => {
    selects();
    spoilers();
    catalogFilter();
    fileFieldInit();
    fieldPhotosController();
    sortController();
})

window.addEventListener('load', function() { 
    formFilterController();
    validation();
});