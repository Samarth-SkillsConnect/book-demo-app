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

// function getDateString(date) {
//   if (typeof date === 'string') return date;
//   if (date instanceof Date) return date.toISOString().slice(0, 10);
//   throw new Error('slot.date must be a string or Date object');
// }

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

function slotTimeString(slot) {
  let dateStr;
  if (typeof slot.date === "string") {
    dateStr = slot.date;
  } else if (slot.date instanceof Date) {
    dateStr = slot.date.toISOString().slice(0, 10);
  } else {
    throw new Error("slot.date must be a string or Date object");
  }

  const [y, m, d] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const datePretty = `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;

  function to12h(t) {
    let [h, m] = t.split(":");
    h = Number(h);
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return `${h}:${m}${ampm}`;
  }

  return `${datePretty} ${to12h(slot.start_time)} – ${to12h(slot.end_time)}`;
}

function generateICS({ slot, first_name, last_name, email, guests }) {
  let dateStr;
  if (typeof slot.date === "string") {
    dateStr = slot.date;
  } else if (slot.date instanceof Date) {
    dateStr = slot.date.toISOString().slice(0, 10);
  } else {
    throw new Error("slot.date must be a string or Date object");
  }

  const [y, m, d] = dateStr.split('-').map(Number);
  const [startHour, startMinute] = slot.start_time.split(':').map(Number);
  const [endHour, endMinute] = slot.end_time.split(':').map(Number);

  const organizerEmail = process.env.GMAIL_USER;

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
      description: 'Demo slot booked with our team!',
      organizer: { name: "Demo Team", email: organizerEmail },
      attendees,
      location: 'India',
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

// DEMO REQUEST INITIATED EMAIL
exports.sendInitiatedEmail = async ({
  slot, first_name, last_name, company_name, mobile_number, email, description, guests
}) => {
  try {
    const guestList = extractValidEmails(guests);
    const allRecipients = Array.from(
      new Set([email, ADMIN_EMAIL, ...guestList].filter(Boolean))
    );

    const companyLogo = "https://res.cloudinary.com/dygbnwcyj/image/upload/v1752483284/image_rx0mkl_zm8w4a.png";
    const companyName = "Skills Connect";

    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fb; padding: 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style=" margin: 0 auto; background: #fff; border-radius: 12px; box-shadow:0 2px 18px #0001;">
          <tr>
            <td align="center" style="padding: 36px 0 10px 0;">
              <img src="${companyLogo}" alt="${companyName} Logo" width="200" />
              <h1 style="margin: 18px 0 0 0; font-size: 2.1rem; color: #006691; letter-spacing:1px;">${companyName}</h1>
              <div style="font-size: 1.24rem; color:#22b8ba; margin-top: 8px; font-weight: 600;">Demo Request Initiated</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 34px 0 34px;">
              <p style="font-size:1.1rem; color:#222; margin: 0;">Hello <b>${first_name}${last_name ? " " + last_name : ""}</b>,</p>
              <p style="color:#474747; margin: 10px 0 22px 0;">Your demo request has been initiated! Our team will review and confirm your slot soon.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fcff; border-radius: 8px; padding: 12px 0; margin: 0 0 18px 0;">
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Requested Date & Time:</td>
                  <td style="padding: 6px 0; color:#232323;">${slotTimeString(slot)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Name:</td>
                  <td style="padding: 6px 0; color:#232323;">${first_name} ${last_name || ''}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Company:</td>
                  <td style="padding: 6px 0; color:#232323;">${company_name || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Mobile:</td>
                  <td style="padding: 6px 0; color:#232323;">${mobile_number}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Description:</td>
                  <td style="padding: 6px 0; color:#232323;">${description}</td>
                </tr>
                ${guestList.length > 0 ? `
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691; vertical-align:top;">Guests:</td>
                  <td style="padding: 6px 0; color:#232323;">
                    <ul style="margin:0; padding-left:16px; color:#232323;">
                      ${guestList.map(g => `<li>${g}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
                ` : ""}
              </table>
              <div style="font-size:0.95rem; color:#888; margin: 12px 0 0 0;">We will send a confirmation once your demo is scheduled.</div>
              <div style="margin-top:32px; color:#aaa; font-size:13px; text-align:center;">
                <hr style="border-top:1px dashed #eee; margin-bottom:12px;" />
                &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"${companyName} Sales Team" <${process.env.GMAIL_USER}>`,
      to: allRecipients,
      subject: `Demo Request Initiated (${slotTimeString(slot)})`,
      html
    });
  } catch (err) {
    console.error('Error sending initiated email:', err);
    throw err;
  }
};

// DEMO BOOKED (ACCEPTED BY ADMIN) EMAIL
exports.sendAcceptedEmail = async ({
  slot, first_name, last_name, company_name, mobile_number, email, description, guests, meet_link
}) => {
  try {
    const icsContent = await generateICS({ slot, first_name, last_name, email, guests });

    const guestList = extractValidEmails(guests);
    const allRecipients = Array.from(
      new Set([email, ADMIN_EMAIL, ...guestList].filter(Boolean))
    );
    console.log('Recipients:', allRecipients);

    const companyLogo = "https://res.cloudinary.com/dygbnwcyj/image/upload/v1752483284/image_rx0mkl_zm8w4a.png";
    const companyName = "Skills Connect";

    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fb; padding: 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style=" margin: 0 auto; background: #fff; border-radius: 12px; box-shadow:0 2px 18px #0001;">
          <tr>
            <td align="center" style="padding: 36px 0 10px 0;">
              <img src="${companyLogo}" alt="${companyName} Logo"  width="200" />
              <h1 style="margin: 18px 0 0 0; font-size: 2.1rem; color: #006691; letter-spacing:1px;">${companyName}</h1>
              <div style="font-size: 1.24rem; color:#22b8ba; margin-top: 8px; font-weight: 600;">Demo Slot Booked!</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 34px 0 34px;">
              <p style="font-size:1.1rem; color:#222; margin: 0;">Hello <b>${first_name}${last_name ? " " + last_name : ""}</b>,</p>
              <p style="color:#474747; margin: 10px 0 22px 0;">Your demo slot has been <b>confirmed</b>! Kindly find the details below:</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fcff; border-radius: 8px; padding: 12px 0; margin: 0 0 18px 0;">
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Confirmed Date & Time:</td>
                  <td style="padding: 6px 0; color:#232323;">${slotTimeString(slot)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Name:</td>
                  <td style="padding: 6px 0; color:#232323;">${first_name} ${last_name || ''}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Company:</td>
                  <td style="padding: 6px 0; color:#232323;">${company_name || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Mobile:</td>
                  <td style="padding: 6px 0; color:#232323;">${mobile_number}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Description:</td>
                  <td style="padding: 6px 0; color:#232323;">${description}</td>
                </tr>
                ${guestList.length > 0 ? `
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691; vertical-align:top;">Guests:</td>
                  <td style="padding: 6px 0; color:#232323;">
                    <ul style="margin:0; padding-left:16px; color:#232323;">
                      ${guestList.map(g => `<li>${g}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Meeting Link:</td>
                  <td style="padding: 6px 0; color:#232323;">
                    <a href="${meet_link}" style="color:#22b8ba; text-decoration:underline;">${meet_link || ''}</a>
                  </td>
                </tr>
              </table>
              <div style="margin: 18px 0 18px 0;">
              </div>
              <div style="font-size:0.95rem; color:#888; margin: 12px 0 0 0;">You will find a calendar invitation attached to this email.</div>
              <div style="margin-top:32px; color:#aaa; font-size:13px; text-align:center;">
                <hr style="border-top:1px dashed #eee; margin-bottom:12px;" />
                &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"${companyName} Sales Team" <${process.env.GMAIL_USER}>`,
      to: allRecipients,
      subject: `Demo Slot Booked (${slotTimeString(slot)})`,
      html,
      alternatives: [{
        contentType: 'text/calendar; method=REQUEST; charset="UTF-8"',
        content: icsContent,
        filename: 'invite.ics'
      }]
    });
    console.log('Accepted email sent successfully.');
  } catch (err) {
    console.error('Error sending accepted email:', err);
    throw err;
  }
};

