redirectUserRole();

let users = []
let currentTable = "all";

$("#late").hide();
$("#excuse").hide();

function changeTable(tb) {
    $("#" + currentTable).hide();
    $("#" + tb).show();
    currentTable = tb;
    drawTable();
}
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();

HTTPService.get("http://localhost:3000/users").then(ret => {
    users = ret;
    drawTable();
});

function tRow(user) {
    let tableRow = "<tr>";
    tableRow += `<td>${user.name} </td>`;
    if (currentTable === "all")
        tableRow += `<td>${user.attendance}</td>`
    if (currentTable === "all" || currentTable === "late")
        tableRow += `<td>${user.late}</td>`
    if (currentTable === "all" || currentTable === "excuse")
        tableRow += `<td>${user.excuse}</td>`
    tableRow + `</tr>`
    return tableRow;
}

function drawTable() {
    const table = document.getElementById(currentTable).getElementsByTagName('tbody')[0];

    table.innerHTML = "";


    for (let row = 0; row < users.length; row++) {
        let element = users[row];
        let URL_Attendances = `http://localhost:3000/attendances?user_id=${element.id}`;

        let attendance_Time = URL_Attendances;
        attendance_Time += "&&year=" + year;
        attendance_Time += "&&month=" + month;

        console.log(element.id);
        HTTPService.get(attendance_Time).then(ret1 => {
            attendance_Time += "&&isLate=true"
            HTTPService.get(attendance_Time).then(ret2 => {
                let newRow = table.insertRow(row);
                newRow.innerHTML = tRow({
                    name: element.firstName + " " + element.lastName,
                    attendance: ret1.length,
                    excuse: day - ret1.length,
                    late: ret2.length
                });
                console.log(ret1, ret2);
            });
        });
    }
}
