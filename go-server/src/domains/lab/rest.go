package lab
import (
    "net/http"
    "encoding/json"
    "github.com/gorilla/mux"
    "strconv"
)

var ContentType string = "application/json; charset=UTF-8"

func Index(w http.ResponseWriter, r *http.Request) {
    labs := Labs{
        Lab{
            ID:1,
            Name:"Blah",
            Values:Measurements{
                Measurement{ID:1,
                    Frequency:3.0,
                    Magnitude:2.0,
                    Tolerance:0.03}}}}

    w.Header().Set("Content-Type", ContentType)
    w.WriteHeader(http.StatusOK)
    if err:= json.NewEncoder(w).Encode(labs); err != nil {
        panic(err)
    }
}

func Show(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    lab := Lab{
        ID:1,
        Name:"Blah",
        Values:Measurements{
            Measurement{ID:1,
                Frequency:3.0,
                Magnitude:2.0,
                Tolerance:0.03}}}

    id, err := strconv.ParseInt(vars["id"], 10, 32)

    if err != nil {
        http.NotFound(w, r)
    } else {

        if id > 100 {
            http.Error(w, "Blah", 422)
        } else {
            lab.ID = id

            w.Header().Set("Content-Type", ContentType)
            w.WriteHeader(http.StatusOK)
            if err := json.NewEncoder(w).Encode(lab); err != nil {
                panic(err)
            }
        }
    }
}
