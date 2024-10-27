const myDate = new Date();
const body = document.body;

let listArray = [];

let listGroup = document.querySelector(".list-group");
let addInput = document.getElementById("add-input");
let addButton = document.getElementById("add-button");

const addSave = document.getElementById("add-save");
const addDelete = document.getElementById("add-delete");
const addCancel = document.getElementById("add-cancel");

getList();

function getList() {
    let addHtmlM = ``;
    if (listArray.length !== 0) {
        for (let list_index of listArray) {
            addHtmlM += `
                <button type="button" id="${list_index.id}" onclick="detailPage(${list_index.id})" class="list-group-item list-group-item-action position-relative d-flex justify-content-between">
                    <span class="position-absolute top-0 start-25 translate-middle badge rounded-pill bg-danger">${list_index.id + 1}</span>
                    <span>
                        <span class="item-title">${list_index.title}</span>
                        <span class="text-secondary edit-text">Düzenlemek için tıklayın</span>
                    </span>
                    <span class="text-secondary text-underline">${list_index.time}</span>
                </button>
            `;
        }
    } else {
        addHtmlM = `<span class="alert alert-warning">Gösterilecek görev yok kardeşş.</span>`;
    }

    listGroup.innerHTML = addHtmlM;
}

function listAdd(titleM) {
    if (titleM !== "" && titleM !== undefined) {
        let formattedDateTime = `${myDate.getFullYear()}-${String(myDate.getMonth() + 1).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')} ${String(myDate.getHours()).padStart(2, '0')}:${String(myDate.getMinutes()).padStart(2, '0')}`;
        listArray.push({
            title: titleM,
            id: isId(),
            time: formattedDateTime
        });
    } else {
        alert("Görevlere boş değer girilemez kardeşş.")
    }
}

function listDelete(idM) {
    const index = listArray.findIndex(item => item.id == idM);
    if (index !== -1) {
        listArray.splice(index, 1);
        getList();
    }
}

function isId() {
    return listArray.length;
}-

addButton.addEventListener("click", () => {
    addItemButtonClick();
});

function addItemButtonClick() {
    let inputValue = addInput.value;
    listAdd(inputValue);
    getList();
}

let isModal = false;
function detailPage(modalId) {
    isModal = true;

    const getitem = listArray.find(item => item.id == modalId);
    addInput.value = getitem.title;

    addButton.style.display = "none";
    addSave.style.display = "inline-block";
    addDelete.style.display = "inline-block";
    addCancel.style.display = "inline-block";

    addSave.onclick = () => {
        getitem.title = addInput.value;
        getList();
        cancelFunc();
    };

    addDelete.onclick = () => {
        listDelete(getitem.id);
        cancelFunc();
    };

    addCancel.onclick = () => {
        cancelFunc();
    };

    /* LOGS */

    document.addEventListener('keydown', (event) => {
        if (isModal) {
            if (event.ctrlKey && event.key === ' ') {
                getitem.title = addInput.value;
                getList();
                cancelFunc();
            }
    
            if (event.key === 'Escape') { 
                cancelFunc();
            }
        
            if (event.key === 'Delete') { 
                listDelete(getitem.id);
                cancelFunc();
            }
        }
    });
}

function cancelFunc() {
    addInput.value = "";
    addButton.style.display = "inline-block";
    addSave.style.display = "none";
    addDelete.style.display = "none";
    addCancel.style.display = "none";

    isModal = false;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        addItemButtonClick();
    }
});