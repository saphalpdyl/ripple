package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	// initiate a gin server
	r := gin.Default()

	// get request
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// post request
	r.POST("/extractorpdf", func(c *gin.Context) {
		// Retrieve the file from the form data
		file, err := c.FormFile("file")

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Open the uploaded file
		uploadedFile, err := file.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
			return
		}
		defer uploadedFile.Close()

		uploadDir := "./uploads"

		// Create the upload directory if it doesn't exist
		if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
			os.Mkdir(uploadDir, os.ModePerm)
		}

		// Save the uploaded file directly
		savedFilePath := filepath.Join(uploadDir, file.Filename)
		err = c.SaveUploadedFile(file, savedFilePath)
		defer os.Remove(savedFilePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save uploaded file"})
			return
		}

		questions, err := ExtractMCQ(savedFilePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"questions": questions,
		})
	})

	r.POST("/extractorimage", func(c *gin.Context) {
		// Retrieve the file from the form data
		file, err := c.FormFile("file")

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// save the image locally with a random name
		uploadDir := "./uploads"

		// Create the upload directory if it doesn't exist
		if _, err := os.Stat("./uploads"); os.IsNotExist(err) {
			os.Mkdir(uploadDir, os.ModePerm)
		}

		uploadedFile, err := file.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
			return
		}
		defer uploadedFile.Close()

		// create a random filename

		filename := uuid.New().String()
		extension := filepath.Ext(file.Filename)
		filename = filename + extension

		// save the file
		savedFilePath := filepath.Join(uploadDir, filename)
		err = c.SaveUploadedFile(file, savedFilePath)
		defer os.Remove(savedFilePath)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save uploaded file"})
			return
		}
		// mcqquestions, err := ExtractMCQ(savedFilePath)
		// if err != nil {
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		whquestions, err := ExtractWh(savedFilePath)

		fmt.Println("whquestions: ", whquestions)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			// "questions":   mcqquestions,
			"whquestions": whquestions,
		})
	})

	r.POST("/translate", func(c *gin.Context) {
		// Create a struct to receive the JSON payload
		var questions Questions

		// Bind the JSON request body to our Questions struct
		if err := c.ShouldBindJSON(&questions); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format: " + err.Error()})
			return
		}

		// Call the translation function (to be implemented)
		translatedQuestions, err := TranslateQuestions(questions)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Return the translated questions
		c.JSON(http.StatusOK, gin.H{
			"questions": translatedQuestions,
		})
	})

	r.POST("/translatetext", func(c *gin.Context) {
		var request struct {
			Text string `json:"text"`
		}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format: " + err.Error()})
			return
		}

		translatedText, err := TranslateText(request.Text)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"translated": translatedText,
		})
	})

	// add a ppt endpoint too that converts ppt to pdf and then calls the extractquestions function
	r.POST("/extractorppt", func(c *gin.Context) {
		// Retrieve the file from the form data
		file, err := c.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Open the uploaded file
		uploadedFile, err := file.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
			return
		}
		defer uploadedFile.Close()

		uploadDir := "./uploads"

		// Create the upload directory if it doesn't exist
		if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
			os.Mkdir(uploadDir, os.ModePerm)
		}

		// Save the uploaded file directly
		savedFilePath := filepath.Join(uploadDir, file.Filename)
		err = c.SaveUploadedFile(file, savedFilePath)
		defer os.Remove(savedFilePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save uploaded file"})
			return
		}

		questions, err := ExtractMCQ(savedFilePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"questions": questions,
		})
	})

	r.POST("/checkwh", func(c *gin.Context) {
		var request struct {
			Question WhQuestion `json:"question"`
			Answer   string     `json:"answer"`
		}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format: " + err.Error()})
			return
		}

		fmt.Println("request: ", request)

		check, err := Whchecker(request.Question, request.Answer)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"result": check,
		})
	})

	// run the server
	r.Run(":8080")
}
