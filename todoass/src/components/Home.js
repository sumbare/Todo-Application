import React, { Component } from "react";
import "../../src/styles.css";
import TaskList from "./TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTask from "./AddTask";
import plus from "../images/plus.png";
import config from "../config.json";
import EditTask from "./EditTask";
import moment from '../../package.json';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      taskList: config.taskList,
      showEdit: false,
      editData: "",
      searchString: "",
    };
    this.allTasks = config.taskList;
    this.openTasks = this.allTasks.filter((task) => task.status === "Open");
    this.closedTasks = this.allTasks.filter((task) => task.status === "Done");
    this.divRef = React.createRef();
    this.currentTab = "tab1";
    this.editIndex = 0;

    this.search = {
      all: [],
      open: [],
      closed: [],
    };
    this.sort = true;
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showEditModal = (task, ind) => {
    this.editIndex = ind;
    this.setState({ showEdit: true, editData: task });
  };

  hideEditModal = () => {
    this.setState({ showEdit: false });
  };

  doSearch = (event) => {
    this.setState({ searchString: event.target.value });
    switch (this.currentTab) {
      case "tab1":
        this.search.all = this.allTasks.filter((task) => {
          for (let key in task) {
            if (key != "description")
              if (
                task[key]
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase())
              )
                return task;
          }
        });
        this.setState({
          taskList: this.search.all,
        });
        break;
      case "tab2":
        this.search.closed = this.closedTasks.filter((task) => {
          for (let key in task) {
            if (key != "description")
              if (
                task[key]
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase())
              )
                return task;
          }
        });
        this.setState({
          taskList: this.search.closed,
        });
        break;
      case "tab3":
        this.search.open = this.openTasks.filter((task) => {
          for (let key in task) {
            if (key != "description")
              if (
                task[key]
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase())
              )
                return task;
          }
        });
        this.setState({
          taskList: this.search.open,
        });
        break;
      default:
        break;
    }
  };

  tabClick = (event) => {
    let tabs = this.divRef.current.childNodes;
    tabs.forEach((elem) => {
      if (elem.classList.contains("active")) elem.classList.remove("active");
    });
    event.target.classList.add("active");
    this.currentTab = event.target.id;
    switch (event.target.id) {
      case "tab1":
        this.search.all.length == 0
          ? this.setState({
              taskList: this.allTasks,
            })
          : this.setState({
              taskList: this.search.all,
            });
        break;
      case "tab2":
        this.search.closed.length == 0
          ? this.setState({
              taskList: this.closedTasks,
            })
          : this.setState({
              taskList: this.search.closed,
            });
        break;
      case "tab3":
        this.search.open.length == 0
          ? this.setState({
              taskList: this.openTasks,
            })
          : this.setState({
              taskList: this.search.open,
            });
        break;
      default:
        break;
    }
  };

  addTask = (taskInfo) => {
    console.log("task details", taskInfo);
    taskInfo.createdOn = moment().format("L");
    setTimeout(() => {
      this.allTasks.splice(0, 0, taskInfo);
      this.openTasks.splice(0, 0, taskInfo);
      this.setState({
        show: false,
      });
    }, 1000);
  };

  editTask = (taskInfo) => {
    this.search = {
      all: [],
      open: [],
      closed: [],
    };
    if (taskInfo.isDataChanged) {
      let cind, oind;
      switch (this.currentTab) {
        case "tab1":
          cind = this.closedTasks.findIndex(
            (task) => task.summary === this.allTasks[this.editIndex].summary
          );
          oind = this.openTasks.findIndex(
            (task) => task.summary === this.allTasks[this.editIndex].summary
          );
          this.allTasks[this.editIndex] = taskInfo;
          if (cind >= 0) this.closedTasks[cind] = taskInfo;
          if (oind >= 0) this.openTasks[oind] = taskInfo;
          break;
        case "tab2":
          cind = this.allTasks.findIndex(
            (task) => task.summary === this.closedTasks[this.editIndex].summary
          );
          this.allTasks[cind] = taskInfo;
          this.closedTasks[this.editIndex] = taskInfo;
          break;
        case "tab3":
          oind = this.allTasks.findIndex(
            (task) => task.summary === this.openTasks[this.editIndex].summary
          );
          this.allTasks[oind] = taskInfo;
          this.openTasks[this.editIndex] = taskInfo;
          break;
        default:
          break;
      }
      this.setState({
        showEdit: false,
      });
    }
  };

  updateTaskList = () => {
    switch (this.currentTab) {
      case "tab1":
        this.setState({
          taskList: this.allTasks,
        });
        break;
      case "tab2":
        this.setState({
          taskList: this.closedTasks,
        });
        break;
      case "tab3":
        this.setState({
          taskList: this.openTasks,
        });
        break;
      default:
        break;
    }
  };

  deleteTask = (title, status) => {
    this.search = {
      all: [],
      open: [],
      closed: [],
    };
    let ind = this.allTasks.findIndex((task) => task.summary === title);
    if (ind >= 0) this.allTasks.splice(ind, 1);
    if (status === "Open") {
      let oind = this.openTasks.findIndex((otask) => otask.summary === title);
      if (oind >= 0) this.openTasks.splice(oind, 1);
    } else {
      let cind = this.closedTasks.findIndex((ctask) => ctask.summary === title);
      if (cind >= 0) this.closedTasks.splice(cind, 1);
    }
    this.updateTaskList();
  };

  completeTask = (ind) => {
    switch (this.currentTab) {
      case "tab1":
        this.allTasks[ind].status =
          this.allTasks[ind].status === "Open" ? "Done" : "Open";
        this.closedTasks = this.allTasks.filter(
          (task) => task.status === "Done"
        );
        this.openTasks = this.allTasks.filter((task) => task.status === "Open");
        this.setState({
          taskList: this.allTasks,
        });
        break;
      case "tab2":
        let oind = this.allTasks.findIndex(
          (task) => task.summary === this.closedTasks[ind].summary
        );
        this.allTasks[oind].status =
          this.allTasks[oind].status === "Open" ? "Done" : "Open";
        this.closedTasks = this.allTasks.filter(
          (task) => task.status === "Done"
        );
        this.openTasks = this.allTasks.filter((task) => task.status === "Open");
        this.setState({
          taskList: this.closedTasks,
        });
        break;
      case "tab3":
        let cind = this.allTasks.findIndex(
          (task) => task.summary === this.openTasks[ind].summary
        );
        this.allTasks[cind].status =
          this.allTasks[cind].status === "Open" ? "Done" : "Open";
        this.openTasks = this.allTasks.filter((task) => task.status === "Open");
        this.closedTasks = this.allTasks.filter(
          (task) => task.status === "Done"
        );
        this.setState({
          taskList: this.openTasks,
        });
        break;
      default:
        break;
    }
  };

  sortFunc = (title) => {
    let temp = this.state.taskList;
    if (this.sort) {
      temp.sort(function (a, b) {
        var nameA = a[title].toLowerCase();
        var nameB = b[title].toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      temp.sort(function (a, b) {
        var nameA = a[title].toLowerCase();
        var nameB = b[title].toLowerCase();
        if (nameB < nameA) {
          return -1;
        }
        if (nameB > nameA) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({ taskList: temp });
    this.sort = !this.sort;
  };

  render() {
    return (
      <div className="container-div">
        <div className="header-div">
          <h4>To-Do Application</h4>
          <div ref={this.divRef} className="tabs mt-15">
            <span className="active tab" id="tab1" onClick={this.tabClick}>
              All tasks
            </span>
            <span className="tab ml-20" id="tab2" onClick={this.tabClick}>
              Completed
            </span>
            <span className="tab ml-20" id="tab3" onClick={this.tabClick}>
              Pending
            </span>
          </div>
        </div>

        <div id="content" className="mt-15 content-div">
          <div>
            <input
              className="form-control"
              style={{ width: 250 + "px", marginBottom: 15 + "px" }}
              type="text"
              value={this.state.searchString}
              onChange={this.doSearch}
              placeholder="Global Search"
            />

             <select className="from-control" style={{width: 250 + 'px', marginBottom: 15 + 'px'}} placeholder="Group By" value={} onChange={}>
              {this.config.groupBy.map(grp => <option value={grp}>{grp}</option>)}
            </select> 
          </div>
          <TaskList
            className="mt-15"
            taskList={this.state.taskList}
            delete={this.deleteTask}
            showEditModal={this.showEditModal}
            doneTask={this.completeTask}
            sortFunc={this.sortFunc}
          />
        </div>

        <div className="add-task">
          <a href="javascript:void(0)" onClick={this.showModal}>
            <img src={plus} />
            <span style={{marginLeft: 8 + "px"}}>Add Task</span>
          </a>
        </div>
        {this.state.show ? (
          <AddTask hideModal={this.hideModal} addTask={this.addTask} />
        ) : (
          ""
        )}
        {this.state.showEdit ? (
          <EditTask
            taskInfo={this.state.editData}
            hideEditModal={this.hideEditModal}
            editTask={this.editTask}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;