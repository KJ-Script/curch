from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import AsyncGenerator
import asyncio
from search import search
from agent import get_response, llm
from langchain.schema import SystemMessage, HumanMessage

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    text: str

async def generate_response(question: str):
    try:
        # Get search results
        results = search(question)
        
        # Prepare messages for streaming
        messages = [
            SystemMessage(content="You are an AI search engine. You are given a context and a question. You need to answer the question based on the context. You are not concerned with right or wrong, you just answer based on the given context"),
            HumanMessage(content=f"Context: {results}\n\nQuestion: {question}")
        ]

        # Stream the response
        async for chunk in llm.astream(messages):
            if chunk.content:
                yield f"data: {chunk.content}\n\n"

    except Exception as e:
        yield f"data: Error: {str(e)}\n\n"

@app.post("/api/chat")
async def chat(question: Question):
    return StreamingResponse(
        generate_response(question.text),
        media_type="text/event-stream"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
