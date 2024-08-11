import dotenv from "dotenv";
dotenv.config();
const myEnvVar = process.env.MIDTRANS_PRODUCTION;
const production = myEnvVar === "false" ? false : myEnvVar === "true";
console.log(production);
