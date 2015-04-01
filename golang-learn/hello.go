package main

import (
        "fmt"
        "time"
        "math"
        "math/rand"
       )

func add (x int, y int) int {
    return x + y
}
func add2 (x, y int) int {
    return x + y
}

func swap(x, y string)(string,string){
    return y, x
}

func split (sum int)(x, y int){
    x = sum * 4 / 9
    y = sum - x
    return
}

func main(){
    fmt.Println("Hello, the time is : ", time.Now())
    fmt.Println("my fav number is ", rand.Intn(10))
    fmt.Printf("the number after 2 is %g\n", math.Nextafter(2,3))
    fmt.Printf("Pi: %g\n",math.Pi)
    fmt.Println("add test: ", add(1,5), add2(30,42))


    a,b := swap("b", "a")
    fmt.Println(a,b)
    fmt.Println(split(70))

}
