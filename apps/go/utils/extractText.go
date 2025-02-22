package utils

import (
	"bytes"
	_ "embed"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"

	"github.com/KSpaceer/goppt"
)

//go:embed pdfbox-app-3.0.4.jar
var pdfBoxJar []byte

func ExtractTextFromPDF(path string) (string, error) {

	if _, err := os.Stat(path); err != nil {
		return "", fmt.Errorf("error accessing PDF file: %w", err)
	}

	jarPath, err := createTempFile(pdfBoxJar, "pdfbox-*.jar")
	fmt.Println("jarpath: ", jarPath)
	fmt.Println("pdfpath: ", path)

	if err != nil {
		return "", fmt.Errorf("creating temp JAR file: %w", err)
	}
	defer os.Remove(jarPath) // Clean up

	// 2. Construct the PDFBox command with -console flag
	cmd := exec.Command("java", "-jar", jarPath, "export:text", "-console", "-i", path)
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err = cmd.Run()
	if err != nil {
		return "", fmt.Errorf("running PDFBox: %w, stderr: %s", err, stderr.String())
	}
	text := strings.TrimSpace(stdout.String())
	return text, nil
}

func createTempFile(data []byte, pattern string) (string, error) {
	tmpFile, err := os.CreateTemp("", pattern)
	if err != nil {
		return "", err
	}
	defer tmpFile.Close()

	if _, err := tmpFile.Write(data); err != nil {
		os.Remove(tmpFile.Name()) // Clean up if write fails
		return "", err
	}

	return tmpFile.Name(), nil
}

func ExtractTextFromPPT(pptPath string) (string, error) {

	file, err := os.Open(pptPath)
	if err != nil {
		fmt.Printf("Error opening file: %s\n", err)
		return "", err
	}
	defer file.Close()

	// Extract text from the PPTX file
	text, err := goppt.ExtractText(file)
	if err != nil {
		fmt.Printf("Error extracting text: %s\n", err)
		return "", err
	}

	log.Println("Extracted text from PPTX file:", text)
	return text, nil
}
