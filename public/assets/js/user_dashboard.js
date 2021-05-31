redirectUserRole();
const currentUser = Storage.getUser();

$("#employee_name").html(currentUser.firstName + " " + currentUser.lastName)

let URL_Attendances = `http://localhost:3000/attendances?user_id=${currentUser.id}`;



const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();

console.log(year + " " + month + " " + day);


let attendance_Time = URL_Attendances;
attendance_Time += "&&year=" + year;
attendance_Time += "&&month=" + month;


HTTPService.get(attendance_Time).then(ret => {
    $("#attendance_time").text(ret.length)
    $("#absence_time").text(day - ret.length)
});

attendance_Time += "&&isLate=true"
HTTPService.get(attendance_Time).then(ret => {
    console.log(ret);
    $("#late_time").text(ret.length)
});