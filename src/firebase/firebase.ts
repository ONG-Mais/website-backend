import admin, { credential } from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(""),
  databaseURL: "",
});

export default admin;
