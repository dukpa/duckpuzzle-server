# Duckpuzzle Server
This is the server component of the web portal. It is built with a routes-services-models architecture on nodejs.

# Configuration
`touch local.json`  
Create a local JSON file with the following:  
```
{
  mongokey: 'mongo connection string here'
}
```

# Data Migration
In order to migrate data for dev:  
`npm run migrate-dev`  
This should set up all required data for the dev system.

# Run Tests
`npm test`  
Make sure to perform data migration before performing the test

# Run
`npm start`  
So far only the dev environment is supported.