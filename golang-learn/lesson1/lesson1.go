package main

import (
        "fmt"
        "time"
        "math"
        "math/rand"
        "math/cmplx"
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

var wow, cool, vars int

var(
    ToBe bool = false
    MaxInt uint64 = 1 << 64 -1
    z complex128 = cmplx.Sqrt(-5 + 12i)
)

func main(){
    fmt.Println("Hello, the time is : ", time.Now())
    fmt.Println("my fav number is ", rand.Intn(10))
    fmt.Printf("the number after 2 is %g\n", math.Nextafter(2,3))
    fmt.Printf("Pi: %g\n",math.Pi)
    fmt.Println("add test: ", add(1,5), add2(30,42))


    a,b := swap("b", "a")
    fmt.Println(a,b)
    fmt.Println(split(70))

    var c, python, java = true, false, "no"
    fmt.Println(c,python,java,wow,cool,vars)

    implicit := "the := is only available in functions"
    fmt.Println(implicit)

    const tx = "%T(%v)\n"
    fmt.Printf(tx, ToBe, ToBe)
    fmt.Printf(tx, MaxInt, MaxInt)
    fmt.Printf(tx, z, z)

    // type conversion
    _f := 34.32 
    var i int = int(_f)
    
    var f float32 = float32(i)/2.3

    fmt.Printf("%T %v \n",i,i)
    fmt.Printf("%T %v \n",f,f)

}
