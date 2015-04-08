package data_utils
import (
    "database/sql"
    _ "github.com/lib/pq"

    "log"
)

var db *sql.DB

func Init() {
    log.Println("Opening db")
    if database, err := sql.Open("postgres", "user=bbox password=password sslmode=disable"); err != nil {
        panic(err)
    } else {
        db = database
    }
}

func UsingTransaction(method func (tx *sql.Tx)) {
    Tx, err := db.Begin()
    if err != nil {
        log.Fatal(err)
    }
    defer func() {
        if recoveredErr := recover(); recoveredErr != nil {
            Tx.Rollback()
        } else {
            err = Tx.Commit()
        }
    }()

    log.Println("Executing method...")
    method(Tx)
    log.Println("Finished method...")
}
