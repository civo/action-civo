package main

import (
	"fmt"
	"os"
)

func main() {
	token := os.Getenv("INPUT_TOKEN")

	output := fmt.Sprintf("%s", token)

	fmt.Println(fmt.Sprintf(`version=%s >> $GITHUB_OUTPUT`, output))
}
