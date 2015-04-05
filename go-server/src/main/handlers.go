package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "io/ioutil"
    "io"

    "github.com/gorilla/mux"
    "strconv"
)

func Index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome!")
}

func Teapot(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusTeapot)
    fmt.Fprintln(w, "I'm a teapot")
}

func TodoIndex(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    w.WriteHeader(http.StatusOK)
    if err := json.NewEncoder(w).Encode(todos); err != nil {
        panic(err)
    }
}

func TodoShow(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    todoId, err := strconv.ParseInt(vars["todoId"], 10, 32)
    if err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        panic(err)
    }
    todo := RepoFindTodo(int(todoId))
    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    w.WriteHeader(http.StatusOK)
    if err = json.NewEncoder(w).Encode(todo); err != nil {
        panic(err)
    }
}

func TodoCreate(w http.ResponseWriter, r *http.Request) {
    var todo Todo
    body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
    if err != nil {
        panic(err)
    }
    if err := r.Body.Close(); err != nil {
        panic(err)
    }
    if err := json.Unmarshal(body, &todo); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        fmt.Println(err)
        if err := json.NewEncoder(w).Encode(err); err != nil {
            panic(err)
        }
    } else {
        t := RepoCreateTodo(todo)
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(http.StatusCreated)
        if err := json.NewEncoder(w).Encode(t); err != nil {
            panic(err)
        }
    }
}
