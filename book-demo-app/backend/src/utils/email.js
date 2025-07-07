
// const moment = require('moment-timezone');
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
//   if (typeof date === 'string') return date;
//   if (date instanceof Date) return date.toISOString().slice(0, 10);
//   throw new Error('slot.date must be a string or Date object');
// }

// // Enhanced: supports guests as array or comma-separated string
// function extractValidEmails(guests) {
//   if (!guests) return [];
//   if (Array.isArray(guests)) {
//     return guests.map(g => g.trim()).filter(g => g && g.includes('@'));
//   }
//   if (typeof guests === "string") {
//     return guests.split(',').map(g => g.trim()).filter(g => g && g.includes('@'));
//   }
//   return [];
// }

// function generateICS({ slot, first_name, last_name, email, guests }) {
//   const dateStr = getDateString(slot.date);

//     const startLocal = moment.tz(`${dateStr} ${slot.start_time}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
//   const endLocal = moment.tz(`${dateStr} ${slot.end_time}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");

//   const startDate = [
//     startLocal.utc().year(),
//     startLocal.utc().month() + 1, // months are zero-indexed
//     startLocal.utc().date(),
//     startLocal.utc().hour(),
//     startLocal.utc().minute()
//   ];

//   const endDate = [
//     endLocal.utc().year(),
//     endLocal.utc().month() + 1,
//     endLocal.utc().date(),
//     endLocal.utc().hour(),
//     endLocal.utc().minute()
//   ];

// // Organizer email
//   const organizerEmail = process.env.GMAIL_USER;

//   // Build attendees array, no duplicates, no organizer as attendee
//   const attendees = [];
//   if (email && email.trim() && email.trim() !== organizerEmail) {
//     attendees.push({ name: `${first_name} ${last_name || ''}`.trim(), email: email.trim() });
//   }

//   extractValidEmails(guests).forEach((guestEmail, idx) => {
//     if (guestEmail !== organizerEmail && !attendees.find(a => a.email === guestEmail)) {
//       attendees.push({ name: `Guest ${idx + 1}`, email: guestEmail });
//     }
//   });

//   if (ADMIN_EMAIL && ADMIN_EMAIL.trim() && ADMIN_EMAIL.trim() !== organizerEmail) {
//     attendees.push({ name: "Admin", email: ADMIN_EMAIL.trim() });
//   }

//   return new Promise((resolve, reject) => {
//     createEvent({
//       method: 'REQUEST',
//       uid: `${Date.now()}-${email}`,
//       start: startDate,
//       end: endDate,
//       title: 'Demo Meeting',
//       description: 'Demo slot booked with our team!',
//       organizer: { name: "Demo Team", email: organizerEmail },
//       attendees,
//     }, (err, value) => {
//       if (err) return reject(err);
//       // Remove X-PUBLISHED-TTL line for mobile compatibility
//       const fixedValue = value
//         .split('\n')
//         .filter(line => !line.startsWith('X-PUBLISHED-TTL'))
//         .join('\n');
//       resolve(fixedValue);
//     });
//   });
// }

// exports.sendBookingEmails = async ({
//   slot,
//   first_name,
//   last_name,
//   company_name,
//   mobile_number,
//   email,
//   description,
//   guests
// }) => {
//   try {
//     console.log('Preparing to generate ICS and send email...');
//     const icsContent = await generateICS({ slot, first_name, last_name, email, guests });
//     console.log(icsContent);

//     const guestList = extractValidEmails(guests);
//     const allRecipients = Array.from(
//       new Set([email, ADMIN_EMAIL, ...guestList].filter(Boolean))
//     );

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
//       alternatives: [{
//         contentType: 'text/calendar; method=REQUEST; charset="UTF-8"',
//         content: icsContent,
//         filename: 'invite.ics'
//       }]
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (err) {
//     console.error('Error sending booking email:', err);
//     throw err;
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
  if (!guests) return [];
  if (Array.isArray(guests)) {
    return guests.map(g => g.trim()).filter(g => g && g.includes('@'));
  }
  if (typeof guests === "string") {
    return guests.split(',').map(g => g.trim()).filter(g => g && g.includes('@'));
  }
  return [];
}

// Format slot time for IST display
function slotISTString(slot) {
  const [y, m, d] = slot.date.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const datePretty = `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;

  function to12h(t) {
    let [h, m] = t.split(":");
    h = Number(h);
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return `${h}:${m}${ampm}`;
  }

  return `${datePretty} ${to12h(slot.start_time)} – ${to12h(slot.end_time)} (IST)`;
}

// Generate ICS for IST (no UTC, no moment)
function generateICS({ slot, first_name, last_name, email, guests }) {
  const [y, m, d] = slot.date.split('-').map(Number);
  const [startHour, startMinute] = slot.start_time.split(':').map(Number);
  const [endHour, endMinute] = slot.end_time.split(':').map(Number);

  // Organizer email
  const organizerEmail = process.env.GMAIL_USER;

  // Build attendees array, no duplicates, no organizer as attendee
  const attendees = [];
  if (email && email.trim() && email.trim() !== organizerEmail) {
    attendees.push({ name: `${first_name} ${last_name || ''}`.trim(), email: email.trim() });
  }

  extractValidEmails(guests).forEach((guestEmail, idx) => {
    if (guestEmail !== organizerEmail && !attendees.find(a => a.email === guestEmail)) {
      attendees.push({ name: `Guest ${idx + 1}`, email: guestEmail });
    }
  });

  if (ADMIN_EMAIL && ADMIN_EMAIL.trim() && ADMIN_EMAIL.trim() !== organizerEmail) {
    attendees.push({ name: "Admin", email: ADMIN_EMAIL.trim() });
  }

  return new Promise((resolve, reject) => {
    createEvent({
      method: 'REQUEST',
      uid: `${Date.now()}-${email}`,
      start: [y, m, d, startHour, startMinute],
      end: [y, m, d, endHour, endMinute],
      title: 'Demo Meeting',
      description: 'Demo slot booked with our team! (IST time zone)',
      organizer: { name: "Demo Team", email: organizerEmail },
      attendees,
      location: 'India',
      // timezone: 'Asia/Kolkata'
    }, (err, value) => {
      if (err) return reject(err);
      const fixedValue = value
        .split('\n')
        .filter(line => !line.startsWith('X-PUBLISHED-TTL'))
        .join('\n');
      resolve(fixedValue);
    });
  });
}

exports.sendBookingEmails = async ({
  slot,
  first_name,
  last_name,
  company_name,
  mobile_number,
  email,
  description,
  guests
}) => {
  try {
    const icsContent = await generateICS({ slot, first_name, last_name, email, guests });

    const guestList = extractValidEmails(guests);
    const allRecipients = Array.from(
      new Set([email, ADMIN_EMAIL, ...guestList].filter(Boolean))
    );

    const mailOptions = {
      from: `"SAMS pvt ltd, Sales team" <${process.env.GMAIL_USER}>`,
      to: allRecipients,
      subject: `Demo Booking Confirmation (${slotISTString(slot)})`,
      text: `
Hello,

Your demo has been booked!

Details:
${slotISTString(slot)}
Name: ${first_name} ${last_name || ''}
Company: ${company_name || '-'}
Mobile: ${mobile_number}
Description: ${description}

Thanks,
Demo Team
      `,
      alternatives: [{
        contentType: 'text/calendar; method=REQUEST; charset="UTF-8"',
        content: icsContent,
        filename: 'invite.ics'
      }]
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending booking email:', err);
    throw err;
  }
};