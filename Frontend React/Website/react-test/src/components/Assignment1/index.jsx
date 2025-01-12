import React, { Component } from "react";
import EditableCard from "../EditableCard";
import TaskCard from "../TaskCard";

export default class Assignment1 extends Component {
  state = {
    tasks:
      JSON.parse(localStorage.getItem("tasks")) != null
        ? JSON.parse(localStorage.getItem("tasks"))
        : [],
    images: ["imgs/image_1.jpg", "imgs/image_2.jpg", "imgs/image_3.jpg"],
    actionBtn: " ",
  };

  addTask = () => {
    let taskImage = document.querySelector("img");
    let taskNameInput = document.querySelector("#taskName");
    let taskDescInput = document.querySelector("#taskDesc");
    let taskImageSrc = taskImage.src;
    let taskName = taskNameInput.value;
    let taskDesc = taskDescInput.value;
    let tasks = this.state.tasks;
    tasks.push({
      taskImage: taskImageSrc,
      taskName: taskName,
      taskDesc: taskDesc,
    });
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  deleteTask = (index) => {
    let tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  getTaskData = (index) => {
    let actionBtn = document.querySelector(".actionBtn");
    actionBtn.innerHTML = "Update Task";
    actionBtn.classList.replace("btn-outline-success", "btn-outline-warning");
    let tasks = this.state.tasks;
    let taskImage = document.querySelector("img");
    let taskNameInput = document.querySelector("#taskName");
    let taskDescInput = document.querySelector("#taskDesc");
    taskImage.src = tasks[index].taskImage;
    taskNameInput.value = tasks[index].taskName;
    taskDescInput.value = tasks[index].taskDesc;
  };

  updateTask = (index) => {
    let taskImage = document.querySelector("img");
    let taskNameInput = document.querySelector("#taskName");
    let taskDescInput = document.querySelector("#taskDesc");
    let taskImageSrc = taskImage.src;
    let taskName = taskNameInput.value;
    let taskDesc = taskDescInput.value;
    let tasks = this.state.tasks;
    tasks.splice(index, 1, {
      taskImage: taskImageSrc,
      taskName: taskName,
      taskDesc: taskDesc,
    });
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    taskImage.src = "imgs/image_1.jpg";
    taskNameInput.value = "";
    taskDescInput.value = "";
    let actionBtn = document.querySelector(".actionBtn");
    actionBtn.innerHTML = "Add Task";
    actionBtn.classList.replace("btn-outline-warning", "btn-outline-success");
  };

  componentDidMount() {
    let actionBtn = this.state.actionBtn;
    actionBtn = document.querySelector(".actionBtn");
    this.setState({ actionBtn });
  }

  render() {
    return (
      <div className="container">
        <div className="row my-5 g-4">
          <EditableCard
            addTask={this.addTask}
            images={this.state.images}
            updateTask={this.updateTask}
            actionBtn={this.state.actionBtn}
          />
          {this.state.tasks !== null
            ? this.state.tasks.map((task, i) => {
                return (
                  <div className="col-md-3">
                    <div
                      className="card d-flex flex-column position-relative"
                      key={i}
                    >
                      <TaskCard
                        taskImage={task.taskImage}
                        taskName={task.taskName}
                        taskDesc={task.taskDesc}
                        deleteTask={this.deleteTask}
                        getTaskData={this.getTaskData}
                        actionBtn={document.querySelector(".actionBtn")}
                        index={i}
                      />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}
