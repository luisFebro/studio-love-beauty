export default function getMonthNowBr() {
    const selectedDate = new Date();

    let monthes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const ind = selectedDate.getMonth();
    const selectedMonth = monthes[ind];
    return selectedMonth;
}