## For MongoDB Atlas DB connection string

For the whole application to work, need to create a .env file and put the below setting there:

```
ATLAS_URI=mongodb+srv://knc:<password>@cluster0-ibim8.gcp.mongodb.net/test?retryWrites=true&w=majority
```

To replace the DB password, go [here](https://cloud.mongodb.com/v2/5d2a0be3ff7a25a487b93525#security/database/users)!!!
