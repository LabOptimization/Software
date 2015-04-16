package lab
import (
    "net/http"
    "encoding/json"
    "github.com/gorilla/mux"
    "strconv"
)

var ContentType string = "application/json; charset=UTF-8"
var allLabs Labs = Labs{
                    Lab{
                        ID:1,
                        Name:"DC Circuit",
                        TitleImage:"/s/images/dc_circuit.gif",
                        Values:Measurements{
                            Measurement{ID:1,
                            Frequency:3.0,
                            Magnitude:2.0,
                            Tolerance:0.03},
                        },
                    },
                    {   ID:2,
                        Name:"Tesla Coil",
                        TitleImage:"/s/images/tesla_coil.jpg",
                        Values:Measurements{
                            Measurement{ID:1,
                            Frequency:13.0,
                            Magnitude:150.0,
                            Tolerance:0.11},
                        },
                    },
}

func Index(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", ContentType)
    w.WriteHeader(http.StatusOK)
    if err:= json.NewEncoder(w).Encode(allLabs); err != nil {
        panic(err)
    }
}

func Show(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)


    id, err := strconv.ParseInt(vars["id"], 10, 32)

    if err != nil {
        http.NotFound(w, r)
    } else {

        if int(id) > len(allLabs) || id < 1{
            http.Error(w, "Blah", 422)
        } else {

            w.Header().Set("Content-Type", ContentType)
            w.WriteHeader(http.StatusOK)
            if err := json.NewEncoder(w).Encode(allLabs[id-1]); err != nil {
                panic(err)
            }
        }
    }
}
