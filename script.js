// sumber akumulasi usia perokok
// https://www.theguardian.com/society/2024/dec/30/single-cigarette-takes-20-minutes-off-life-expectancy-study
// sumber harapan hidup penduduk indonesia
// https://ayosehat.kemkes.go.id/usia-harapan-hidup-penduduk-di-indonesia-meningkat-bagaimana-cara-hidup-panjang-dengan-sehat-dan-sejahtera

let step = 1;
let batang = 0;
let tahun = 0;

const inputEl = document.getElementById("input");
const submitEl = document.getElementById("submit");
const resultSpan = document.getElementById("resultSpan");
const resultTime = document.getElementById("resultTime");
const resultBox = document.getElementById("resultBox");
const kalkulator = document.getElementById("kalkulator");
const grafikEl = document.getElementById("grafik");
const solusiBtn = document.getElementById("solusiBtn");

function bulatKeBawah10(angka) {
    return Math.floor(angka / 10) * 10;
}

if (batang === 0) {
    grafikEl.classList.add("hidden");
    solusiBtn.classList.add("hidden");
}


submitEl.addEventListener("click", () => {
    const value = parseFloat(inputEl.value);
    if (isNaN(value) || value <= 0) {
        alert("Masukkan angka yang valid");
        return;
    }

    if (step === 1) {
        batang = value;
        inputEl.value = "";
        inputEl.placeholder = "Sudah berapa tahun merokok?";
        step = 2;
    } else if (step === 2) {
        tahun = value;

        const totalBatang = tahun * 365 * batang;
        const totalMenit = totalBatang * 20;
        const totalTahunKehilangan = totalMenit / (60 * 24 * 365);
        const tahunUtuh = Math.floor(totalTahunKehilangan);
        const sisaHari = Math.floor((totalTahunKehilangan - tahunUtuh) * 365);

        resultSpan.textContent = `${tahunUtuh} tahun ${sisaHari} hari`;
        resultTime.textContent = `${tahunUtuh} tahun ${sisaHari} hari`;
        resultBox.classList.remove("hidden");
        kalkulator.classList.remove("hidden");


        const umurNon = 72;
        const umurPerokok = umurNon - tahunUtuh;
        let visualSelisih = tahunUtuh;

        if (visualSelisih < 15) {
            visualSelisih *= 2; // perbesar efeknya
        }

        const adjustedPerokok = umurNon - visualSelisih;
        let perokokWidth = bulatKeBawah10((adjustedPerokok / umurNon) * 100) - 10;
        const nonWidth = 100; // non-perokok selalu 100%

        solusiBtn.classList.remove("hidden");
        grafikEl.classList.remove("hidden");
        requestAnimationFrame(() => {
            solusiBtn.classList.remove("translate-x-full", "opacity-0");
            document.getElementById("bar-perokok").style.width = perokokWidth + "%";
            document.getElementById("bar-non").style.width = nonWidth + "%";
        })
        // Optional: Update angka
        document.getElementById("perokok-txt").textContent = umurPerokok;
        document.getElementById("non-txt").textContent = umurNon;

        grafikEl.scrollIntoView({
            behavior: "smooth"
        });

        step = 1;
        inputEl.value = "";
        inputEl.placeholder = "Berapa batang rokok per hari?";
    }
});
