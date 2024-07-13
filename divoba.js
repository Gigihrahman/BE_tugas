
import bcrypt  from 'bcrypt';



const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
// Store hash in your password DB.

console.log(
bcrypt.compareSync(myPlaintextPassword, hash))

console.log(
bcrypt.compareSync(someOtherPlaintextPassword, hash))

// const coba = async()=>{

//     const password ="okayajaaku"
//     const salt = 10;
//     const encryptedpassword =await bcrypt.hash(password, salt);
//     console.log(encryptedpassword)

// }

// coba()


