let newTask = document.getElementById('newTask');
let submit = document.getElementById('submit');
let numberOfTask = 0;

function retrieveNewTaskValue() {
    return newTask.value;
}

function createRow(nbTask, taskName) {
    nbTask++;
    let index = 'task' + nbTask;
    let isTaskExisting = localStorage.getItem(index) !== null;
    console.log(isTaskExisting);
    if (!isTaskExisting) {
        let task = taskName;
        localStorage.setItem(index, task);
        localStorage.setItem('nbTask', nbTask);
    }
    let tr = document.createElement('tr');
    let rowNumber = document.createElement('th');
    rowNumber.setAttribute('scope', 'row');
    rowNumber.textContent = nbTask;
    let col1 = document.createElement('td');
    let done = createCheckBox(nbTask);
    col1.appendChild(done);
    let col2 = document.createElement('td');
    col2.setAttribute('id', 'task' + nbTask);
    col2.textContent = taskName;
    col2.setAttribute('style', '');
    let col3 = document.createElement('td');
    let manage = createManageButton(nbTask);
    col3.appendChild(manage);
    tr.appendChild(rowNumber);
    tr.appendChild(col1);
    tr.appendChild(col2);
    tr.appendChild(col3);
    let tbody = document.getElementById('tbody');
    tbody.appendChild(tr);
    return nbTask;
}

function createManageButton(index) {
    let manage = document.createElement('button');
    manage.setAttribute('type', 'button');
    manage.setAttribute('class', 'btn btn-sm btn-light');
    manage.setAttribute('id', 'manage' + index);
    manage.textContent = 'Manage';
    manage.addEventListener('click', () => {
        
    })
    return manage;
}

function createCheckBox(index) {
    let done = document.createElement('input');
    done.setAttribute('class', 'form-check-input');
    done.setAttribute('type', 'checkbox');
    done.setAttribute('value', '');
    done.setAttribute('id', 'checkbox' + index);
    done.addEventListener('input', () => {
        let textTask = document.getElementById('task' + index);
        if(textTask.getAttribute('style').includes('line')) {
            textTask.setAttribute('style', 'text-decoration : none;');
            localStorage.removeItem('check'+index);
            localStorage.setItem('check'+index, 'false');
            console.log(textTask.getAttribute('style'));
        } else {
            textTask.setAttribute('style', 'text-decoration : line-through;');
            localStorage.removeItem('check'+index);
            localStorage.setItem('check'+index, 'true');
        }
     
    });
    return done;
}

function loadTasks() {
    let nbTask = localStorage.getItem('nbTask');
    if (nbTask < 1) {
        return;
    }
    for(let i = 0; i < nbTask; i++) {
        let taskText = localStorage.getItem('task'+(i+1));
        numberOfTask = createRow(i,taskText);
    }
}

submit.addEventListener('click', () => {
    numberOfTask = createRow(numberOfTask, retrieveNewTaskValue());
    console.log('number of task is now : ' + numberOfTask);
})

window.onload = loadTasks();


