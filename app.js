// Get form ID and listen for submit 
form = document.querySelector('#form-task');
form.addEventListener('submit', validate);

// Start over button - Clear all values 
function startOver() {

    inputArray = document.querySelectorAll('#form-task input');

    inputArray.forEach(function (input) {
        input.value = '';
    });

    // Alternative method

    // document.form_task.loanAmount.value = "";
    // document.form_task.months.value = "";
    // document.form_task.interest.value = "";
    // document.form_task.extra.value = "";

}

// Validation for the input 
function validate(e) {

    // Get values from User 
    const loanAmount = document.form_task.loanAmount.value;
    const months = document.form_task.months.value;
    const interest = document.form_task.interest.value;
    let extra = document.form_task.extra.value;


    // Validate the values 
    if (extra === '') {

        document.form_task.extra.value = '0';
        extra = 0;
    }

    if (loanAmount <= 0 || isNaN(Number(loanAmount))) {
        alert("Please enter your loan amount");
        loanAmount = '';
    }
    else if (months <= 0 || parseInt(months) != months) {
        alert("Please enter a valid number of months");
        months = 0;
    }
    else if (interest <= 0 || isNaN(Number(interest))) {
        alert("Please enter a valid interest rate");
    }
    else if (extra < 0 || isNaN(Number(extra))) {
        alert("Please enter a valid amount");
    }
    else {
        displayLoan(parseFloat(loanAmount), parseInt(months), parseFloat(interest), parseFloat(extra));
    }

    e.preventDefault();

}

// Display loan results
function displayLoan(loan_amt, numMonth, theRate, theExtra) {

    i = theRate / 100;

    const monthly_payments = loan_amt * (i / 12) * Math.pow((1 + i / 12), numMonth) / (Math.pow((1 + i / 12), numMonth) - 1);

    loanInfo = document.querySelectorAll('.results p span');

    loanInfo[0].textContent = `$${loan_amt}`; //Loan amount 
    loanInfo[1].textContent = `${numMonth} months`;       //Number of months 
    loanInfo[2].textContent = `${theRate}%`;  //Interest rate 
    loanInfo[3].textContent = `$${theExtra}`; //Extra payment 
    loanInfo[4].textContent = `$${round(monthly_payments, 2)}`; //Monthly payments
    loanInfo[5].textContent = `$${round(monthly_payments + theExtra, 2)}`; //Total payments

    displaySchedule(loan_amt, monthly_payments, theExtra, i);

}

function displaySchedule(loan, monthly, extra, rate) {

    let scheduleInfo = '';

    scheduleInfo += '<tr>';
    scheduleInfo += `<td>0</td>`;
    scheduleInfo += `<td>0</td>`;
    scheduleInfo += `<td>0</td>`;
    scheduleInfo += `<td>0</td>`;
    scheduleInfo += `<td>0</td>`;
    scheduleInfo += `<td>${round(loan, 2)}</td>`;
    scheduleInfo += '<tr>';


    let current_balance = loan;
    let counter = 1;
    let total_interest = 0;

    monthly = monthly + extra;

    while (current_balance > 0) {
        // Create rows

        towards_interest = (rate / 12) * current_balance;
        if (monthly > current_balance) {
            monthly = current_balance + towards_interest;
        }
        towards_balance = monthly - towards_interest;
        total_interest = total_interest + towards_interest;
        current_balance = current_balance - towards_balance;

        scheduleInfo += '<tr>';
        scheduleInfo += `<td>${counter}</td>`;
        scheduleInfo += `<td>${round(monthly, 2)}</td>`;
        scheduleInfo += `<td>${round(towards_balance, 2)}</td>`;
        scheduleInfo += `<td>${round(towards_interest, 2)}</td>`;
        scheduleInfo += `<td>${round(total_interest, 2)}</td>`;
        scheduleInfo += `<td>${round(current_balance, 2)}</td>`;
        scheduleInfo += '<tr>';

        counter++;

        console.log('wdw');


    }

    document.getElementById('schedule').innerHTML = scheduleInfo;

}


// Round to decimals 
function round(num, dec) {
    return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
}