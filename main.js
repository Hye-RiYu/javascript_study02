// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line")
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener("mousedown", addTask);
taskInput.addEventListener('keydown', function(event){
  if(event.keyCode === 13) {
    addTask(event); 
  }
  });

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
      filter(event);
    });
  }
// console.log(tabs)

function addTask() {
  let taskValue = taskInput.value;
  if(taskValue === "") return alert ("할일을 입력해주세요!");

  let task = {
    id: randomIDGenerate(),
    taskContent: taskValue,
    isComplete: false
  }
  taskList.push(task);
  taskInput.value = '';
  console.log(taskList);
  render();
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = []
  if(mode === "all") {
  // all = taskList
    list = taskList;
  }else if(mode === "ongoing" || mode === "done") {
  // ongoing, done filterList
    list = filterList;
  }
  // 2. 리스트를 달리 보여준다

  
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
      <div class="task check-bg">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button class="check-button" onClick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
          <button class="trash-button" onClick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
        </div>
      </div>
      `;
    }else {
      resultHTML += `
            <div class="task">
              <div>${list[i].taskContent}</div>
              <div>
                <button class="check-button" onClick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
                <button class="trash-button" onClick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
              </div>
            </div>
    `;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  
  for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
  console.log(taskList);
}

function deleteTask(id) {
  for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(i,1)

    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  filterList = [];
  if(mode === "all") {
    render();
  }else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}