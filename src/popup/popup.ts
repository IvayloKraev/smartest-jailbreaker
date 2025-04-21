const toggleButton = document.getElementById("toggleButton") as HTMLButtonElement;
const toggleButtonText =  document.getElementById("toggleButtonText") as HTMLSpanElement;

interface IState {
    active: boolean;
    settings: {

    }
}

const state: IState = {
    active: false,
    settings: {
    }
}

init();

function init() {
    const stringState = localStorage.getItem("state");
    const temp = stringState ? JSON.parse(stringState) as IState : undefined;
    if(!temp) {
        state.active = false;
        state.settings = {};
        return;
    }
    state.active = temp.active;
    state.settings = temp.settings;
    setStateText(state.active)
}

function setStateText(active: boolean) {
    toggleButtonText.innerText =  active ? 'Active' : 'Unactive';
}


toggleButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.active =! state.active;
    setStateText(state.active)
    localStorage.setItem("state", JSON.stringify(state));

})