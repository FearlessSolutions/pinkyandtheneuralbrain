import boto3
import json
import logging

from botocore.exceptions import ClientError

# Create a session using your AWS credentials
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

def generate_message(model_id, system_prompt, messages, max_tokens):
    body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": max_tokens,
        "system":system_prompt,
        "messages": messages,
        "temperature": 0.7,
        "top_p": 0.9,
        "n": 1
    }

    response = boto3.client('bedrock-runtime').invoke_model(
        modelId=model_id,
        contentType="application/json",
        accept="application/json",
        body=json.dumps(body)
    )

    return json.loads(response.get('body').read())

def main():
    """
    Entrypoint for Anthropic Claude message example.
    """

    try:
        model_id = "arn:aws:bedrock:us-east-1:734467364346:inference-profile/us.anthropic.claude-3-7-sonnet-20250219-v1:0"
        system_prompt = "Welcome to the Anthropic Chat Interface!"
        messages = [
            {
                "role": "user",
                "content": "Design a technical solution to this \"pws document\", infuse examples out of Fearless work history to support and bolster Fearless could deliver said technical solution."
            }
        ]
        max_tokens = 1000

        response = generate_message(model_id, system_prompt, messages, max_tokens)
        print(f"Generated message: {response['content'][0]['text']}")

    except ClientError as e:
        logger.error(f"Error invoking Anthropic Claude model: {e}")
        print(f"Error invoking Anthropic Claude model: {e}")


if __name__ == "__main__":
    main()
