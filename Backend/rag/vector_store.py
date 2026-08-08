class RAGEngine:
    def __init__(self):
        self.documents = []

    def add_document(self, title: str, content: str, source: str):
        doc = {"title": title, "content": content, "source": source}
        self.documents.append(doc)
        return doc

    def query(self, query: str, topK: int = 2):
        return [
            {"match": doc["content"], "score": 0.95} 
            for doc in self.documents[:topK]
        ] if self.documents else [{"match": "No documents found. Please upload first.", "score": 0.0}]

rag_engine = RAGEngine()