// DEMO RESCHEDULED EMAIL
exports.sendRescheduleEmails = async ({
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

    const companyLogo = "https://res.cloudinary.com/dygbnwcyj/image/upload/v1752483284/image_rx0mkl_zm8w4a.png";
    const companyName = "Skills Connect";

    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fb; padding: 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow:0 2px 18px #0001;">
          <tr>
            <td align="center" style="padding: 36px 0 10px 0;">
              <img src="${companyLogo}" alt="${companyName} Logo" width="200" />
              <h1 style="margin: 18px 0 0 0; font-size: 2.1rem; color: #006691; letter-spacing:1px;">${companyName}</h1>
              <div style="font-size: 1.24rem; color:#22b8ba; margin-top: 8px; font-weight: 600;">Demo Rescheduled</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 34px 0 34px;">
              <p style="font-size:1.1rem; color:#222; margin: 0;">Hello <b>${first_name}${last_name ? " " + last_name : ""}</b>,</p>
              <p style="color:#474747; margin: 10px 0 22px 0;">Your demo with <b>${companyName}</b> has been <span style="color:#e69d00; font-weight:600;">rescheduled</span>. Kindly find the new details below:</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fcff; border-radius: 8px; padding: 12px 0; margin: 0 0 18px 0;">
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">New Date & Time:</td>
                  <td style="padding: 6px 0; color:#232323;">${slotTimeString(slot)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Name:</td>
                  <td style="padding: 6px 0; color:#232323;">${first_name} ${last_name || ''}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Company:</td>
                  <td style="padding: 6px 0; color:#232323;">${company_name || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Mobile:</td>
                  <td style="padding: 6px 0; color:#232323;">${mobile_number}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691;">Description:</td>
                  <td style="padding: 6px 0; color:#232323;">${description}</td>
                </tr>
                ${guestList.length > 0 ? `
                <tr>
                  <td style="padding: 6px 0; font-weight:600; color:#006691; vertical-align:top;">Guests:</td>
                  <td style="padding: 6px 0; color:#232323;">
                    <ul style="margin:0; padding-left:16px; color:#232323;">
                      ${guestList.map(g => `<li>${g}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
                ` : ""}
              </table>
              <div style="margin: 18px 0 18px 0;">
                
              </div>
              <div style="font-size:0.95rem; color:#888; margin: 12px 0 0 0;">You will find a calendar invitation attached to this email.</div>
              <div style="margin-top:32px; color:#aaa; font-size:13px; text-align:center;">
                <hr style="border-top:1px dashed #eee; margin-bottom:12px;" />
                &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"${companyName} Sales Team" <${process.env.GMAIL_USER}>`,
      to: allRecipients,
      subject: `Demo Rescheduled (${slotTimeString(slot)})`,
      html,
      alternatives: [{
        contentType: 'text/calendar; method=REQUEST; charset="UTF-8"',
        content: icsContent,
        filename: 'invite.ics'
      }]
    });
  } catch (err) {
    console.error('Error sending reschedule email:', err);
    throw err;
  }
};