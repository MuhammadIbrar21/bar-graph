let increment = document.getElementById('incre');
let decrement = document.getElementById('decre');
let addDetailBtn = document.getElementById('add-detail-btn');


let dollarRate = [
    { currencyRate: 160, month: "jan" },
    { currencyRate: 180, month: "feb" },
    { currencyRate: 240, month: "mar" },
    { currencyRate: 160, month: "apr" },
    { currencyRate: 280, month: "may" },
    { currencyRate: 300, month: "jun" },
]

generateBar()
generateBarDetails()

function generateBar() {
    let barContainer = document.getElementById('bars');

    let maxBarHeight = barContainer.offsetHeight - 10;

    let max = maximium(dollarRate);

    let height;

    for (let rate of dollarRate) {

        if (rate == max) {
            height = maxBarHeight;
        } else {
            let rateP = rate.currencyRate * 100 / max;
            height = rateP * maxBarHeight / 100;
        }

        barContainer.innerHTML += `
                <div class="bar" style="height:${height}px; background-color: ${diffColor()};"></div>
        `
    }

    let bars = document.querySelectorAll('.bar');

    if (dollarRate.length > 7) {
        for (let bar of bars) {
            bar.style.width = (50 - dollarRate.length * 2) + 'px';

        }
    }
}

function generateBarDetails() {
    let barDetails = document.getElementById('bar-details');
    let scaleValue = document.getElementById('left-scale');

    let max = maximium(dollarRate);

    let divider = Math.round(max / 6);
    let j = 5;
    scaleValue.innerHTML = `<div>0</div>`
    for (let i = 0; i < 6; i++) {
        let iterated = Math.round(max - divider * j)
        scaleValue.innerHTML += `
            <div>${iterated}</div>
      `
        j--;
    }

    dollarRate.sort((n, p) => {
        return n.month - p.month;
    })

    for (let detail of dollarRate) {
        barDetails.innerHTML += `
                <div>${detail.month}</div>
        `
    }
}

function diffColor() {
    let colors = ['#2c5985', '#347ea1', '#51a8bc', '#3480a3', '#bce4d8']

    return colors[Math.floor(Math.random() * colors.length)]
}

function maximium(arr) {
    let maxValue = Number.MIN_VALUE;
    for (let rate of arr) {
        if (rate.currencyRate > maxValue) {
            maxValue = rate.currencyRate;
        }
    }
    return maxValue;
}

function randomMonth() {
    let monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    return monthList[Math.floor(Math.random() * monthList.length)];
};

addDetailBtn.addEventListener('click', () => {
    let price = document.getElementById('price');
    let month = document.getElementById('month');

    if (price.value == 0 && month.value == '') {
        price.style.borderColor = 'red'
        month.style.borderColor = 'red'
        return
    } else if (price.value == 0) {
        price.style.borderColor = 'red'
        return
    } else if (month.value == '') {
        month.style.borderColor = 'red'
        return
    } else {
        price.style.borderColor = ''
        month.style.borderColor = ''
    }


    let newPrice = {
        currencyRate: price.value,
        month: month.value
    }

    dollarRate.push(newPrice);

    let barContainer = document.getElementById('bars');
    let barDetails = document.getElementById('bar-details');
    let scaleValue = document.getElementById('left-scale');

    barContainer.innerHTML = ''
    barDetails.innerHTML = ''
    scaleValue.innerHTML = ''

    generateBar()
    generateBarDetails()

})

increment.addEventListener('click', () => {
    let max = maximium(dollarRate);
    let currencyRate = Math.floor(Math.random() * max)
    let montName = randomMonth();
    if (dollarRate.length < 24) {
        let newObj = {
            currencyRate: currencyRate,
            month: montName,
        }
        dollarRate.push(newObj);
    }
    console.log(max);
    if (dollarRate.length == 23) {
        increment.disabled = true;
    } else if (dollarRate.length > 1) {
        decrement.disabled = false;
    }
    let barContainer = document.getElementById('bars');
    let barDetails = document.getElementById('bar-details');
    let scaleValue = document.getElementById('left-scale');

    barContainer.innerHTML = ''
    barDetails.innerHTML = ''
    scaleValue.innerHTML = ''

    generateBar()
    generateBarDetails()
})

decrement.addEventListener('click', () => {
    if (dollarRate.length > 1) {
        dollarRate.pop();
        increment.disabled = false;
    }
    if (dollarRate.length == 1) {
        decrement.disabled = true;
    }
    let barContainer = document.getElementById('bars');
    let barDetails = document.getElementById('bar-details');
    let scaleValue = document.getElementById('left-scale');

    barContainer.innerHTML = ''
    barDetails.innerHTML = ''
    scaleValue.innerHTML = ''

    generateBar()
    generateBarDetails()
})