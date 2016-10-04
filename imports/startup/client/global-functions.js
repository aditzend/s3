postSignUp = function(userId, info) {
    console.log('SIGN UP');
    // FlowRouter.go('exit');
};






dayOfMonthOptions = function() {
    let optionsArray = [];
    optionsArray.push({
        text: "-",
        value: 0
    });
    for (i = 1; i < 32; i++) {
        //var str = 'Num ' + i;
        optionsArray.push({
            text: i,
            value: i
        })
    }
    return optionsArray;
};

monthOptions = function() {
    let optionsArray = [];
    optionsArray.push({
        text: '-',
        value: 12
    })
    for (i = 0; i < 12; i++) {
        //var str = 'Num ' + i;
        optionsArray.push({
            text: moment()
                .month(i)
                .format('MMMM'),
            value: i
        })
    }
    return optionsArray;
};

bYearOptions = function() {
    let optionsArray = [];
    let thisYear = moment()
        .format('YYYY');
    let beginYear = thisYear - 125;
    optionsArray.push({
        text: '-',
        value: 5000
    });
    for (i = thisYear; i > beginYear; i--) {
        //var str = 'Num ' + i;
        optionsArray.push({
            text: i,
            value: i
        })
    }


    return optionsArray;
};

workfor = function() {
  let index = Session.get('job');
  let jobs = Meteor.user().jobs;
  if (index === undefined || jobs == undefined || jobs.length === 0 ) {
    console.log('NO JOBS FOUND, RETURNING FREELANCE OBJECT');
    return {
      _id:Meteor.userId(),
    name:'Freelance',
    logo: false};
  }else{
    console.log('JOBS FOUND, RETURNING OBJECT');
    
    
    return {
      _id:jobs[index].companyId,
    name:jobs[index].companyName,
    logo: jobs[index].companyLogo};
  }
};

// Animate panel function
$.fn['animatePanel'] = function() {

    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn'}
    if(!delay) { delay = 0.02 } else { delay = delay / 10 }
    if(!child) { child = '.row > div'} else {child = "." + child}

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opacity to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('stagger').addClass('animated-panel').addClass(effect);

    var panelsCount = panel.length + 40;
    var animateTime = (panelsCount * delay * 10000) / 10;

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });

    // Clear animation after finish
    setTimeout(function(){
        $('.stagger').css('animation', '');
        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
    }, animateTime)
};


