
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

class CleanAndPress extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <input type="number" id="${this.id}" placeholder="Clean & Press" class="form-control" onchange="persist(this)"/>
        `
    }
}

class Squat extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <input type="number" id="${this.id}" placeholder="Squat" class="form-control" onchange="persist(this)"/>
        `
    }
}

class Weight extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <input type="number" id="${this.id}" class="form-control" style="width: 100px; margin-left: 30px; display: inline;" onchange="persist(this)"/>
        `
    }
}


customElements.define('clean-press', CleanAndPress);
customElements.define('squat-b', Squat);
customElements.define("kb-weight", Weight)
