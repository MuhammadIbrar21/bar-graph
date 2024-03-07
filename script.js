
let dollarRate = [160, 180, 240, 160, 280]

generateBar()
generateBarDetails()

function generateBar() {
    let barContainer = document.getElementById('bars');

    let maxBarHeight = barContainer.offsetHeight - 10;

    for (let rate of dollarRate) {

        let max = Math.max(...dollarRate);

        let height;

        if (rate == max) {
            height = maxBarHeight;
        } else {
            let rateP = rate * 100 / max;
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

    for (let detail of dollarRate) {
        barDetails.innerHTML += `
                <div>${detail}</div>
        `
    }
}

function diffColor() {
    let colors = ['#2c5985', '#347ea1', '#51a8bc', '#3480a3', '#bce4d8']

    return colors[Math.floor(Math.random() * colors.length)]
}

let increment = document.getElementById('incre');
let decrement = document.getElementById('decre');

increment.addEventListener('click', () => {
    dollarRate.push(Math.floor(Math.random() * Math.max(...dollarRate)));
    let barContainer = document.getElementById('bars');
    let barDetails = document.getElementById('bar-details');

    barContainer.innerHTML = ''
    barDetails.innerHTML = ''

    generateBar()
    generateBarDetails()
})

decrement.addEventListener('click', () => {
    dollarRate.pop();
    let barContainer = document.getElementById('bars');
    let barDetails = document.getElementById('bar-details');

    barContainer.innerHTML = ''
    barDetails.innerHTML = ''

    generateBar()
    generateBarDetails()
})