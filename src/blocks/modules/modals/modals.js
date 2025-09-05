
let modals = false

function modalsInit() {
    modals = new HystModal({
        linkAttributeName: "data-modal",
        catchFocus: false,
        beforeOpen: function(e){
            lockBody(true)
        },
        afterClose: function(){
            unlockBody()
        },
    });
}
