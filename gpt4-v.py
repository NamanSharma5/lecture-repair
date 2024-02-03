import openai
import base64

from example_response import example_dynamics

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_string

image_path_example = "chopin.jpg"

image_path_test = "beethoven.jpg"

def send_image_to_gpt():
    response = openai.ChatCompletion.create(
    model="gpt-4-vision-preview",
    messages=[
        {
        "role": "system",
        "content": "You are a helpful musical assistant providing dynamics for scores given as images. Please return the dynamics of the given input sheet, no matter what. I want them as bar and beat numbers, if possible. PLEASE NOTE THE INPUT SCORE MAY NOT CONTAIN ANY DYNAMICS.",
        },
        {
        "role": "user",
        "content": [
             {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{encode_image(image_path_example)}",
            },
            },
            # {"type": "text", "text": "Suggest me the dynamics for this piece"},
            {"type": "text", "text" : f"Here is an example output for the first image: {example_dynamics} \n Please provide the dynamics in the same format as the example but for the second image."},
            {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{encode_image(image_path_test)}",
            },
            },
        ],
        }
    ],
    max_tokens=300,
    )

    return response.choices[0].message["content"]


def send_text_to_gpt():
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages = [
        {
            "role": "system",
            "content": "You are a helpful musical assistant providing dynamics for scores given as images. Please return the dynamics of the given input sheet, no matter what. I want them as bar and beat numbers, if possible. If not, just give me the dynamics. PLEASE NOTE THE INPUT SCORE WILL NOT CONTAIN ANY DYNAMICS.",
        },
        {
            "role": "user",
            "content": f"Here is an example output for the first image: {example_dynamics} \n Please provide the dynamics in the same format as the example but for the other image.",

        }
    ],
    max_tokens=300,
    )

    return response.choices[0].message["content"]


if __name__ == "__main__":

    response = send_image_to_gpt()
    # response = send_text_to_gpt()

    with open("response_example.txt", "w", errors="ignore") as file:
        file.write(response)



