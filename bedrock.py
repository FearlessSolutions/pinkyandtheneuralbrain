#!/usr/bin/env python

import boto3
import json

# Initialize the Bedrock clients
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')
bedrock_agent = boto3.client('bedrock-agent', region_name='us-east-1')

def chat_with_bedrock(prompt):
    try:
        # Using Claude model similar to your claudetest.py
        model_id = "anthropic.claude-3-sonnet-20240229-v1:0"  # Using a standard Claude model ID
        
        # Prepare the request body
        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "system": "You are a helpful AI assistant.",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7,
            "top_p": 0.9
        }
        
        # Invoke the model
        response = bedrock_runtime.invoke_model(
            modelId=model_id,
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )
        
        # Parse and return the response
        response_body = json.loads(response.get('body').read())
        return response_body['content'][0]['text']
        
    except Exception as e:
        print(f"Error invoking Bedrock model: {e}")
        return f"An error occurred: {str(e)}"

def main():
    print("Welcome to the Anthropic Chat Interface!")
    prompt = input("Enter your message: ")
    response = chat_with_bedrock(prompt)
    print(f"\nAI response:\n{response}")

if __name__ == "__main__":
    main()
