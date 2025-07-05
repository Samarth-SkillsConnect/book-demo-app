// const nodemailer = require('nodemailer');
// const { createEvent } = require('ics');
// require('dotenv').config();

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS 
//   }
// });

// function getDateString(date) {
//   if (typeof date === 'string') {
//     return date;
//   }
//   if (date instanceof Date) {

//     return date.toISOString().slice(0, 10);
//   }
//   throw new Error('slot.date must be a string or Date object');
// }

// function generateICS({ slot, first_name, last_name, email, guests }) {
//   const dateStr = getDateString(slot.date);

//   const startDate = [
//     Number(dateStr.split('-')[0]), 
//     Number(dateStr.split('-')[1]), 
//     Number(dateStr.split('-')[2]),
//     Number(slot.start_time.split(':')[0]), 
//     Number(slot.start_time.split(':')[1]), 
//   ];

//   const endDate = [
//     Number(dateStr.split('-')[0]),
//     Number(dateStr.split('-')[1]),
//     Number(dateStr.split('-')[2]),
//     Number(slot.end_time.split(':')[0]),
//     Number(slot.end_time.split(':')[1]),
//   ];

//   const attendees = [
//     { name: `${first_name} ${last_name || ''}`, email }
//   ];
//   if (guests) {
//     guests.split(',').map(g => g.trim()).filter(Boolean).forEach(email => attendees.push({email}));
//   }
//   attendees.push({ email: ADMIN_EMAIL });

//   return new Promise((resolve, reject) => {
//     createEvent({
//       start: startDate,
//       end: endDate,
//       title: 'Demo Meeting',
//       description: 'Demo slot booked with our team!',
//       attendees,
//     }, (err, value) => {
//       if (err) reject(err);
//       else resolve(value);
//     });
//   });
// }

// exports.sendBookingEmails = async ({ slot, first_name, last_name, company_name, mobile_number, email, description, guests }) => {
//   try {
//     console.log('Preparing to generate ICS and send email...');
//     const icsContent = await generateICS({ slot, first_name, last_name, email, guests });
//     const guestList = guests ? guests.split(',').map(g => g.trim()).filter(Boolean) : [];
//     const allRecipients = [email, ADMIN_EMAIL, ...guestList];
//     const mailOptions = {
//       from: `"SAMS pvt ltd, Sales team" <${process.env.GMAIL_USER}>`,
//       to: allRecipients,
//       subject: `Demo Booking Confirmation (${getDateString(slot.date)} ${slot.start_time}-${slot.end_time})`,
//       text: `
// Hello,

// Your demo has been booked!

// Details:
// Date: ${getDateString(slot.date)}
// Time: ${slot.start_time} - ${slot.end_time}
// Name: ${first_name} ${last_name || ''}
// Company: ${company_name || '-'}
// Mobile: ${mobile_number}
// Description: ${description}

// Thanks,
// Demo Team
//       `,
//       icalEvent: {
//         filename: 'invite.ics',
//         method: 'REQUEST',
//         content: icsContent
//       }
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (err) {
//     console.error('Error sending booking email:', err);
//   }
// };





const nodemailer = require('nodemailer');
const { createEvent } = require('ics');
require('dotenv').config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS 
  }
});

function getDateString(date) {
  if (typeof date === 'string') return date;
  if (date instanceof Date) return date.toISOString().slice(0, 10);
  throw new Error('slot.date must be a string or Date object');
}

function extractValidEmails(guests) {
  return (guests && typeof guests === "string")
    ? guests.split(',').map(g => g.trim()).filter(g => g && g.includes('@'))
    : [];
}

function generateICS({ slot, first_name, last_name, email, guests }) {
  const dateStr = getDateString(slot.date);

  const startDate = [
    Number(dateStr.split('-')[0]), 
    Number(dateStr.split('-')[1]), 
    Number(dateStr.split('-')[2]),
    Number(slot.start_time.split(':')[0]), 
    Number(slot.start_time.split(':')[1])
  ];

  const endDate = [
    Number(dateStr.split('-')[0]),
    Number(dateStr.split('-')[1]),
    Number(dateStr.split('-')[2]),
    Number(slot.end_time.split(':')[0]),
    Number(slot.end_time.split(':')[1])
  ];

  const attendees = [];
  if (email && email.trim()) {
    attendees.push({ name: `${first_name} ${last_name || ''}`.trim(), email: email.trim() });
  }

  extractValidEmails(guests).forEach(guestEmail => 
    attendees.push({ name: "Guest", email: guestEmail })
  );

  if (ADMIN_EMAIL && ADMIN_EMAIL.trim()) {
    attendees.push({ name: "Admin", email: ADMIN_EMAIL.trim() });
  }

  return new Promise((resolve, reject) => {
    createEvent({
      start: startDate,
      end: endDate,
      title: 'Demo Meeting',
      description: 'Demo slot booked with our team!',
      attendees,
    }, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
}

exports.sendBookingEmails = async ({ slot, first_name, last_name, company_name, mobile_number, email, description, guests }) => {
  try {
    console.log('Preparing to generate ICS and send email...');
    const icsContent = await generateICS({ slot, first_name, last_name, email, guests });

    const guestList = extractValidEmails(guests);
    const allRecipients = Array.from(
      new Set([email, ADMIN_EMAIL, ...guestList].filter(Boolean))
    );

    const mailOptions = {
      from: `"SAMS pvt ltd, Sales team" <${process.env.GMAIL_USER}>`,
      to: allRecipients,
      subject: `Demo Booking Confirmation (${getDateString(slot.date)} ${slot.start_time}-${slot.end_time})`,
      text: `
Hello,

Your demo has been booked!

Details:
Date: ${getDateString(slot.date)}
Time: ${slot.start_time} - ${slot.end_time}
Name: ${first_name} ${last_name || ''}
Company: ${company_name || '-'}
Mobile: ${mobile_number}
Description: ${description}

Thanks,
Demo Team
      `,
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: icsContent
      }
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending booking email:', err);
    throw err; 
  }
};