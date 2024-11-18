Everything related to the backend and the sql queries is int he utils folder

1.All the queries to Fetch,update, read and delete data are in Crud.ts
2.Ai.ts has the code for langchain, this enables us to architect a chatgpt query to return a certain json. We then parse the json and store them.
3.the db.ts just extends the original prisma variable and configures it to stick the connection that it has established rather than creating new connections with neon over and over.
4. User.ts and validation.ts has code to validate the user and some queries related to the user.