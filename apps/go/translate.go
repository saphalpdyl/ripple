package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	deepseek "github.com/cohesion-org/deepseek-go"
	"github.com/cohesion-org/deepseek-go/constants"
)

type TranslatedQuestions struct {
	Chinese Questions `json:"chinese"`
	Spanish Questions `json:"spanish"`
}

type TranslatedText struct {
	Chinese string `json:"chinese"`
	Spanish string `json:"spanish"`
}

// TranslateQuestions translates the given questions into Chinese and Spanish using the DeepSeek model.
func TranslateQuestions(questions Questions) (TranslatedQuestions, error) {
	questionJSON, err := json.Marshal(questions)
	if err != nil {
		return TranslatedQuestions{}, fmt.Errorf("failed to marshal questions: %w", err)
	}

	promptBytes, err := os.ReadFile("translate_prompt.txt")
	if err != nil {
		return TranslatedQuestions{}, fmt.Errorf("failed to read translate prompt: %w", err)
	}
	prompt := string(promptBytes)

	ctx := context.Background()
	client := deepseek.NewClient(os.Getenv("OPENROUTER_API_KEY"), "https://openrouter.ai/api/v1/")

	resp, err := client.CreateChatCompletion(ctx, &deepseek.ChatCompletionRequest{
		// Model: "deepseek/deepseek-r1-distill-qwen-32b",
		Model: "google/gemini-2.0-flash-001",
		Messages: []deepseek.ChatCompletionMessage{
			{Role: constants.ChatMessageRoleSystem, Content: prompt},
			{Role: constants.ChatMessageRoleUser, Content: string(questionJSON)},
		},
		JSONMode: true,
	})
	if err != nil {
		return TranslatedQuestions{}, fmt.Errorf("failed to create chat completion: %w", err)
	}

	if resp == nil || len(resp.Choices) == 0 {
		return TranslatedQuestions{}, fmt.Errorf("no response or choices found from translation API")
	}

	extractor := deepseek.NewJSONExtractor(nil)
	var translatedQs TranslatedQuestions
	if err := extractor.ExtractJSON(resp, &translatedQs); err != nil {
		return TranslatedQuestions{}, fmt.Errorf("failed to extract translated JSON: %w", err)
	}

	return translatedQs, nil
}

// just translate normal text
func TranslateText(text string) (TranslatedText, error) {
	promptBytes, err := os.ReadFile("translate_text_prompt.txt")
	if err != nil {
		return TranslatedText{}, fmt.Errorf("failed to read translate prompt: %w", err)
	}
	prompt := string(promptBytes)

	ctx := context.Background()
	client := deepseek.NewClient(os.Getenv("OPENROUTER_API_KEY"), "https://openrouter.ai/api/v1/")

	resp, err := client.CreateChatCompletion(ctx, &deepseek.ChatCompletionRequest{
		// Model: "deepseek/deepseek-r1-distill-qwen-32b",
		Model: "google/gemini-2.0-flash-001",
		Messages: []deepseek.ChatCompletionMessage{
			{Role: constants.ChatMessageRoleSystem, Content: prompt},
			{Role: constants.ChatMessageRoleUser, Content: text},
		},
		JSONMode: true,
	})
	if err != nil {
		return TranslatedText{}, fmt.Errorf("failed to create chat completion: %w", err)
	}

	if resp == nil || len(resp.Choices) == 0 {
		return TranslatedText{}, fmt.Errorf("no response or choices found from translation API")
	}
	extractor := deepseek.NewJSONExtractor(nil)
	var translatedText TranslatedText
	if err := extractor.ExtractJSON(resp, &translatedText); err != nil {
		return TranslatedText{}, fmt.Errorf("failed to extract translated JSON: %w", err)
	}

	return translatedText, nil
}
