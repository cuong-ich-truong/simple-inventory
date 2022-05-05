# simple-inventory
A Simple GraphQL server

## System Requirements

- Node.js v8.x or later
- npm v6.x or later

## Run Project

1. Install: `npm i`
2. Start server: `npm run start`

The GraphQL server will be available at <http://localhost:4000/>

## Queries and Mutations

### Hello

**Operation:**

```gql
query {
  hello(name: "Cuong Truong")
}
```

**Response:**

```json
{
  "data": {
    "hello": "This is a simple inventory. Nice to meet you, Cuong Truong."
  }
}
```

---
