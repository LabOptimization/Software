package main

import (
    "fmt"
    "math"
    "os"
)

type Vertex struct{
    X,Y float64
}

func (v *Vertex) Abs() float64{
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

type SuperFloat float64

// Taking a pointer reference can be more efficient
// and determines whether if the method can modify
// the calling type or not
func (f SuperFloat) Abs() SuperFloat{
    if f < 0{
        return -f
    }
    return f
}
func (f SuperFloat) Sqrt() SuperFloat{
    return SuperFloat(math.Sqrt(float64(f)))
}
func (f SuperFloat) String() string{
    return fmt.Sprintf("%vsf",float64(f))
}
type Abser interface {
        Abs() SuperFloat

        Sqrt() SuperFloat
}

type Reader interface{
    Read(b []byte)(n int, err error)
}
type Writer interface{
    Write(b []byte)(n int, err error)
}
func main(){
    var v = Vertex{40.9,10.8}
    fmt.Println(v.Abs())

    f := SuperFloat(-32.5)
    fmt.Println(f.Abs())

    var a Abser

    a = f
    fmt.Println(a.Abs())

    var w Writer = os.Stdout

    fmt.Fprintf(w, "hello writer.  SuperFloat: %v\n", f)

}
