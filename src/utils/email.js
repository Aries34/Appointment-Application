const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SG_MAIL_API_KEY)



exports.welcomeEmail = (recieverEmail, orgnanisationName) => {
    sgMail.send({
        to: recieverEmail,
        from: 'kwakuduah77@icloud.com',
        subject: `You have successfully booked an appointment with ${orgnanisationName}, we will notify you when appointment is 15 minutes due`
    })
}

exports.reminderEmail = (recieverEmail, appdate) => {
    sgMail.send({
        to: recieverEmail,
        from: 'kwakuduah77@icloud.com',
        title: "Appointment Reminder",
        ScheduledDate: appdate,
        subject: 'This is a reminder of your appoinment in less than an hour....see you soon'
    })
}


