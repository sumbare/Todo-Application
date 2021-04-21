import React, { Component } from "react";
import ViewTask from "./ViewTask";
import editicon from "../images/edit.png";
import deleteicon from "../images/delete.png";
import moment from "moment";
import sort from "../images/sort.png";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      data: "",
    };
  }

  showModal = (task) => {
    console.log(task);
    this.setState({ show: true, data: task });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    let tasks = this.props.taskList.map((task, index) => (
      <tr key={task.title}>
        <td onClick={() => this.showModal(task)}>
          <a href="javascript:void(0)">{task.summary}</a>
        </td>
        <td>{task.priority}</td>
        <td>{moment(task.createdOn).format("L")}</td>
        <td>{moment(task.dueDate).format("L")}</td>
        <td>
          <div>
            <img
              src={editicon}
              onClick={() => this.props.showEditModal(task, index)}
            />
            <img
              style={{ marginLeft: 8 + "px" }}
              src={deleteicon}
              onClick={() => this.props.delete(task.summary, task.status)}
            />
            <button
              style={{ marginLeft: 8 + "px" }}
              type="button"
              className="btn btn-primary"
              onClick={() => this.props.doneTask(index)}
            >
              {task.status === "Open" ? "Done" : "Re-Open"}
            </button>
          </div>
        </td>
      </tr>
    ));
    return (
      <div>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th onClick={(event) => this.props.sortFunc("summary")}>
                Summary <img src={sort} />
              </th>
              <th onClick={(event) => this.props.sortFunc("priority")}>
                Priority <img src={sort} />
              </th>
              <th>Created On</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{tasks}</tbody>
        </table>
        {this.state.show ? (
          <ViewTask data={this.state.data} hideModal={this.hideModal} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default TaskList;