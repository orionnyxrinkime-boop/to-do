const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// 1. Charger les tâches sauvegardées au démarrage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveAndRender() {
  // Sauvegarder dans le navigateur
  localStorage.setItem('todos', JSON.stringify(todos));
  
  // Rendre l'affichage dynamique
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.style.textDecoration = 'line-through';

    // Toggle au clic sur la tâche
    li.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      saveAndRender();
    });

    list.appendChild(li);
  });
}

// 2. Écouter la saisie de l'utilisateur
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    input.value = '';
    saveAndRender();
  }
});

// Affichage initial
saveAndRender();