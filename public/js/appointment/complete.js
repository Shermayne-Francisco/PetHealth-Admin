$(document).ready(function () {
    allCompleteAppointmentFunction();
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
});

// FETCH UPCOMING OPERATION FOR TABLES
function allCompleteAppointmentFunction() {
    var table = $("#allCompleteAppointmentFunction").DataTable({
        language: {
            emptyTable: "No Appointment Found.",
        },
        lengthChange: true,
        scrollCollapse: true,
        paging: true,
        info: true,
        responsive: true,
        ordering: false,
        aLengthMenu: [
            [25, 50, 75, -1],
            [25, 50, 75, "All"],
        ],
        iDisplayLength: 25,
        ajax: {
            url: "/allCompleteAppointmentFunction",
            dataSrc: "",
            targets: "0",
        },
        columns: [
            { data: "app_id" },
            {
                mData: function (data, type, row) {
                    return data.user_fname + " " + data.user_lname;
                },
            },
            { data: "pet_name" },
            { data: "pet_breed" },
            { data: "app_type" },
            {
                data: "app_date",
                render: function (data) {
                    return moment(data).format("MMM DD, YYYY");
                },
                targets: 1,
            },
            {
                data: "app_time",
                render: function (data) {
                    var timeString = moment().format("YYYY-MM-DD") + " " + data;
                    return moment(timeString, "YYYY-MM-DD h:mm:ss a").format(
                        "h:mm a"
                    );
                },
                targets: 1,
            },
        ],
        order: [[1, "asc"]],
    });
    table
        .on("order.dt search.dt", function () {
            let i = 1;
            table
                .cells(null, 0, { search: "applied", order: "applied" })
                .every(function (cell) {
                    this.data(i++);
                });
        })
        .draw();
}
// FETCH UPCOMING OPERATION FOR TABLES
