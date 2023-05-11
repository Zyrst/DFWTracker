
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

function getCurrentReps(){
    vals = []
    skip_vals = ["weight1", "weight2"]
    weights = []
    document.querySelectorAll("input").forEach((inputEl) => {
        if (!skip_vals.includes(inputEl.id)){
            console.log(inputEl.id)
            if (inputEl.id != "name"){
                value = localStorage.getItem(inputEl.id);
                vals.push(value);
            }
        }
        else {
            weights.push(localStorage.getItem(inputEl.id));
        }
       
    });
    
    vals = vals.map(value => value == null ? "" : value);

    return [vals, weights]
}

function saveMyProgram(nameOfCompleted){
    
    return_items = getCurrentReps()
    vals = return_items[0]
    weights = return_items[1]
    console.log(vals)
    

    hist_storage = localStorage.getItem("history")
    hist = hist_storage == null ? {} : JSON.parse(hist_storage) 

    hist[nameOfCompleted] = {"Weights": weights.toString(), "Reps": vals.toString()}
    localStorage.setItem("history", JSON.stringify(hist))
    resetAll()
    $("#completeModal").modal("hide")
}

function loadGraph(){
    TESTER = document.getElementById("historic_graph");
    
    hist_storage = localStorage.getItem("history")
    hist = hist_storage == null ? {} : JSON.parse(hist_storage)
    if (Object.keys(hist).length == 0)
        return;

    plotting = []
    for(const [key, val] of Object.entries(hist)){
        console.log(key, val);
        reps = val["Reps"].split(",")
        push_reps = []
        for (var i = 0; i < reps.length; i++){
            as_int = parseInt(reps[i])
            if (isNaN(as_int))
                as_int = 0
                push_reps.push(as_int)
            
        }
        plotting.push({
            y: push_reps,
            mode: 'lines+markers',
            name: key
        })

    }
    layout = {
        title: "History"
    }

    current_reps = getCurrentReps()
    vals = current_reps[0]
    plotting.push({y: vals, mode: 'lines+markers', name: "Current"})

    Plotly.newPlot(TESTER, plotting, layout);
}

class CleanAndPress extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <input type="number" tabindex="${this.order}" id="${this.id}" placeholder="Total rep" class="form-control" onchange="persist(this)"/>
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
customElements.define("kb-weight", Weight)
