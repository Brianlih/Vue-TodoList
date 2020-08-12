<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
import Todos from "../components/Todos";
//import Header from "../components/layout/Header"; //we want to have the header at every pages not noly the home page.
import AddTodo from "../components/AddTodo";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Todos,
    //Header,
    AddTodo,
  },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    deleteTodo(id) {
      axios
        .delete(
          `https://jsonplaceholder.typicode.com/todos/${id}
        `
        ) //若api需加入參數，則需使用``
        .then((res) => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
          return res; //add this line cause the feature of vue that needs the variable(res) must be uesd in the function.
        })
        .catch((err) => {
          console.log(err);
        });
      //this.todos = this.todos.filter((todo) => todo.id !== id); //此filter會回傳一個array符合"todo.id !== id"，因為我們要刪掉id那項
    },
    addTodo(newTodo) {
      const { title, completed } = newTodo; //pull out the two props from the newTodo object.
      axios
        .post("https://jsonplaceholder.typicode.com/todos", {
          title,
          completed,
        }) //"title" and "completed" 是要傳入的參數。
        .then((res) => {
          this.todos = [...this.todos, res.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => {
        this.todos = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1, 4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
</style>
