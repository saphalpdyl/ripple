# Ripple

Ripple is a web application born out of the UMaimi Horizon AI hackathon, inspired by the challenges of studying for midterms using PDFs and written notes. It provides a 3-d gamified quiz experience built with a Next.js frontend, a Go backend deployed on Cloud Run, and Firebase for database storage. The application leverages a monorepo architecture managed by Turborepo and includes a WebSocket server for real-time communication.

## ✨ Key Features

- 🎲 **3D Multiplayer Gaming**: Challenge friends in real-time quiz battles
- 📚 **Universal File Support**: Works with PDFs, PPTs, Images, and Text
- 🤖 **AI-Powered Questions**: Automatically generates MCQs and open-ended questions
- 🌎 **Multi-Language Support**: Instantly translate to Chinese and Spanish
- 📱 **Canvas Integration**: Seamlessly import your course materials
- 🎯 **Accessibility First**: Text-to-speech and keyboard navigation support
- 🎤 **Mic Integration**: Voice control and speech-to-text support for accessibility and interactive gameplay

## Technical Features

*   **Web App:**
    *   User authentication (sign-up, login)
    *   Interactive canvas page
    *   Potentially includes courses and questions (based on the `courses.ts` and `getQuestions.ts` files)
*   **Go Backend:**
    *   Extracts text from various file formats (using `extractor.go` and `extractText.go`)
    *   Translates text (using `translate.go`)
    *   Utilizes OCR for image-based text extraction (using `gosseract.go`, go wrapper for tessaract) 
*   **WebSocket Server:**
    *   Enables real-time communication between the frontend and backend

## Architecture

The project follows a monorepo structure, which promotes code sharing and simplifies dependency management.

*   **Turborepo:** Used as the monorepo management tool, providing features like remote caching and optimized build processes.
*   **Next.js:** The frontend is built with Next.js, a React framework that offers features like server-side rendering and static site generation.
*   **Go:** The backend is implemented in Go and deployed on Cloud Run, leveraging its scalability and managed environment.
*   **Firebase:** Firebase is used for database storage of the questions for cards.
*   **WebSocket Server:** The `ws` app uses a WebSocket server to enable real-time communication.
*   **Shared Components:** The project utilizes shared UI components (`@repo/ui`) to maintain a consistent look and feel across the application.
*   **ESLint and Prettier:** Code quality is enforced using ESLint and Prettier.
*   **TypeScript:** The entire project is written in TypeScript, providing static type checking and improved code maintainability.

## Apps Folder

The `apps` folder contains the main applications of the project:

*   **`apps/web`:** This directory contains the Next.js frontend application.
    *   `actions`: Contains asynchronous functions for fetching data and performing actions.
    *   `app`: Contains the Next.js app router, defining the application's pages and layouts.
    *   `components`: Contains reusable React components.
    *   `firebase`: Contains Firebase initialization and related code.
    *   `helpers`: Contains helper functions, such as authentication helpers.
    *   `lib`: Contains utility functions.
    *   `public`: Contains static assets.
    *   `store`: Contains Zustand stores for managing application state.
*   **`apps/go`:** This directory contains the Go backend application.
    *   `extractor.go`: Implements the text extraction logic.
    *   `translate.go`: Implements the translation logic.
    *   `utils`: Contains utility functions, such as text extraction and OCR helpers.
    *   `prompts`: Contains prompts for the translation service.
*   **`apps/ws`:** This directory contains the WebSocket server application.
    *   `src`: Contains the server-side code for the WebSocket server.
    *   `public`: Contains static assets for the WebSocket server.

## Quality Aspects

This repository demonstrates several quality aspects:

*   **Modern Technologies:** The project utilizes modern technologies like Turborepo, Next.js, Go, and TypeScript.
*   **Monorepo Architecture:** The monorepo architecture promotes code sharing and simplifies dependency management.
*   **Code Quality:** The project uses ESLint and Prettier to enforce code quality and consistency.
*   **TypeScript:** The use of TypeScript provides static type checking and improves code maintainability.
*   **Well-Structured Code:** The code is well-structured and organized, making it easier to understand and maintain.

## Inspiration

The inspiration for Ripple came to us when we were having a hard time studying for our midterms last weekend. It was really difficult for some classes that only provided PDFs, PPTs, or even written notes to learn and test ourselves on. Hence, we decided to tackle this problem in this hackathon by creating Ripple, which provides a gamified experience of taking quizzes using the xyz method. We also hoped our solution would transcend linguistic barriers, and we made it translate into Chinese and Spanish using generative AI.

## What it does

Ripple basically takes in different forms of academic texts and converts them into questions that you can play with/against your friends until one of you wins. We have also added integration to Canvas in the background, making it really easy for someone to add files from their courses directly. Similarly, we have done our best to make the platform as accessible to everyone as possible through features like translation and text to speech.

## How we built it

Frontend: React, Next, Threejs
Backend: Go with Gin, Tesseract, OpenRouter

## Challenges we ran into

The biggest challenge was figuring out the game loop and also getting a 3D workspace to work through the browser.

## Accomplishments that we're proud of

We are really proud of being able to extend generative AI for more accessibility areas, the implementation of the card deck and 3D table, and the overall look and feel of the application.

## What's next for Ripple

We really want to connect Ripple to SMS or a popular messaging service for those who might not be able to load 3D animations in their devices.

## Run Your Own Instance

To run your own instance of Ripple, follow these steps:

### Frontend (`apps/web`)

1.  Navigate to the frontend directory: `cd apps/web`
2.  Install dependencies: `pnpm install`
3.  Run the development server: `pnpm dev`

The frontend will be accessible at `localhost:3000` by default.

### Backend (`apps/go`)

1.  Ensure you have Go installed.
2.  Navigate to the backend directory: `cd apps/go`
3.  Download dependencies: `go mod download`
4.  Run the backend: `go run main.go`

The backend will be accessible at `localhost:8080` by default.

### WebSocket Server (`apps/ws`)

1.  Navigate to the WebSocket server directory: `cd apps/ws`
2.  Install dependencies: `pnpm install`
3.  Run the server: `pnpm dev`

The WebSocket server will be running on a specific port.

## Run Your Own Instance

To run your own instance of Ripple, follow these steps:

### Frontend (`apps/web`)

1.  Navigate to the frontend directory: `cd apps/web`
2.  Install dependencies: `pnpm install`
3.  Run the development server: `pnpm dev`

The frontend will be accessible at `localhost:3000` by default.

### Backend (`apps/go`)

1.  Ensure you have Go installed.
2.  Navigate to the backend directory: `cd apps/go`
3.  Download dependencies: `go mod download`
4.  Run the backend: `go run main.go`

The backend will be accessible at `localhost:8080` by default.

### WebSocket Server (`apps/ws`)

1.  Navigate to the WebSocket server directory: `cd apps/ws`
2.  Install dependencies: `pnpm install`
3.  Run the server: `pnpm dev`

The WebSocket server will be running on a specific port.


Meet the amazing team behind Ripple:

- [Saphal](https://github.com/saphalpdyl) - Frontend & 3D
- [Sugam(vein05)](https://github.com/vein05) - Backend & AI
- [Sakshyam](https://github.com/S-Sigdel) - Design & UX
