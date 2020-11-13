const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos) {
    todos.forEach(todo => {
        addTodo();
    })
}

// formのエンターはsubmit扱い。エンター押しても
// formの中身は消えなくなる　
form.addEventListener ("submit", (e) => {
    e.preventDefault();

    addTodo();
});


function addTodo(todo) {
    let todoText = input.value;

    if(todo) {
            todoText = todo.text;
    }
        if(todoText) {
            // liタグを作成
            const todoEl = document.createElement("li");
            if(todo && todo.completed) {
            todoEl.classList.add("completed");
            }
            // liタグに追加されるテキストはinputに入ってる値
            todoEl.innerText = todoText;
            
            // 既定の動作をキャンセル
            todoEl.addEventListener('click', () => {
            // クラスが含まれていれば削除、含まれてないなら追加
                todoEl.classList.toggle('completed');
            
                updateLs();
            });
    
            // 右クリックでtodoを削除
            todoEl.addEventListener("contextmenu", (e) => {
                e.preventDefault();

                todoEl.remove();
    
                updateLs();
            })
    
            // liタグを追加（子要素を追加）
            todosUl.appendChild(todoEl);
    
            input.value = "";
    
            updateLs();
        }
};

function updateLs() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            // クラスが含まれてるか確認する
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos))
}