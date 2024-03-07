
let dollarRate = [140, 180, 240, 160, 280,];

generateBar()
generateBarDetails()

function generateBar() {
    let barContainer = document.getElementById('bars');

    for (let rate of dollarRate) {

        let max = Math.max(...dollarRate);

        let height;

        if (rate == max) {
            height = 280;
        } else if (rate == 0) {
            height = 5
        } else if (rate < 101) {
            height = 280 - (210 - Math.floor(rate * 100 / 280))
        } else if (rate < 151) {
            height = 280 - (175 - Math.floor(rate * 100 / 280))
        } else {
            height = 280 - (130 - Math.floor(rate * 100 / 280))
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