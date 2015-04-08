package lab
import "fmt"

type Measurement struct {
    ID              int64
    Frequency       float64
    Magnitude       float64
    Tolerance       float64
}

type Measurements []Measurement

type Lab struct {
    ID              int64
    Name            string
    Values          Measurements
}

type Labs []Lab

func (l Lab) String() string {
    return fmt.Sprintf("Lab{ID:%d, Name:%s, Values:%d}", l.ID, l.Name, len(l.Values))
}
