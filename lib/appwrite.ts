import { Account, Client, Databases } from "react-native-appwrite";

const DATABASE_ID = "6852f11b0018f2d0400f";
const COLLECTION_ID = "6852f164003d31f267af";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("684ff8d10001cf07bfc5");

const databases = new Databases(client);
const account = new Account(client);

export { account, COLLECTION_ID, DATABASE_ID, databases };

export default client;
