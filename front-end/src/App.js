import './App.css';
import React, { Component } from "react";
import Modal from "./components/modal";
import axios from 'axios'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLivré: false,
      activeItem: {
        Nom: "",
        Adresse: "",
        Demande: "",
        livré: false
      },
      taskList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

 
  refreshList = () => {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/demandes/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };

  displayLivré = status => {
    if (status) {
      return this.setState({ viewLivré: true });
    }
    return this.setState({ viewLivré: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayLivré(true)}
          className={this.state.viewLivré ? "active" : ""}
        >
          Livré
            </span>
        <span
          onClick={() => this.displayLivré(false)}
          className={this.state.viewLivré ? "" : "active"}
        >
          Pas Encore Livré
            </span>
      </div>
    );
  };
 // Main variable to render items on the screen
  renderItems = () => {
    const { viewLivré } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.livré === viewLivré
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewLivré ? "completed-todo" : ""
            }`}
          title={item.Adresse}
        >
          {item.Nom}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Details
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Supprimer
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {//add this after modal creation
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`http://localhost:8000/api/demandes/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("http://localhost:8000/api/demandes/", item)
      .then(res => this.refreshList());
  };

  // Delete item
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/demandes/${item.id}/`)
      .then(res => this.refreshList());
  };
  
  // Create item
  createItem = () => {
    const item = { Nom: "", Adresse: "", Demande: "", livré: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Edit item
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  










  render() {
    return (
      <main className="container ">
        <h3 className="my-4 nb-2 bg-info text-white text-center">Gestion des livraisons</h3>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Ajouter une demande
                    </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-3 nb-2 bg-info text-white text-center">
          Copyright 2021 &copy; All Right Reserved</footer>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }











}




export default App;
