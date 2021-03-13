import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/HeaderFirebase";
import Todos from "./components/TodosFirebase";
import AddTodo from "./components/AddTodoFirebase";
import About from "./components/pages/About";
import firebase from "./firebase";

import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [idOfUpdate, setIdOfUpdate] = useState(null);
  const [truth, setTruth] = useState();

  useEffect(() => {
    populate();
  }, []);

  useEffect(() => {
    let id = idOfUpdate;
    if (id !== null) {
      markCompleteGlobal();
    }
  }, [truth]);

  const markCompleteGlobal = () => {

  
  
      let id = idOfUpdate;
    const itemtoupdate = firebase
      .firestore()
      .collection("t")
      .doc(id);

    itemtoupdate.update({
      completed: truth,
    });
  // debugger
    setIdOfUpdate(null);
    setTruth(null);
  };

  // Toggle Complete
  const markComplete = (id) => {
    console.log("First", idOfUpdate);
    setIdOfUpdate(id);

    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;

          setTimeout(function() {
            setTruth(todo.completed);
          }, 1000);
        }
        return todo;
      })
    )
    console.log("Second", idOfUpdate, truth);
  };

  // Delete Todo
  const delTodo = (id) => {
    const db = firebase.firestore();
    db.collection("t")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!", id);
      })
      .catch((error) => {
        console.error(id, "Error removing document: ", error);
      })
      .then((res) => setTodos([...todos.filter((todo) => todo.id !== id)]));
    console.log(id, "here is an id", id);
  };

  // Add Todo
  const addTodo = (title) => {
    const datas = {
      id: firebase
        .firestore()
        .collection("t")
        .doc().id,
    };
    const db = firebase.firestore();
    db.collection("t")
      .doc(datas.id)
      .set({ title: title, completed: false, id: datas.id })
      .then(() => {
        populate();
      });
  };

  const populate = (data) => {
    setTodos([]);
    return firebase
      .firestore()
      .collection("t")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let newData = doc.data();

          if (todos.indexOf(newData.id) === -1) {
            setTodos((arr) => {
              return [...arr, newData];
            });
          } else {
            console.log("this is a duplicate");
          }
          console.log("here are all of the todos", todos);
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <AddTodo addTodo={addTodo} />
                <Todos
                  todos={todos}
                  markComplete={markComplete}
                  delTodo={delTodo}
                />
              </React.Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
};

export default App;
