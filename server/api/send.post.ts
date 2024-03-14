import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  try {
    const data = await resend.emails.send({
      from: "the-great.dev <noreply@the-great.dev>",
      to: ["alexander@the-great.dev"],
      subject: `New Feedback from ${payload.firstname} ${payload.lastname}`,
      text: `From: ${payload.firstname} ${payload.lastname} \n Email: ${payload.email} \n Message: ${payload.message} \n`,
    });

    return data;
  } catch (error) {
    return { error };
  }
});
