//기능
// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
//1.check 버튼을 클릭하는 순간 isComplete false를 true로
//2.true이면 끝날걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// // 모바일 버전에서도 확인할 수 있는 반응형 웹이다

//구현로직
//유저가 값을 입력
// +버튼을 클릭하면 힐일이 추가됨
// delete버튼을 누르면 할일이 삭제
// check버튼을 누르면 할일이 끝나면서 밑줄,블럭
//ing, done탭을 누르면 언더바 이동
//done 탭은 끝난 아이템만, ing은 진행중 아이템만, all은 모두 다
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("tabs-underline");
let mode = "all";
let taskList = [];
let filterList = [];

taskInput.addEventListener("click", () => {
  taskInput.value = "";
});

let addTask = () => {
  let task = {
    id: randomID(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
};
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

let render = () => {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-done">
  <span>${list[i].taskContent}</span>
  <div class="task-button">
    <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
    <button onclick="deleteTask('${list[i].id}')"><i class="fas fa-trash-alt"></i></button>
  </div>
</div>`;
    } else {
      resultHTML += `<div class="task">
<span>${list[i].taskContent}</span>
<div class="task-button">
  <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-check"></i></button>
  <button onclick="deleteTask('${list[i].id}')"><i class="fas fa-trash-alt"></i></button>
</div>
</div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
};

let toggleComplete = (id) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
};

let deleteTask = (id) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
};

let filter = (event) => {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  filterList = [];
  if (mode == "all") {
    render();
  } else if (mode == "ing") {
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
};
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

let randomID = () => {
  return Math.random().toString(36).substr(2, 9);
};
