from groq import Groq


GROQ_API_KEY = "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"

client = Groq(api_key=GROQ_API_KEY)
def execute(prompt):
    completion = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[
            {
                "role": "user",
                "content": prompt
            },
            
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )

    response =''

    for chunk in completion:
        response +=chunk.choices[0].delta.content or ""

    return response

if __name__ == __name__:
    print(execute("tell me a joke"))
