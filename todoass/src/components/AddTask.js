import React, { Component } from "react";
import config from "../config.json";

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: "",
      description: "",
      dueDate: "",
      priority: "",
      status: "Open",
      createdOn: "",
    };
  }

  updateChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="modal-container-custom">
          <div className="modal-content-custom">
            <div style={{ textAlign: "center" }}>
              <h6>Add Task</h6>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input
                  type="text"
                  className="form-control"
                  name="summary"
                  id="summary"
                  value={this.state.summary}
                  minLength={10}
                  maxLength={140}
                  onChange={this.updateChanges}
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  id="desc"
                  value={this.state.description}
                  minLength={10}
                  maxLength={500}
                  onChange={this.updateChanges}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  className="form-control"
                  id="priority"
                  name="priority"
                  value={this.state.priority}
                  onChange={this.updateChanges}
                >
                  <option value="">Select</option>
                  {config.priorities.map((priority) => (
                    <option value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="duedate">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  id="duedate"
                  value={this.state.dueDate}
                  onChange={this.updateChanges}
                />
              </div>
            </form>
            <div style={{ float: "right" }}>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => this.props.hideModal()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.addTask(this.state)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask;