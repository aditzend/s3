Accounts.emailTemplates.siteName = "Serabey";
Accounts.emailTemplates.from = "Serabey Atencion al usuario <usuarios@serabey.com>";
Accounts.emailTemplates.enrollAccount.subject = function(user) {
    return "Welcome to Awesome Town, " + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.text = function(user, url) {
    return "You have been selected to participate in building a better future!" + " To activate your account, simply click the link below:\n\n" + url;
};
Accounts.emailTemplates.resetPassword.from = function() {
    // Overrides value set in Accounts.emailTemplates.from when resetting passwords
    return "Cambio de clave en Serabey <usuarios@serabey.com>";
};


Accounts.emailTemplates.resetPassword = {
    subject(user) {
        return "Cambia tu clave en Serabey";
    },
    text(user, url) {
        return `Hola!
Clickea el link abajo para resetear tu clave en Serabey
${url}
Si no pediste cambiar tu clave, por favor ignora este mail.
Gracias,
El equipo de Serabey
`
    },
    html(user, url) {
        // This is where HTML email content would go.
        // See the section about html emails below.

    }
};
// 
// Accounts.onResetPasswordLink((token, done) => {
//     // Display the password reset UI, get the new password...
//     console.log("reset pass");
// 
//     Accounts.resetPassword(token, newPassword, (err) => {
//         if (err) {
//             // Display error
//             console.log("error", err);
// 
//         } else {
//             // Resume normal operation
//             done();
//             console.log("reset pass done");
// 
//         }
//     });
// });
