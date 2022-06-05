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
    if (!isTaskExisting) {
        let task = taskName;
        localStorage.setItem(index, task);
        localStorage.setItem('nbTask', nbTask);
    }
    let tr = document.createElement('tr');
    tr.setAttribute('id', 'tr' + nbTask);
    let rowNumber = document.createElement('th');
    rowNumber.setAttribute('scope', 'row');
    rowNumber.textContent = nbTask;
    let col1 = document.createElement('td');
    let done = createCheckBox(nbTask);
    col1.appendChild(done);
    let check = localStorage.getItem('check'+nbTask) !== null;
    let col2 = document.createElement('td');
    col2.setAttribute('id', 'task' + nbTask);
    col2.textContent = taskName;
    if(check) {
        col2.setAttribute('style', 'text-decoration : line-through;');
        done.setAttribute('checked', '');
    } else {
        col2.setAttribute('style', '');
    }
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
    manage.addEventListener('click', async () => {
        const inputValue = '';
        const { value: nextValue } = await Swal.fire({
            title: 'Manage task',
            text: 'What do you want to do ?',
            icon: 'info',
            input: 'text',
            inputLabel: 'Your task',
            inputValue: inputValue,
            confirmButtonText: 'Modify',
            showDenyButton: true,
            denyButtonText: 'Delete',
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
                if(value) {
                    console.log(value);
                    localStorage.setItem('task' + index, value);
                    let task = document.getElementById('task' + index);
                    task.textContent = value;
                    let addPlaceholder = document.getElementById('newTask');
                    addPlaceholder.value = '';
                }
            }
        }).then((result) => {
            if (result.isDenied) {
                let tbody = document.getElementById('tbody');
                let tr = document.getElementById('tr' + index);
                tbody.removeChild(tr);
                localStorage.removeItem('task' + index);
                localStorage.removeItem('check' + index);
                let oldNbTask = localStorage.getItem('nbTask');
                oldNbTask--;
                console.log('The new nb is : ' + oldNbTask);
                localStorage.setItem('nbTask', oldNbTask);
            }
        });
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
        if (textTask.getAttribute('style').includes('line')) {
            textTask.setAttribute('style', 'text-decoration : none;');
            localStorage.removeItem('check' + index);
            localStorage.setItem('check' + index, 'false');
        } else {
            textTask.setAttribute('style', 'text-decoration : line-through;');
            localStorage.removeItem('check' + index);
            localStorage.setItem('check' + index, 'true');
        }
    });
    return done;
}

function loadTasks() {
    let nbTask = localStorage.getItem('nbTask');
    if (nbTask < 1) {
        return;
    }
    let tasks = [];
    for (let i = 0; i < nbTask; i++) {
        let taskText = localStorage.getItem('task' + (i + 1));
        numberOfTask = createRow(i, taskText);
    }
}


submit.addEventListener('click', () => {
    numberOfTask = createRow(numberOfTask, retrieveNewTaskValue());
    console.log('number of task is now : ' + numberOfTask);
})

window.onload = loadTasks();


