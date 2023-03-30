// 유저가 값을 입력한다
// +버튼을 클릭하면, 할 일이 추가된다.
// delete버튼을 클릭하면, 할 일이 삭제된다.
// check버튼을 누르면, 할 일이 끝나면서 및줄이 간다.
// not Done, Done 탭을 누르면, 언더바가 이동한다.
// not Done탭은 아직 안 끝난 아이템만, Done탭은 끝난 아이템만 표시된다.
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addButton").click();
  }
});
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomId(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing") {
    list = filterList;
  } else if (mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-done">
      <span>${list[i].taskContent}</span>
      <div class="button-box">
        <button onclick="toggleComplete('${list[i].id}')">
          <i class="fas fa-undo-alt"></i>
        </button>
        <button onclick="deleteTask('${list[i].id}')">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <span>${list[i].taskContent}</span>
    <div class="button-box">
      <button onclick="toggleComplete('${list[i].id}')">
        <i class="fa fa-check" ></i>
      </button>
      <button onclick="deleteTask('${list[i].id}')">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id == taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  if (mode == "all") {
    for (let i = 0; i < taskList.length; i++) {
      if (id == taskList[i].id) {
        taskList.splice(i, 1);
        break;
      }
    }
  } else if (mode == "ongoing" || mode == "done") {
    for (let i = 0; i < filterList.length; i++) {
      if (id == filterList[i].id) {
        filterList.splice(i, 1);
        break;
      }
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}
