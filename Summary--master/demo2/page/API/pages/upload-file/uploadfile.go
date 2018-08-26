package main

import (
	"github.com/kataras/iris"
	"io"
	"os"
)

func main() {
	app := iris.New()
	app.Get("/", func(ctx iris.Context) {
		ctx.WriteString("web is ok.")
	})

	app.Post("/upload_image", func(ctx iris.Context) {
		_, info, _ := ctx.FormFile("image") //iris v6
		file, _ := info.Open()
		defer file.Close()

		f, _ := os.OpenFile("./image.png", os.O_WRONLY|os.O_CREATE, 0666)
		io.Copy(f, file)

		ctx.WriteString("ok")
	})

	app.Run(iris.Addr(":8080"))
}
