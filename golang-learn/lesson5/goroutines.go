package main

import (
	"fmt"
	"time"
)

func product(vals []int, c chan int) {
	p := 0
	for _, val := range vals {
		p += val
	}
	c <- p
}

func fib(n int, c chan int) {
	x, y := 0, 1

	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}

	close(c)
}

func fibfov(c, quit chan int) {
	x, y := 0, 1

	for {
		select {
		case c <- x:
			x, y = y, x+y

		case <-quit:
			return
		}
	}

}

func main() {
	a := []int{1, 2, 4, 23, 3, 4, 23, 432, 432, 4, 32, 453, 543, 5, 435, 324, 5, 345, 4325, 435, 43, 53, 45, 435, 45}

	c := make(chan int)
	c_result := make(chan int)

	go product(a[len(a)/2:], c)
	go product(a[:len(a)/2], c)
	go product(a, c_result)

	x, y := <-c, <-c

	fmt.Println(x, y, x+y, <-c_result)

	count := 50
	cf := make(chan int, count)
	go fib(count, cf)

	for i := range cf {
		fmt.Println(i)
	}

	cfov := make(chan int)
	cquit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-cfov)
		}
		cquit <- 0
	}()
	fibfov(cfov, cquit)

	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)

	ticking := true
	for ticking {
		select {
		case <-tick:
			fmt.Println("tick")

		case <-boom:
			fmt.Println("boom")
			ticking = false
		default:
			fmt.Println("      .")
			time.Sleep(50 * time.Millisecond)

		}
	}

}
