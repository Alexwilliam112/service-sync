# API DOCUMENTATION

#### SERVER ADDRESS:

&nbsp;

&nbsp;

## Global Error

> __Response (401 - UNAUTHORIZED)__

```json
{
  "message": "Unauthorized Access. Please LogIn"
}
```

> __Response (403 - FORBIDDEN)__

```json
{
  "message": "You are not authorized!"
}
```

> __Response (500 - INTERNAL SERVER ERROR)__

```json
{
  "message": "Internal server error"
}
```

## POST /login

### body:

```json
{
  "username": "string",
  "password": "string"
}
```

> __Response (200 - OK)__

```json
{
  "access_token": "eyJhbGciOiJIUbta_uOSDU",
  "username": "IamUser12",
  "role": "user"
}
```

> __Response (400 - BAD REQUEST)__

```json
{
  "message": "Username and Password is required"
}
```

> __Response (401 - UNAUTHORIZED)__

```json
{
  "message": "Invalid username or password"
}
```

## POST /cases

### header:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### body:

```json
{
  "topic": "Text Topic Name"
}
```

> __Response (201 - CREATED)__

```json
{
  "message": "Success Create New Room"
}
```

> __Response (400 - BAD REQUEST)__

```json
{
    "message": "Topic is required"
}
```

> __Response (401 - UNAUTHORIZED)__

```json
{
  "message": "Unauthorized Access. Please LogIn"
}
```

## POST /autoreply

### header:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### body:

```json
{
  "roomId": "unique roomId",
  "changeTo": false,
}
```

> __Response (200 - OK)__

```json
{
  "message": "Updated autoreply value"
}
```

> __Response (400 - BAD REQUEST)__

```json
{
    "message": "Topic is required"
}
```

> __Response (401 - UNAUTHORIZED)__

```json
{
  "message": "Unauthorized Access. Please LogIn"
}
```

## GET /cases

### header:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

> __Response (200 - OK)__

```json
{
  "message": "Success Read All Rooms",
  "data": [
    {
      "roomId": "uHhn1UOUh09seBpDBDuB",
      "autoreply": true,
      "flag": "green",
      "topic": "paling baru",
      "lastMsg": null,
      "username": "alexTest",
      "status": "open",
      "time": {
        "_seconds": 1718854288,
        "_nanoseconds": 590000000
      }
    },
    {
      "roomId": "lOcdbr3c2hS9CI8A3lhv",
      "autoreply": true,
      "flag": "green",
      "topic": "WOY NI ORDER GA SMPE",
      "lastMsg": null,
      "username": "alexTest",
      "status": "open",
      "time": {
        "_seconds": 1718854220,
        "_nanoseconds": 164000000
      }
    },
  ]
```

> __Response (404 - NOT FOUND)__

```json
{
  "message": "Data Not Found"
}
```

## GET /chat-history/:roomId

### header:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### params:

```json
{
  "roomId": "Room ID from User Login"
}
```

> __Response (200 - OK)__

```json
[
  {
    "message": "hello there",
    "roomId": 1,
    "username": "Alex",
    "timestamp": {
      "_seconds": 1718792485,
      "_nanoseconds": 485000000
    }
},
{
    "message": "boboubouvouo",
    "roomId": 1,
    "username": "Alex",
    "timestamp": {
      "_seconds": 1718792476,
      "_nanoseconds": 444000000
    }
},
{
    "message": "AISNDOIANSDOINADAOISD",
    "roomId": 1,
    "username": "Alex",
    "timestamp": {
      "_seconds": 1718792481,
      "_nanoseconds": 761000000
    }
  }
]
```

> __Response (404 - NOT FOUND)__

```json
{
  "message": "Data Not Found"
}
```
