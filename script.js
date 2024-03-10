
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

    let iterated;
    let totalScale;
    if (max <= 300) {
        iterated = 50;
        totalScale = 7;
    } else if (max > 300 && max <= 400) {
        iterated = 60;
        totalScale = 8;
    } else if (max > 400 && max <= 500) {
        iterated = 75;
        totalScale = 8;
    }
    for (let i = 0; i < totalScale; i++) {
        scaleValue.innerHTML += `
            <div>${i * iterated}</div>
      `
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
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].currencyRate > maxValue) {
            maxValue = arr[i].currencyRate;
        }
    }
    return maxValue;
}

function randomMonth() {
    let monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    return monthList[Math.floor(Math.random() * monthList.length)];
};

let increment = document.getElementById('incre');
let decrement = document.getElementById('decre');

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