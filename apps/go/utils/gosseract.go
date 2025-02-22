package utils

import (
	"fmt"

	"github.com/otiai10/gosseract/v2"
)

func Imagetotext(path string) (text string, err error) {
	client := gosseract.NewClient()

	defer client.Close()
	client.SetImage("image.png")
	text_, err := client.Text()
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	return text_, nil
	// Hello, World!
}
