package main

import (
	"lab"
	"net/http"
	"settings"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var fileserver http.HandlerFunc = http.HandlerFunc(func (res http.ResponseWriter, req *http.Request){
	http.StripPrefix("/s/", http.FileServer(http.Dir(settings.StaticPath))).ServeHTTP(res,req)
})

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
		"Home",
		"GET",
		"/home",
		Home,
	},
	Route{
		"LabsShow",
		"GET",
		"/labs/{id:[0-9]+}",
		lab.Show,
	},
	Route{
		"Page",
		"GET",
		"/s/{fileType}/{file}",
		fileserver,
	},
	Route{
		"Page",
		"GET",
		"/s/{fileType}/{filePurpose}/{file}",
		fileserver,
	},
}

func init(){

}
