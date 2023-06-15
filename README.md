# zoey-checklists

This is a small vue/firebase application. I made it during the 2020 lockdown to keep track of my child's schoolwork and chores.

### Prerequisites

- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [firebase](https://firebase.google.com)
  - Account with a new database
  - Admin user created with email/password authentication

### Initilization

1 Make a local clone and run npm install in the root directory

```
$ npm install
```

2 Create a `/src/secrets.js` file that exports your firebase config object by default.

```
export default {
  apiKey: String,
  authDomain: String,
  databaseURL: String,
  projectId: String,
  storageBucket: String,
  messagingSenderId: String,
  appId: String
}
```

Firebase authentication is set up to use web-based username and password.

See the [Firebase Docs](https://firebase.google.com/docs/web/setup?authuser=0) for more info.

3 Run npm serve to start the application:

```
$ npm run serve
```

Local server should be here: [http://localhost:8080/](http://localhost:8080/)
