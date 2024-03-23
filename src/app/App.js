import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    this.fetchTask();
  }

  addTask(e) {
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ title: "", description: "", _id: "" });
          this.fetchTask();
        })
        .catch((err) => console.log(err));
    } else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ title: "", description: "" });
          this.fetchTask();
        })
        .catch((err) => console.log(err));
    }
  }

  fetchTask() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ tasks: data });
      });
  }

  handleDelete(id) {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Filtra las tareas para mantener solo las que no tienen el ID eliminado
        const updatedTasks = this.state.tasks.filter((task) => task._id !== id);
        // Actualiza el estado después de la eliminación
        this.setState({ tasks: updatedTasks });
      })
      .catch((err) => console.log(err));
  }
  

  handleEdit(id) {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id,
        });
      })
      .catch((err) => console.log(err));
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Tacos de yamil
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          placeholder="Escribe"
                          className="materialize-textarea"
                          value={this.state.description}
                          onChange={this.handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>title</th>
                    <th>description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn red darken-4"
                            onClick={() => this.handleDelete(task._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn yellow darken-4"
                            onClick={() => this.handleEdit(task._id)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
