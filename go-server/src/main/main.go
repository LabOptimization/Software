package main

import(
    "log"
    "net/http"
    "html/template"

    "settings"
)

var smux *http.ServeMux

func main(){
        
    smux = http.NewServeMux()
    smux.HandleFunc("/", index)


    // Set up go to serve static content
    // nginx should do this in future
    if settings.Debug {
        fs := http.FileServer(http.Dir(settings.StaticPath))
        handler := http.StripPrefix("/static/", fs)
        smux.Handle("/static/", handler)
    }


    server := http.Server{
            Addr: ":" + settings.Port,
            Handler: &Router{},
    }
 
    log.Println("Running on :" + settings.Port)
   
    server.ListenAndServe()
}

// TODO make a routes module
func sendTemplate(w http.ResponseWriter, file string){
    tmpl, err := template.ParseFiles(settings.TemplatePath + "layout.html", 
                                    settings.TemplatePath + file)
    if err != nil {
        log.Println("Error: ", err)
        w.WriteHeader(http.StatusNotFound)
        return
    }

    err = tmpl.ExecuteTemplate(w, "layout", nil)
    if err != nil {
        log.Println("Error: ", err)
    }
}

func index(w http.ResponseWriter, r *http.Request){
    sendTemplate(w,"index.html")
}

type Router struct{}

func (*Router) ServeHTTP(w http.ResponseWriter, r *http.Request){
    // TODO add middleware here
    log.Println(r.URL.Path)
    smux.ServeHTTP(w,r)
}


