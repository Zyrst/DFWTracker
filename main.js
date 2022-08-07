
function loadFromStorage() {
    document.querySelectorAll("input").forEach((inputEl) => {
        inputEl.value = localStorage.getItem(inputEl.id);
    });
}

function resetAll(){
    document.querySelectorAll("input").forEach((inputEl) => {
        localStorage.removeItem(inputEl.id)
        inputEl.value = ''
    });
}

function persist(event){
    localStorage.setItem(event.id, event.value);
}