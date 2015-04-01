package main

import(
    "fmt"
    "math"
    "golang.org/x/tour/pic"
)

type Vertex struct{
    X int
    Y int
}

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}


func main(){
    i, j := 42, 2701

    // pointer to i
    p := &i

    fmt.Println(p," -> " ,*p)
    
    p = &j
    fmt.Println(p," -> " ,*p)
    *p = i
    fmt.Println(p," -> " ,*p)
    
    v1 := Vertex{4,5}
    v2 := Vertex{X:9,Y:9}
    v3 := Vertex{X:9} // Y=0 is implicit

    fmt.Println(v1.X)
    fmt.Println(v2,v3)

    // arrays
    var s1[2] string

    s1[0] = "hi"
    s1[1] = "there"

    fmt.Println("a[0]: ",s1[0])
    fmt.Println("a: ",s1)
    
    arr := []int{1,2,4,5,23,123,5,0}
    fmt.Println("arr ==", arr)

    for i := 0; i < len(arr); i++ {
        fmt.Printf("arr[%d] == %d\n", i, arr[i])
    }
    fmt.Println("arr[:3] == ", arr[:3])
    fmt.Println("arr[2:5] == ", arr[2:5])
    fmt.Println("arr[5:] == ", arr[5:])
    fmt.Println("arr[:] == ", arr[:])

    a := make([]int, 5)
    printSlice("a", a)
    b := make([]int, 0, 5)
    printSlice("b", b)
    c := b[:2]
    printSlice("c", c)
    d := c[2:5]
    printSlice("d", d)

    var z[]int

    // zero value for empty array is nil
    if z == nil{

        fmt.Println("nil,",z)
    
    }

    printSlice("z",z)
    z = append(z,1)
    z = append(z,2)
    z = append(z,4)
    var z2[]int = append(z,3,5,6)
    printSlice("z",z)
    printSlice("z",z2)

    for i,v := range pow{
        fmt.Printf("2^%d = %d\n",i,v)
    }

    pwrs := make([]int,10)
    for i := range pwrs{
        pwrs[i] = 1 << uint(i)
    }
    for _,val := range pwrs{
        fmt.Println(val)
    }
    pic.Show(Pic)
    
    var m map[string]Vertex

    m = make(map[string]Vertex)

    m["Bell labs"] = Vertex{342,4532}

    var m2 = map[string]Vertex {
        "Google": {33,44},
        "General Electric": {54322,3423},
        "deleteme":{},
    }

    delete(m2,"deleteme")

    fmt.Println(m,m2)

    // functions

    hypnot := func(x,y float64) float64 {
        return math.Sqrt(x*x+y*y)
    }
    fmt.Println(hypnot(4.0,3.0))

    adder := closureAdder()
    for i:=0; i<10; i++{
        fmt.Printf(" %d ",adder(i))
    }
    fmt.Printf("\n");

}

func closureAdder() func(int) int{
    sum := 0
    return func (x int) (int) {
        sum += x
        return sum
    }
}

func Pic(dx,dy int)([][]uint8){
    pic := make([][]uint8, dy)
    for i := range pic{
        pic[i] = make([]uint8, dx)
    }
    for i := 0; i < dx; i++{
        
        for j := 0; j < dy; j++{
            pic[i][j] = uint8((i+j)/3)
        }
    }
    return pic
}

func printSlice(s string, x []int) {
    fmt.Printf("%s len=%d cap=%d %v\n",
            s, len(x), cap(x), x)
}


