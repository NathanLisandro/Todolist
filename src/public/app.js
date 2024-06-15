const apiUrl = 'http://localhost:3000/tasks';

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

function fetchTasks() {
    axios.get(apiUrl)
        .then(response => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            response.data.forEach((task, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editTask('${task.id}', ${index})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask('${task.id}')">Excluir</button>
                    </td>
                `;
                taskList.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar tarefas:', error));
}

function addTask() {
    
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    if (!title || !description) {
        alert('Por favor, insira um título e uma descrição para a tarefa.');
        return;
    }

    const newTask = { title, description };

    axios.post(apiUrl, newTask)
        .then(() => {
            document.getElementById('task-title').value = '';
            document.getElementById('task-description').value = '';
            fetchTasks();
        })
        .catch(error => console.error('Erro ao adicionar tarefa:', error));
}

function deleteTask(id) {
    axios.delete(`${apiUrl}/id/${id}`)
        .then(() => fetchTasks())
        .catch(error => console.error('Erro ao excluir tarefa:', error));
}

document.getElementById('closeModal').addEventListener('click', function () {
    const editTaskModal = document.getElementById('editTaskModal');
    editTaskModal.close();
});
function editTask(id, rowIndex) {
    // Obtém todas as linhas da tabela
    const taskRows = document.querySelectorAll('#task-list tr');
    if (rowIndex >= 0 && rowIndex < taskRows.length) {
        const taskRow = taskRows[rowIndex];
        const title = taskRow.cells[0].textContent;
        const description = taskRow.cells[1].textContent;
        document.getElementById('editTaskId').value = id;
        document.getElementById('editTaskTitle').value = title;
        document.getElementById('editTaskDescription').value = description;
        const editTaskModal = document.getElementById('editTaskModal');
        editTaskModal.showModal();
    } else {
        console.error('Índice de linha inválido:', rowIndex);
    }
}

function submitEditTask(event) {
    event.preventDefault();
    const id = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTaskTitle').value;
    const description = document.getElementById('editTaskDescription').value;
    const updatedTask = { title, description };

    axios.patch(`${apiUrl}/id/${id}`, updatedTask)
        .then(() => {
            const editTaskModal = document.getElementById('editTaskModal');
            editTaskModal.close();
            fetchTasks();
        })
        .catch(error => console.error('Erro ao editar tarefa:', error));
}
function filterTasks() {
    const filterText = document.getElementById('filter').value.toLowerCase();
    const taskRows = document.querySelectorAll('#task-list tr');

    taskRows.forEach(taskRow => {
        const title = taskRow.cells[0].textContent.toLowerCase();
        if (title.includes(filterText) || filterText === '') {
            taskRow.style.display = '';
        } else {
            taskRow.style.display = 'none';
        }
    });
}


