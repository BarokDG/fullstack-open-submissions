```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser renders new note to the notes list

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    server-->>browser: 201: {message: note created}
```
