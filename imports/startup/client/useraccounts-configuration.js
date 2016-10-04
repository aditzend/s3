import {
    AccountsTemplates
}
from 'meteor/useraccounts:core';

import numeral from 'numeral';

T9n.setLanguage('es');
// load a language
numeral.language('es', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'mm',
        trillion: 'b'
    },
    ordinal : function (number) {
        return number === 1 ? 'ero' : 'o';
    },
    currency: {
        symbol: '$'
    }
});

// switch between languages
numeral.language('es');

let myPostSubmitFunc = function(userId, info) {
    if (userId) {
        // console.log('NEW USER : ', userId);
        // const ssok = generateSsok(userId);
        // let person = Persons.insert({
        //     owner: ssok
        // });
        // console.log('NEW PERSON : ', person);
        // Meteor.users.update(userId, {
        //     $set: {
        //         relatedPerson: person,
        //         ssok: ssok
        //     }
        // });

        console.log('userid', userId);

    }
};


AccountsTemplates.removeField('password');

AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 8,

    re: /(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'Al menos 1 número, 1 minúscula y 1 mayúscula por favor.'
});

AccountsTemplates.configure({
    texts: {
        button: {
            changePwd: "Password Text",
            enrollAccount: "Enroll Text",
            forgotPwd: "Enviar mail",
            resetPwd: "Resetear pass",
            signIn: "Entrar",
            signUp: "Registrarse",
        }
    }
});


// 
// Accounts.urls.resetPassword = (token) => {
//     return Meteor.absoluteUrl(`reset-password/${token}`);
// };

// let userId = Meteor.userId();
AccountsTemplates.configure({
    //defaultTemplate: 'myCustomFullPageAtForm',
    postSignUpHook: myPostSubmitFunc,
    defaultLayout: 'AT_layout',
    defaultLayoutType: 'blaze',
    defaultLayoutRegions: {},
    defaultContentRegion: 'main',
    // Behavior
    confirmPassword: false,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/onloggedin',
    redirectTimeout: 4000,


    // Hooks
    // onLogoutHook: postSignUp
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,

    // Texts
    /*texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },*/
});
