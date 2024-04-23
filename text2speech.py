import os

from deepgram import (
    DeepgramClient,
    SpeakOptions,
)

api_key_g = "33862871703cb2fdf761795ba7fa93da31111c29"
filename = "output.wav"


def text2speech(text):
    try:
        SPEAK_OPTIONS = {"text":text}
        deepgram = DeepgramClient(api_key=api_key_g)

        options = SpeakOptions(
            model="aura-athena-en",
            encoding="linear16",
            container="wav"
        )
        response = deepgram.speak.v("1").save(filename, SPEAK_OPTIONS, options)
        return filename

    except Exception as e:
        print(f"Exception: {e}")


if __name__ == "__main__":
    text2speech("this is test")