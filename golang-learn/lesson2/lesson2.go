package main

import(
        "fmt"
        "math"
        "runtime"
        "time"
      )

func main(){
    fmt.Println("lesson2")
    sum := 0

    // only one looping construct: forloop
    for i := 0; i< 10; i++{
        sum += i
    }

    fmt.Println(sum)
    sum = 1

    for ; sum< 10; {
        sum += sum
    }
    fmt.Println(sum)
    for sum< 1000 {
        sum += sum
    }
    fmt.Println(sum)
    if false {

        for{ /* infinity.. */ }

    }else{

        for{
            break

        }
    }

    if v := math.Pow(2,10); v > 500 {
        fmt.Println("short statement if")
    }    

    // get system
    switch os := runtime.GOOS; os {
        case "darwin":
            fmt.Println("OS X")
        case "linux":
            fmt.Println("Linux")
            fallthrough
        default:
            fmt.Printf("%s\n",os)
    }

    t := time.Now()
    switch {
        case t.Hour() < 12:
           fmt.Println("Good morning!")
        case t.Hour() < 17:
            fmt.Println("Good afternoon.")
        default:
            fmt.Println("Good evening.")
    }

    defer fmt.Println("world")

    fmt.Println("hello")
}
