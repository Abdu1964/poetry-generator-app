Poetry Generator App - README
-------------------------------------
Project Overview
This Poetry Generator app allows users to input keywords and an optional style, and then generates a poem based on their input. The core of the app uses prompt engineering techniques to guide a Large Language Model (LLM), I use gemini, in creating unique and contextually relevant poetry. The application is built with React for the frontend, Node.js/Express for the backend, and relies on LLM APIs to generate the poetry.

Why I Used These zero-shot and few-shot prompting Techniques
-------------------------------------------------------------
I use zero-shot prompting when the user provides just keywords. This allows the model to generate a creative poem based on its knowledge without needing any specific style or examples. It gives the model the freedom to create fresh and imaginative poetry from the provided keywords.
Few-Shot Prompting:

Few-shot prompting comes into play when the user specifies a style (e.g., "Shakespearean sonnet"). By giving the model a few examples of the requested style, it knows how to structure the poem correctly, including rhyme schemes and tone, making sure the output fits the desired style.

Why I Use These  Model Settings:
-------------------------------
Temperature (0.7):
-------------------

I set the temperature to 0.7 to strike a balance between creativity and coherence. This ensures the poem is imaginative and varied without becoming too random or nonsensical.
Max Tokens (200):
-------------------
I set max tokens to 200 to limit the poem length. It’s important to keep the poem concise while still giving it enough space to be expressive and complete.
TopP (0.9):
------------
I use top-p sampling (0.9) to make the poem more diverse. This means the model looks at the top 90% of possible next words when generating the poem, which encourages varied and unique word choices that help keep the poem interesting.
Frequency Penalty (0.2):
------------------------
Frequency penalty (0.2) helps avoid repeating the same words too much. This keeps the poem flowing naturally and prevents redundancy, allowing the model to come up with more varied and engaging language.
Presence Penalty (0.3):
------------------------
The presence penalty (0.3) discourages the model from repeating the same ideas in the poem. This helps keep the themes fresh and ensures that the poem explores different concepts and emotions throughout.

How Prompting Techniques Were Applied
---------------------------------------
The application leverages prompt engineering techniques to direct the LLM in producing poems based on user input. These techniques are applied in the following ways:

1. Frontend (React) Input:
Keywords: Users input keywords (comma-separated), providing the core themes for the poem (e.g., "love, nature").
Style: Optionally, users specify a style (e.g., "Shakespearean sonnet"), which influences the tone and structure of the generated poem.

2. Backend (Node.js/Express) Prompt Creation:
Zero-Shot Prompting: If no style is specified, the backend constructs a general prompt guiding the AI to create a free-form poem based on the keywords.
Example: "Write a poem about love and nature, using metaphors and vivid imagery."
Few-Shot Prompting: When a style is provided, the backend customizes the prompt to ensure the AI adheres to the specified style (e.g., sonnet form).
Example: "Write a Shakespearean sonnet about love and nature, using iambic pentameter."

3. Model Parameters:
Temperature: Set to 0.7 to balance creativity with coherence.
Max Tokens: Limited to 200 tokens for concise, readable poems.
Top-P, Frequency, and Presence Penalties: Fine-tuned to avoid repetition and encourage diversity in language.

4. Dynamic Prompting:
The backend dynamically combines the user's keywords with the selected style (if any) to create tailored prompts, which ensures each poem is unique and contextually relevant.
