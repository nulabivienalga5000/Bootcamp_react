import React, { Component } from "react";
import "./index.css";

class PostModal extends Component {
  state = {
    imageUrl: null,
    formData: null,
    caption: ""
  };

  handleAddImg = event => {
    const file = event.target.files[0];

    const fileReader = new FileReader();
    const formData = new FormData();

    formData.append("media", file);

    fileReader.onloadend = () => {
      this.setState({ formData, imageUrl: fileReader.result });
    };

    fileReader.readAsDataURL(file);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { formData, caption } = this.state;
    this.props.submitPost(formData, caption).then(() => {
      this.props.getPosts();
    });
  };

  componentDidUpdate() {
    if (this.props.postsReducer.isSubmitted) {
      this.props.handleCloseModal();
    }
  }

  onChange = event => this.setState({ caption: event.target.value });

  render() {
    const { imageUrl } = this.state;

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create post</h5>
            <button type="button" className="close" />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>Caption:</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={this.onChange}
                />
              </div>
              <input
                className="mb-3"
                type="file"
                onChange={this.handleAddImg}
              />
            </form>
            {imageUrl ? (
              <img className="img-fluid" src={imageUrl} alt="" />
            ) : null}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostModal;
