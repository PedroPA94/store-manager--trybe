# Welcome!

This project is a Back-end RESTful API for managing a store. It enables the creation, listing, updating and deletion (CRUD) of products and sales. I also wrote tests for the API.

In this project I was able to apply the concepts of software architecture based on layers. Three layers are used: Model, Service and Controller (MSC). The Model is responsible for communicating with the database, the middle layer, Service, validates the business rules and the Controller receives and responds HTTP requests.

This project was developed while studying Back-end web development [@betrybe](https://github.com/betrybe). The files I worked on are in the ```/src``` and `/tests` folders. I got approval on 100% of this project's requirements.

Below is the database diagram:
![EER Diagram](https://github.com/tryber/sd-022-a-store-manager/blob/master/public/erStoreManager.png)

## Main languages and tools used

- Node.js
- Express.js
- MySQL
- Joi for input data validation
- Tests with Mocha, Chai and Sinon
- Docker
- Layered Software Architecture

## Installation

<details>
<summary><strong>With Docker</strong></summary>

- Start the `store_manager` and `store_manager_db` containers with the `docker-compose up -d` command
- Access the `store_manager` container terminal with `docker exec -it store_manager bash`
- In the terminal, install the dependencies with `npm install`
- **All other node commands must be run inside the container**

</details>

<details>
<summary><strong>Without Docker</strong></summary>

- Install the dependencies with ``` npm install ``` (requires node on version 16)
- Configure a `.env` file based on the `.env.example` avaliable.

</details>

<details>
<summary><strong>Commands</strong></summary>

- Run the app with `npm start` or `npm run debug` (live reload)
- Use `npm run migration` to create the database and entities and `npm run seed` to populate it
- To run the project's requirements tests, first start the app with `npm run dev`, then `npm test` for all tests or `npm test <test-name>` for a specific requirement (ex. `npm test req01`)
- User `npm run test:mocha` to run the tests done by me

</details>

## Endpoints

<details>
<summary><strong>GET</strong> <code>/products</code></summary>

<br />

- Returns an array with all the registered products ordered by their id, or an empty array if there are no products. 

<br />

- Example:

```json
[
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
]
```

</details>

<details>
<summary><strong>GET</strong> <code>/products/:id</code></summary>

<br />

- Returns the product with the specified `id`. If there are no matches, returns status 404 with a message.

<br />

- Example of match:

```json
{
  "id": 1,
  "name": "Martelo de Thor"
}
```

- Example of no match:

```json
{ "message": "Product not found" }
```

</details>

<details>
<summary><strong>POST</strong> <code>/products</code></summary>

<br />

- Creates a new product in the `products` table and returns it with the inserted id. Two validations are done: (1) the product needs a name and (2) the name must be at least 5 characters long. If the new entry fails any of the validations, a message is returned instead. 

<br />

- Example request body:

```json
{
  "name": "ProdutoX"
}
```

- Example of response for valid entry:

```json
{
  "id": 4,
  "name": "ProdutoX"
}
```

- Response for request without a "name" field (status 400):

```json
{ "message": "\"name\" is required" }
```

- Response for request with an invalid "name" (status 422):

```json
{ "message": "\"name\" length must be at least 5 characters long" }
```

</details>

<details>
<summary><strong>PUT</strong> <code>/products/:id</code></summary>

<br />

- Updates a product and returns it with the respective id. The same validations of the product creation are done.

<br />

- Example request body:

```json
{
  "name": "Martelo do Batman"
}
```

- Example of return:

```json
{
  "id": 1,
  "name": "Martelo do Batman"
}
```

- Invalid id (status 404):

```json
  { "message": "Product not found" }
```

</details>

<details>
<summary><strong>DELETE</strong> <code>/products/:id</code></summary>

<br />

- Deletes a product and returns status 204. Validates if product exists.

</details>

<details>
<summary><strong>GET</strong> <code>/products/search?q=searchTerm</code></summary>

<br />

- Returns an array of products whose names matches the request search term. If there are no matches, returns an empty array. If the search term is empty, returns an array with all registered products.

<br />

- Example of match:

```
/products/search?q=Martelo
```

```json
[
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
]
```

</details>

<details>
<summary><strong>GET</strong> <code>/sales</code></summary>

<br />

- Returns an array with all the registered sales ordered by their saleId and productId, or an empty array if there are no sales. 

<br />

- Example:

```json
[
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]
```

</details>

<details>
<summary><strong>GET</strong> <code>/sales/:id</code></summary>

<br />

- Returns the sale with the specified `id`, ordered by the productId. If there are no matches, returns status 404 with a message.

<br />

- Example of match:

```json
[
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]
```

- Example of no match:

```json
{ "message": "Sale not found" }
```

</details>

<details>
<summary><strong>POST</strong> <code>/sales</code></summary>

<br />

- Inserts a new sale in the `sales` and `sales_products` tables. The sale can be of one or many products. Four validations are done: (1) the "productdId" field is required; (2) the "quantity" field is required; (3) the "quantity" is greater than zero; (4) the "productId" corresponds to a registered product in the database.

<br />

- Example request body:

```json
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```

- Example of response for valid entry:

```json
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
```

- Response for request without a "productId" field (status 400):

```json
{ "message": "\"productId\" is required" }
```

- Response for request without a "quantity" field (status 400):

```json
{ "message": "\"quantity\" is required" }
```

- Response for request with an invalid "productId" (status 404):

```json
{ "message": "Product not found" }
```

- Response for request with an invalid "quantity" (status 422):

```json
{ "message": "\"quantity\" must be greater than or equal to 1" }
```

</details>

<details>
<summary><strong>PUT</strong> <code>/sales/:id</code></summary>

<br />

- Updates a sale and returns it with the respective id. The same validations of the sale creation are done.

<br />

- Example request body:

```json
[
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]
```

- Example of return:

```json
  "saleId": 1,
    "itemsUpdated": [
      {
        "productId": 1,
        "quantity":10
      },
      {
        "productId": 2,
        "quantity":50
      }
    ]
```

- Invalid id (status 404):

```json
  { "message": "Sale not found" }
```

</details>

<details>
<summary><strong>DELETE</strong> <code>/sales/:id</code></summary>

<br />

- Deletes a sale and returns status 204. Validates if sale exists.

</details>
