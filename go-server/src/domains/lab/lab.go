package lab

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
