package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	utils "ripple/utils"

	deepseek "github.com/cohesion-org/deepseek-go"
	"github.com/cohesion-org/deepseek-go/constants"
	uuid "github.com/satori/go.uuid"
)

type Option struct {
	Id    int    `json:"Id"`
	Value string `json:"value"`
}

type Answer struct {
	Id    int    `json:"Id"`
	Value string `json:"value"`
}

type QuestionObject struct {
	UUID       string   `json:"uuid,omitempty"`
	Question   string   `json:"question"`
	Options    []Option `json:"options"`
	Answer     Answer   `json:"answer"`
	Difficulty int      `json:"difficulty"`
}

// Questions represents a list of educational questions.
type Questions struct {
	Question []QuestionObject `json:"questions"`
}

type WhAnswer struct {
	ID    int    `json:"id"`
	Value string `json:"value"`
}

type WhQuestion struct {
	UUID     string     `json:"uuid,omitempty"`
	Question string     `json:"question"`
	Answers  []WhAnswer `json:"answers"`
}

type WhQuestions struct {
	Questions []WhQuestion `json:"questions"`
}

// Extract questions extracts educational questions from a provided pdf file.
func ExtractMCQ(path string) (Questions, error) {

	ext := strings.ToLower(filepath.Ext(path))

	var text string
	var err error

	switch ext {
	case ".png", ".jpg", ".jpeg":
		text, err = utils.Imagetotext(path)
		if err != nil {
			return Questions{}, fmt.Errorf("failed to extract text from image: %w", err)
		}
	case ".pdf":
		text, err = utils.ExtractTextFromPDF(path)
		if err != nil {
			return Questions{}, fmt.Errorf("failed to extract text from PDF: %w", err)
		}
	case ".ppt":
		text, err = utils.ExtractTextFromPPT(path)

	default:
		return Questions{}, fmt.Errorf("unsupported file type: %s", ext)
	}

	if text == "" {
		return Questions{}, fmt.Errorf("no text found in the file")
	}

	if err != nil {

		return Questions{}, err
	}
	promptBytes, err := os.ReadFile("prompts/questions_prompt.txt")
	if err != nil {
		return Questions{}, err
	}
	prompt := string(promptBytes)

	ctx := context.Background()
	// client := deepseek.NewClient(os.Getenv("DEEPSEEK_API_KEY"), "https://api.deepseek.com/beta/")
	client := deepseek.NewClient(os.Getenv("OPENROUTER_API_KEY"), "https://openrouter.ai/api/v1/")

	resp, err := client.CreateChatCompletion(ctx, &deepseek.ChatCompletionRequest{
		// Model: "qwen/qwen-2.5-coder-32b-instruct",
		Model: "deepseek/deepseek-r1-distill-qwen-32b",
		// Model: "deepseek/deepseek-r1-distill-llama-70b",
		// Model: deepseek.DeepSeekChat,
		Messages: []deepseek.ChatCompletionMessage{
			{Role: constants.ChatMessageRoleSystem, Content: prompt},
			{Role: constants.ChatMessageRoleUser, Content: text},
			// {Role: constants.ChatMessageRoleAssistant, Content: "```json\n", Prefix: true},
		},
		// Stop:     []string{"```"}, // Stop the prefix when the assistant sends the closing triple backticks
		JSONMode: true,
	})
	if err != nil {
		log.Printf("Failed to create chat completion: %v", err)
		return Questions{}, err
	}
	if resp == nil || len(resp.Choices) == 0 {
		log.Printf("No response or choices found")
		return Questions{}, fmt.Errorf("no response or choices found")
	}

	fmt.Printf("Response: %+v\n", resp)

	extractor := deepseek.NewJSONExtractor(nil)
	var questions Questions

	if err := extractor.ExtractJSON(resp, &questions); err != nil {
		log.Println(err)
		return Questions{}, err
	}

	//loop through the questions and attach a new uuid to each question

	for i := range questions.Question {
		myuuid := uuid.NewV4()
		questions.Question[i].UUID = myuuid.String()
	}

	fmt.Printf("Questions: %+v\n", questions)

	return questions, nil
}

