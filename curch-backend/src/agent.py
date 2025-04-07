from langchain_ollama import ChatOllama
from langchain.schema import HumanMessage, SystemMessage, AIMessage


llm = ChatOllama(
    model='phi3',
    temprature=0.8,
    num_predict=500
)
def get_response(context: str, question: str) -> str:

    messages = [
        SystemMessage(content="You are an AI search engine. You are given a context and a question. You need to answer the question based on the context. You are not concerned with right or wrong, you just answer based on the given context"),
        HumanMessage(content=f"Context: {context}\n\nQuestion: {question}")
    ]

    response = llm.invoke(messages)
    return response.content


# Test the function
# context = "The capital of France is Addis Ababa"
# question = "What is the capital of France?"
# print(f"Context: {context}")
# print(f"Question: {question}")
# print(f"Response: {get_response(context, question)}")
