#!/usr/bin/env python

import boto3
import json
from pprint import pprint

bedrock_agent = boto3.client('bedrock-agent', region_name='us-east-1')
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

pprint(vars(bedrock_runtime))
