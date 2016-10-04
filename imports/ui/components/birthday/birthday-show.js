import './birthday-show.html';

Template.Birthday_show.onRendered(function() {

    console.log(this.data.bDay);
});
Template.Birthday_show.helpers({
    dateOfBirth() {

        let result;
        const instance = Template.instance();
        const bDay = instance.data.bDay;
        const bMonth = instance.data.bMonth;
        const bYear = instance.data.bYear;
        if ((bDay !== null) && (bMonth !== null)) {
            if ((bDay == '') || (bMonth == '')) {
                result = moment(sfsdfseff);
            };
            result = moment({
                year: bYear,
                month: bMonth,
                day: bDay
            });
        } else {

            result = null;
        };
        return result;

    },

    actualBirthDay() {
        const instance = Template.instance();
        let result;
        let dateOfBirth;
        let now = moment();
        const bDay = instance.data.bDay;
        const bMonth = instance.data.bMonth;
        const bYear = instance.data.bYear;
        if ((bDay !== null) && (bMonth !== null)) {
            if ((bDay == '') || (bMonth == '')) {
                dateOfBirth = moment(errorstring);
            };
            dateOfBirth = moment({
                year: bYear,
                month: bMonth,
                day: bDay
            });
        } else {

            dateOfBirth = null;
        };



        let actualBDay = moment(dateOfBirth)
            .year(now.year());
        let prevBDay = moment(actualBDay)
            .subtract(1, 'years');
        let nextBDay = moment(actualBDay)
            .add(1, 'years');
        if (now.month() < 6) {
            if (Math.abs(now.diff(prevBDay, 'days')) < Math.abs(now.diff(actualBDay,
                    'days'))) {
                result = prevBDay; //compare against last year's birthday
            } else {
                result = actualBDay; //compare against this year's birthday
            }
        } else {
            //we are between JUL and DEC
            if (Math.abs(now.diff(nextBDay, 'days')) < Math.abs(now.diff(actualBDay,
                    'days'))) {
                result = nextBDay; //compare against next year's birthday
            } else {
                result = actualBDay; //compare against this year's birthday
            }
        }
        return result;

    },

    /* hasAge : function() {
        return (dateOfBirth(this.bDayOfMonth,this.bMonth,this.bYear).year() === 5000) ? false : true;//5000 means year of birth is unknown
      },*/


    validBDay(d) {
        return (d.isValid()) ? true : false;
    },
    age(d) {
        const diff = moment()
            .diff(d, 'years');
        // const age = d.fromNow(true);
        return (!(d.year() == 5000) && diff >= 1) ? diff : false;
    },
    now() {
        return moment();
    },
    newBorn(d) {
        const diff = moment()
            .diff(d, 'years');
        const age = d.fromNow(true);
        return (!(d.year() == 5000) && diff < 1) ? age : false;
    },
    bornToday(d) {
        //var age = moment().diff(d,'years');
        return (!(d.year() == 5000) && d.isSame(moment(), 'day')) ? true :
            false;
    },
    isToday(d) {
        const now = moment();
        return ((now.month() === d.month()) && (now.date() === d.date())) ?
            true : false;
    },
    wasYesterday(d) {
        const now = moment();
        const yesterday = moment()
            .subtract(1, 'days');
        return ((now.month() === d.month()) && (yesterday.date() === d.date())) ?
            true : false;
    },
    hasPassed(b) {
        return (b.isBefore(moment(), 'day')) ? true : false;

    },
    moreThanAWeekAgo(b) {
        return (moment()
            .diff(b, 'days') > 6) ? true : false;
    },
    isTomorrow(b) {
        return (b.diff(moment(), 'hours') < 24 && b.diff(moment(), 'hours') >
            0) ? true : false;
    },
    inLessThanAWeek(b) {
        return (b.diff(moment(), 'weeks') < 1) ? true : false;
    },
    inLessThanAMonth(b) {
        return (b.diff(moment(), 'months') < 1) ? true : false;
    },
    whatDiff(b) {
        return b.diff(moment(), 'days');
    },
    bDayClose(b) {
        if (b.diff(moment(), 'days') == 6) {
            return b.format('[el ] dddd D');
        } else {
            return b.calendar(null, {
                sameDay: '[hoy]',
                nextDay: '[en dos dias]',
                nextWeek: '[el ]dddd',
                lastDay: '[ayer]',
                lastWeek: '[el ] dddd',
            });
        }
    },
    bDayPlain(b) {
        return b.format('D MMM');
    },

    bDayLong: function(b) {
        return b.format('[el ] dddd, D [de] MMMM');
    },
    newAge: function(d) {
        //var lessYear =
        return (d.year() == 5000) ? false : moment()
            .add(1, 'year')
            .diff(d,
                'years');
    }



});
