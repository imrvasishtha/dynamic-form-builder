# dynamic-form-builder

Home of dynamic-form-builder project

## Get-Started

### Pre-request

Node Version > 12.20.1  
NPM Version > 6.14.10  
Install nodemon
Install MongoDB on the local machine or use cluster (We can use MongoDB Atlas
but maybe you will not be able to access it directly, that's why I choose local)

## Backend

### Framework

    Hapi.js

### Database

    MongoDB

---

## Frontend

### Framework

    Next.js

---

### Now setup dynamic-form-builder components

1.) **Clone a project**

`git clone https://github.com/imrvasishtha/dynamic-form-builder.git`

2.) **To Install an npm package**

a.) `npm install` run at the root directory  
 b.) `npm install` run in package/api/ directory  
 c.) `npm install` run in package/webapp/ directory

3.) **Setup an env**

### Backend

I have added .env.development, it should work for you,
generally we don't include it in git but for testing purpose.

## Documentation

I have added swagger documentation for APIs, it will work on
http://[PORTADDRESS]/documentation (e.g. http://localhost:9000/documentation)

### Frontend

I have added .env, it should work for you,
generally we don't include it in git but for testing purpose.

4.) **To run a project**

    ### Backend
    To Run API `npm run start` Default Port: 9000


    ### Frontend
    To Run WEB-APP `npm run dev` Default Port: 3000
