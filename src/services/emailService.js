import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function send({ email, content }) {
  const msg = {
    to: email,
    from: 'leonardo.otero390@gmail.com',
    subject: 'Sua compra na bookstore foi efetuada',
    text: content,
    html: `<strong>${content}</strong>`,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error();
  }
}
