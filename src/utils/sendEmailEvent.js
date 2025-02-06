import { EventEmitter } from 'events';
import { sendEmail} from '../service/sendMail.js';
import { generate } from './token/generateToken.js';


export const eventEmitter = new EventEmitter();


eventEmitter.on('sendMail', async (data) => {
    const { email } = data
    const token = await generate({payload:{email},signature:process.env.CONFIRM_KEY})
    const link = `http://localhost:3000/users/confirm/${token}`
    await sendEmail(email, "hallo", `<a href=${link}>confirm me</a>`)
});