# reSearch
reSearch is a simple application that takes in multiple paragraphs(documents) of text, assigns a unique ID to each paragraph and stores the words to paragraph mappings on an inverted index.Given a word to search for, it lists out the top 10 paragraphs in which the word is present.


Note 1 : It is assumed that the user has **Postman** installed to test the api by sending HTTP requests and **MongoDB Cluster** to be used as Database.


Note 2 : It is also assumed that the user has **Node** (LTS version) , **npm**  &  **nodemon** installed globally.


# API Specifications at a Glance
- [x] Tokenizes documents to words by splitting at whitespace.
- [x] Converts all words to lowercase.
- [x]  Indexes these words against the documents they are from.
- [x]  Indexes these words against the documents they are from.
- [x]  Generates a unique ID for every document that is indexed.


## API Documentation :
---

```
# API Endpoint Locally : http://localhost:3000/
```

```
Headers
Content-Type : application/json
```

### /research/index
* `POST`: Index a given document (After having split the input into paragraphs a.k.a document)
* Query : 
```
{
    "documents" : string
}
```
* Response :
```
{
    "message": string
}
```

### /research/search
* `POST`: Given a word, search for it and retrieve the top 10 paragraphs (Documents) that contain it.
* Query :
```
{
    "query" : string
}
```
* Response :
```
{
    "paragraphs": {
        "tags" : array,
        "_id" : string,
        "text" : string,
    }
}
```

### /research/clear
* `GET`: Clear the index and all indexed documents.
* Response :
```
{
    "message": string
}
```
