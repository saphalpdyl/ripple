import type { Card } from "@repo/types"

export const mockShuffleData: {
  "questions": {
    "questions": Card[],
  }
} = {
    "questions": {
      "questions": [
        {
          "uuid": "8e24add8-246a-49c0-8df3-272b2b2f5556",
          "question": "What is a programmer?",
          "options": [
            {
              "Id": 1,
              "value": "Someone who repairs computers"
            },
            {
              "Id": 2,
              "value": "Someone who writes programs"
            },
            {
              "Id": 3,
              "value": "Someone who designs computer hardware"
            },
            {
              "Id": 4,
              "value": "Someone who uses software"
            }
          ],
          "answer": {
            "Id": 2,
            "value": "Someone who writes programs"
          },
          "difficulty": 2
        },
        {
          "uuid": "0d230710-005e-4d6e-b3db-c7e719a1df2d",
          "question": "What does the CPU stand for?",
          "options": [
            {
              "Id": 1,
              "value": "Central Processing Unit"
            },
            {
              "Id": 2,
              "value": "Central Programming Unit"
            },
            {
              "Id": 3,
              "value": "Computer Processing Unit"
            },
            {
              "Id": 4,
              "value": "Core Programming Unit"
            }
          ],
          "answer": {
            "Id": 1,
            "value": "Central Processing Unit"
          },
          "difficulty": 3
        },
        {
          "uuid": "586f31c2-b977-4142-b42b-5cc0660ebbb2",
          "question": "Which component is non-volatile?",
          "options": [
            {
              "Id": 1,
              "value": "Main Memory"
            },
            {
              "Id": 2,
              "value": "Secondary Storage"
            },
            {
              "Id": 3,
              "value": "CPU"
            },
            {
              "Id": 4,
              "value": "RAM"
            }
          ],
          "answer": {
            "Id": 2,
            "value": "Secondary Storage"
          },
          "difficulty": 4
        },
        {
          "uuid": "3296ebf2-2834-4f8d-b993-c418fb93022a",
          "question": "What is an example of an output device?",
          "options": [
            {
              "Id": 1,
              "value": "Keyboard"
            },
            {
              "Id": 2,
              "value": "Scanner"
            },
            {
              "Id": 3,
              "value": "Monitor"
            },
            {
              "Id": 4,
              "value": "Mouse"
            }
          ],
          "answer": {
            "Id": 3,
            "value": "Monitor"
          },
          "difficulty": 3
        },
        {
          "uuid": "908d8263-d835-48ae-8d49-903aa963a0a0",
          "question": "Which of the following is system software?",
          "options": [
            {
              "Id": 1,
              "value": "Microsoft Word"
            },
            {
              "Id": 2,
              "value": "Operating System"
            },
            {
              "Id": 3,
              "value": "Excel"
            },
            {
              "Id": 4,
              "value": "Photoshop"
            }
          ],
          "answer": {
            "Id": 2,
            "value": "Operating System"
          },
          "difficulty": 3
        },
        {
          "uuid": "15c18547-98b8-40f5-ba4d-d499b5552716",
          "question": "What does RAM stand for?",
          "options": [
            {
              "Id": 1,
              "value": "Random Access Memory"
            },
            {
              "Id": 2,
              "value": "Read-Only Memory"
            },
            {
              "Id": 3,
              "value": "Randomly Allocated Memory"
            },
            {
              "Id": 4,
              "value": "Remote Access Memory"
            }
          ],
          "answer": {
            "Id": 1,
            "value": "Random Access Memory"
          },
          "difficulty": 2
        },
        {
          "uuid": "3552aeb5-e676-4ddc-a7fa-e5b57160e331",
          "question": "Which step converts high-level code to machine code?",
          "options": [
            {
              "Id": 1,
              "value": "Preprocessor"
            },
            {
              "Id": 2,
              "value": "Compiler"
            },
            {
              "Id": 3,
              "value": "Linker"
            },
            {
              "Id": 4,
              "value": "Debugger"
            }
          ],
          "answer": {
            "Id": 2,
            "value": "Compiler"
          },
          "difficulty": 4
        },
        {
          "uuid": "e2fdc205-eaa6-4576-b09c-8c23bc4b8674",
          "question": "Which of the following is a high-level programming language?",
          "options": [
            {
              "Id": 1,
              "value": "Machine Language"
            },
            {
              "Id": 2,
              "value": "C++"
            },
            {
              "Id": 3,
              "value": "Assembly"
            },
            {
              "Id": 4,
              "value": "Binary"
            }
          ],
          "answer": {
            "Id": 2,
            "value": "C++"
          },
          "difficulty": 3
        },
        {
          "uuid": "610cd8dd-8ec0-4bed-8471-57232e68b286",
          "question": "What is a variable in programming?",
          "options": [
            {
              "Id": 1,
              "value": "A keyword"
            },
            {
              "Id": 2,
              "value": "A named storage location"
            },
            {
              "Id": 3,
              "value": "An operator"
            },
            {
              "Id": 4,
              "value": "A punctuation mark"
            }
          ],
          "answer": {
            "Id": 2,
            "value": "A named storage location"
          },
          "difficulty": 3
        },
        {
          "uuid": "9a3fcd59-7683-4d22-9589-35ecaf83bac9",
          "question": "What is the first step in the programming process?",
          "options": [
            {
              "Id": 1,
              "value": "Processing"
            },
            {
              "Id": 2,
              "value": "Input"
            },
            {
              "Id": 3,
              "value": "Output"
            },
            {
              "Id": 4,
              "value": "Compilation"
            }
          ],
          "answer": {
            "Id": 2,
            "value": "Input"
          },
          "difficulty": 2
        }
      ]
    },
    "whquestions": {
      "questions": [
        {
          "uuid": "940dc9dd-81c3-4744-b1a6-7aef9392af33",
          "question": "What is a program?",
          "answers": [
            {
              "id": 1,
              "value": "A set of instructions that the computer follows to perform a task"
            },
            {
              "id": 2,
              "value": "Data stored in secondary memory"
            },
            {
              "id": 3,
              "value": "A hardware component like the CPU"
            },
            {
              "id": 4,
              "value": "A type of software only used for gaming"
            }
          ]
        },
        {
          "uuid": "390987f5-a131-431d-bb26-86aa2165417b",
          "question": "Why is programming important?",
          "answers": [
            {
              "id": 1,
              "value": "Without programmers, no programs; without programs, a computer cannot do anything"
            },
            {
              "id": 2,
              "value": "It allows the computer to store data permanently"
            },
            {
              "id": 3,
              "value": "It helps in creating input devices"
            },
            {
              "id": 4,
              "value": "It is only important for gaming applications"
            }
          ]
        },
        {
          "uuid": "01caf81a-4744-4e97-bd3c-d1f6c99325aa",
          "question": "What are the main categories of hardware components?",
          "answers": [
            {
              "id": 1,
              "value": "Central Processing Unit (CPU), Main Memory, Secondary Memory/Storage, Input Devices, Output Devices"
            },
            {
              "id": 2,
              "value": "Keyboard, Mouse, touchscreen"
            },
            {
              "id": 3,
              "value": "Operating Systems and Applications"
            },
            {
              "id": 4,
              "value": "Gaming Consoles and Peripherals"
            }
          ]
        },
        {
          "uuid": "a660bb8a-03af-4ad2-84a2-ec49d8afb05f",
          "question": "How is a high-level program converted into an executable file?",
          "answers": [
            {
              "id": 1,
              "value": "It is processed by a preprocessor, compiler, and linker"
            },
            {
              "id": 2,
              "value": "It is directly executed by the CPU"
            },
            {
              "id": 3,
              "value": "It is stored in secondary memory"
            },
            {
              "id": 4,
              "value": "It is converted into machine language manually by the programmer"
            }
          ]
        },
        {
          "uuid": "dd908239-8d65-4043-9788-1e1db3be8386",
          "question": "What is the difference between hardware and software?",
          "answers": [
            {
              "id": 1,
              "value": "Hardware is physical components, while software is programs that run on the computer"
            },
            {
              "id": 2,
              "value": "Hardware is used for input, while software is used for output"
            },
            {
              "id": 3,
              "value": "Hardware is non-volatile, while software is volatile"
            },
            {
              "id": 4,
              "value": "Hardware is used for gaming, while software is used for programming"
            }
          ]
        }
      ]
    }
  }