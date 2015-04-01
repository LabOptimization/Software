package main

import (
    "fmt"
)

func product(vals []int, c chan int){
    p := 0
    for _,val := range vals{
        p += val
    }
    c <- p
}

func main(){
    a := []int{1,2,4,23,3,4,23,432,432,4,32,453,543,5,435,324,5,345,4325,435,43,53,45,435,45}

    c := make(chan int)
    c_result := make(chan int)

    go product(a[len(a)/2:],c)
    go product(a[:len(a)/2],c)
    go product(a,c_result)

    x,y := <-c, <-c

    fmt.Println(x,y,x+y, <-c_result)

    
}
