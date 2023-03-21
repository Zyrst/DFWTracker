
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

function saveMyProgram(nameOfCompleted){
    console.log(nameOfCompleted)
    vals = []
    skip_vals = ["weight1", "weight2"]
    weights = []
    document.querySelectorAll("input").forEach((inputEl) => {
        if (!skip_vals.includes(inputEl.id)){
            value = localStorage.getItem(inputEl.id);
            vals.push(value);
        }
        else{
            weights.push(localStorage.getItem(inputEl.id));
        }
       
    });
    
    vals = vals.map(value => value == null ? "" : value);
    console.log(vals)
    

    hist_storage = localStorage.getItem("history")
    hist = hist_storage == null ? {} : JSON.parse(hist_storage) 

    hist[nameOfCompleted] = {"Weights": weights.toString(), "Reps": vals.toString()}
    localStorage.setItem("history", JSON.stringify(hist))
    resetAll()
    $("#completeModal").modal("hide")
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
