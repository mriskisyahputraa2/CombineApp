import nodemailer from "nodemailer";

export const KirimEmail = async (dataEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      requireTLS: true,
      auth: {
        user: "riskideveloper2@gmail.com",
        pass: "wgeqanqtglaxhjnp",
      },
    });

    const info = await transporter.sendMail(dataEmail);
    console.log(`Email terkirim: ${info.messageId}`);
  } catch (err) {
    console.log(`Terjadi Kesalahan: ${err}`);
  }
};
