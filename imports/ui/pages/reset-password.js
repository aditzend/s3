import './reset-password.html';

let token, done;

Accounts.onResetPasswordLink(function(t, d) {
    token = t;
    done = d;
    AccountsTemplates.paramToken = 'g2_G8tXHsda47n3qyRp43v2_e6NRid6Z40mos8iIvn2';
    alert(AccountsTemplates.paramToken);
    setTimeout(() => FlowRouter.go("resetPwd"), 0);
});

Template.resetPassword.onRendered(function() {
    console.log('rendered resetPassword');
    console.log('token', AccountsTemplates.paramToken);
    console.log('test');
});

Template.resetPassword.events({
    'click .js-reset': function(e, instance) {
        e.preventDefault();
        console.log(token);
        let newPassword = $('#InputPassword1')
            .val();
        Accounts.resetPassword(token, newPassword, function(error) {
            if (error) {
                console.log(error);
                FlowRouter.go('landing');

            } else {
                console.log("pass changed");
                FlowRouter.go('home');
            }

        });
    }
});


//--------------------------------
// Reset Password / Enroll Account
//--------------------------------
// if (state === "resetPwd" || state === "enrollAccount") {
//     var paramToken = AccountsTemplates.getparamToken();
//     return Accounts.resetPassword(paramToken, password, function(error) {
//         AccountsTemplates.submitCallback(error, state, function(){
//             var pwd_field_id;
//             if (state === "resetPwd")
//                 AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdReset);
//             else // Enroll Account
//                 AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdSet);
//             t.$("#at-field-password").val("");
//             if (AccountsTemplates.options.confirmPassword)
//                 t.$("#at-field-password_again").val("");
//         });
//     });
// }