func ExtractWh(path string) (WhQuestions, error) {
	ext := strings.ToLower(filepath.Ext(path))

	var text string
	var err error

	switch ext {
	case ".png", ".jpg", ".jpeg":
		text, err = utils.Imagetotext(path)
		if err != nil {
			return WhQuestions{}, fmt.Errorf("failed to extract text from image: %w", err)
		}
	case ".pdf":
		text, err = utils.ExtractTextFromPDF(path)
		if err != nil {
			return WhQuestions{}, fmt.Errorf("failed to extract text from PDF: %w", err)
		}
	case ".ppt":
		text, err = utils.ExtractTextFromPPT(path)
		if err != nil {
			return WhQuestions{}, fmt.Errorf("failed to extract text from PPT: %w", err)
		}
	default:
		return WhQuestions{}, fmt.Errorf("unsupported file type: %s", ext)
	}

	if text == "" {
		return WhQuestions{}, fmt.Errorf("no text found in the file")
	}

	promptBytes, err := os.ReadFile("prompts/wh-questions.txt") // Updated prompt file name
	if err != nil {
		return WhQuestions{}, err
	}
	prompt := string(promptBytes)

	ctx := context.Background()
	client := deepseek.NewClient(os.Getenv("OPENROUTER_API_KEY"), "https://openrouter.ai/api/v1/")

	resp, err := client.CreateChatCompletion(ctx, &deepseek.ChatCompletionRequest{
		Model: "deepseek/deepseek-r1-distill-qwen-32b",
		Messages: []deepseek.ChatCompletionMessage{
			{Role: constants.ChatMessageRoleSystem, Content: prompt},
			{Role: constants.ChatMessageRoleUser, Content: text},
		},
		JSONMode: true,
	})
	if err != nil {
		log.Printf("Failed to create chat completion: %v", err)
		return WhQuestions{}, err
	}
	if resp == nil || len(resp.Choices) == 0 {
		log.Printf("No response or choices found")
		return WhQuestions{}, fmt.Errorf("no response or choices found")
	}

	fmt.Printf("Response: %+v\n", resp)

	extractor := deepseek.NewJSONExtractor(nil)
	var whQuestions WhQuestions

	if err := extractor.ExtractJSON(resp, &whQuestions); err != nil {
		log.Println(err)
		return WhQuestions{}, err
	}

	for i := range whQuestions.Questions {
		myuuid := uuid.NewV4()
		whQuestions.Questions[i].UUID = myuuid.String()
	}

	return whQuestions, nil
}

type Result struct {
	IsCorrect bool   `json:"is_correct"`
	Reason    string `json:"reason"`
}

// write a function called Whchecker that checks if the asked question is a wh question is somwhat similar or not using gemini flash
// also include what the user put as answer
// test if this works later.
func Whchecker(question WhQuestion, userAnswer string) (result Result, err error) {

	ctx := context.Background()
	client := deepseek.NewClient(os.Getenv("OPENROUTER_API_KEY"), "https://openrouter.ai/api/v1/")

	promptBytes, err := os.ReadFile("prompts/wh-checker.txt")
	if err != nil {
		return Result{}, err
	}
	prompt := string(promptBytes)
	answers := make([]string, len(question.Answers))
	for i, ans := range question.Answers {
		answers[i] = ans.Value
	}
	content := fmt.Sprintf("question: %s\nAnswers: %s\nUser answer: %s",
		question.Question,
		strings.Join(answers, ", "),
		userAnswer)

	resp, err := client.CreateChatCompletion(ctx, &deepseek.ChatCompletionRequest{
		Model: "deepseek/deepseek-r1-distill-qwen-32b",
		Messages: []deepseek.ChatCompletionMessage{
			{Role: constants.ChatMessageRoleSystem, Content: prompt},
			{Role: constants.ChatMessageRoleUser, Content: content},
		},
		JSONMode: true,
	})
	if err != nil {
		log.Printf("Failed to create chat completion: %v", err)
		return Result{}, err
	}
	if resp == nil || len(resp.Choices) == 0 {
		log.Printf("No response or choices found")
		return Result{}, fmt.Errorf("no response or choices found")
	}

	extractor := deepseek.NewJSONExtractor(nil)
	var _result Result

	if err := extractor.ExtractJSON(resp, &_result); err != nil {
		log.Println(err)
		return Result{}, err
	}

	return _result, nil
}
