
redirectUserRole();
isAttendant = () => {
    const user = Storage.getUser();
    const curTime = new Date().toLocaleDateString();
    let URL_ISAttendances = "http://localhost:3000/attendances";
    URL_ISAttendances += "?user_id=" + user.id;
    URL_ISAttendances += "&&date=" + curTime;
    HTTPService.get(URL_ISAttendances).then((d) => {
        if (d.length >= 1) {
            $("#already_attendance_form").show()
            $("#report").show()
            $("#attendance_form").hide();
            $("#employee_name").text(user.firstName + " " + user.lastName);
            $("#attenance_time").text(d[0].time);
        } else {
            $("#already_attendance_form").hide()
            $("#report").hide()
            $("#attendance_form").show()
        }
    })
}

isAttendant();
addAttendance = () => {
    const user = Storage.getUser();
    let URL_Attendances = "http://localhost:3000/attendances";

    const curTime = new Date();
    const expectedTime = new Date();
    expectedTime.setHours("8");
    expectedTime.setMinutes("15");

    const userName = $("#username").val();
    const user_attendant = {
        "user_id": user.id,
        "date": new Date().toLocaleDateString(),
        "year": new Date().getFullYear(),
        "month": new Date().getMonth() + 1,
        "day": new Date().getDate(),
        "time": new Date().toLocaleTimeString(),
        "isLate": (curTime - expectedTime) > 0 ? "true" : "false"
    };
    console.log(user_attendant);
    HTTPService.post(URL_Attendances, user_attendant).then((d) => {
        console.log(d);
    })
    isAttendant();
}