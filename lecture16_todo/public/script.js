const filtersContainer = document.getElementById("filters");
const form = document.getElementById("task-form");
const todoContainer = document.getElementById("todos-Container");

getAllTodos(); // get todos and renders it when js loads

async function getAllTodos(){
  const res = await axios.get("http://localhost:4000/todo/all");
  const todos = res.data.todos;
  renderTodos(todos);
}

function renderTodos(todos){
  for(let todo of todos){
    const div = document.createElement("div");
    div.className = "todo";
    div.innerHTML = `<h3>${todo.task}</h3> <div>
    <button class="status">${todo.status?"Undo":"Complete"}</button>
    <button class="delete">delete</button>
    </div>`
    todoContainer.prepend(div);
  }
  
}

form.addEventListener("submit",async(e)=>{
  e.preventDefault();  // to stop page refresh on submit
  const input = form.children[0];
  const task = input.value;     // text that user has written in input
  const res = await axios.post("http://localhost:4000/todo/create",{
    task:task
  })
})

filtersContainer.addEventListener("click",(e)=>{
  const btnId = e.target.id;
  const allBtns = filtersContainer.children;
  if(btnId=="all"){
    e.target.className = "active";
    allBtns[1].className = "";
    allBtns[2].className = "";
  }else if(btnId=="active"){
    e.target.className = "active";
    allBtns[0].className = "";
    allBtns[2].className = "";
  }else if(btnId=="completed"){
    e.target.className = "active";
    allBtns[0].className = "";
    allBtns[1].className = "";
  }
})

