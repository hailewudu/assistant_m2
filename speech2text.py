import os


from deepgram import (
    DeepgramClient,
    PrerecordedOptions,
    FileSource,
)
api_key_g = "33862871703cb2fdf761795ba7fa93da31111c29"




def speech2text(audio_file):
    try:
        deepgram = DeepgramClient(api_key_g)

        with open(audio_file, "rb") as file:
            buffer_data = file.read()

        payload: FileSource = {
            "buffer": buffer_data,
        }

        options = PrerecordedOptions(
            model="nova-2",
            smart_format=True,
        )

        response = deepgram.listen.prerecorded.v("1").transcribe_file(payload, options)

        transcript = response['results']['channels'][0]['alternatives'][0]['transcript']
        return(transcript)
    except Exception as e:
        print(f"Exception: {e}")


if __name__ == "__main__":
    print(speech2text('test.mp3'))
