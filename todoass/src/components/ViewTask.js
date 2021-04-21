import React, { Component } from "react";

class ViewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      summary,
      description,
      priority,
      dueDate,
      createdOn,
      status,
    } = this.props.data;
    return (
      <div className="modal-container-custom">
        <div className="modal-content-custom">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <strong>Summary:</strong> <span>{summary}</span>
              </div>
              <div className="col-6">
                <strong>Description:</strong> <span>{description}</span>
              </div>
            </div>
            <div className="row mt-15">
              <div className="col-4">
                <strong>Due Date:</strong> <span>{dueDate}</span>
              </div>
              <div className="col-4">
                <strong>Created On:</strong> <span>{createdOn}</span>
              </div>
            </div>
            <div className="row mt-15">
              <div className="col-4">
                <strong>Priority:</strong> <span>{priority}</span>
              </div>
              <div className="col-4">
                <strong>Status:</strong> <span>{status}</span>
              </div>
            </div>
            <div className="row mt-15">
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.props.hideModal()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTask;