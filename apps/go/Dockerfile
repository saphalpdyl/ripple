FROM golang:latest

RUN apt-get update && apt-get install -y \
    default-jdk \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-chi-sim \
    tesseract-ocr-spa \
    libleptonica-dev \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

RUN java -version && tesseract --version

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]