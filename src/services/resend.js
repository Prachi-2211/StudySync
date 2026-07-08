import axios from "axios";

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
console.log(RESEND_API_KEY);

export async function sendEmail(name, email, message) {

  const response = await axios.post(
    "https://api.resend.com/emails",
    {
      from: "StudySync <onboarding@resend.dev>",
      to: "prachidasila94@gmail.com",
      subject: "New StudySync Contact Message",
      html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    },
    {
      headers:{
        Authorization:`Bearer ${RESEND_API_KEY}`,
        "Content-Type":"application/json",
      },
    }
  );


  return response.data;

}