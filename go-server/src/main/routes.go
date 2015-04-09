package main

import (
	"lab"
	"net/http"
	"settings"
	"fmt"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"TodoIndex",
		"GET",
		"/todos",
		TodoIndex,
	},
	Route{
		"TodoShow",
		"GET",
		"/todos/{todoId}",
		TodoShow,
	},
	Route{
		"TodoCreate",
		"POST",
		"/todos",
		TodoCreate,
	},
	Route{
		"Teapot",
		"GET",
		"/teapot",
		Teapot,
	},
	Route{
		"LabsIndex",
		"GET",
		"/labs",
		lab.Index,
	},
	Route{
		"LabsShow",
		"GET",
		"/labs/{id:[0-9]+}",
		lab.Show,
	},
	Route{
		"LabsCreate",
		"Post",
		"/labs/{id:[0-9]+}",
		lab.Show,
	},
	Route{
		"Page",
		"GET",
		"/s/{fileType}/{file}",
		http.HandlerFunc(func (res http.ResponseWriter, req *http.Request){
			fmt.Println("requesting ",req.URL)
			http.StripPrefix("/s/", http.FileServer(http.Dir(settings.StaticPath))).ServeHTTP(res,req)
		}),
	},
}

func init(){

}
