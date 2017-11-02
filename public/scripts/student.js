var URL = location.protocol + '//' + location.host;

var studentAPI = URL + '/student/';
var facultyAPI = URL + '/faculties';
var departmentAPI = URL + '/departments';
$(document).ready(function() {
    $.getJSON(facultyAPI).done(function(faculties) {
        for (faculty in faculties) {
            $("#selectFaculty").append(`<option value=\"` + faculties[faculty]._id + `\">` + faculties[faculty].name + `</option>`);
        }
    });

    $('#selectFaculty').on('change', function() {
        $("#selectDepartment").html(`<option value=\"\" selected disabled hidden>Select Department</option>`);
        facultyId = $('#selectFaculty').val();
        $.getJSON(departmentAPI).done(function(departments) {
            for (department in departments) {
                if (departments[department].faculty === facultyId) {
                    $("#selectDepartment").append(`<option value=\"` + departments[department]._id + `\">` + departments[department].name + `</option>`);
                }
            }
        })
    })

    $('#editStudentModal').on('show.bs.modal', function(e) {
        var admissionNumber = $(e.relatedTarget).data('id');
        $.getJSON(studentAPI + admissionNumber).done(function(student) {
            $(e.currentTarget).find('select[name="faculty"] option[value=' + student[0].faculty + ']').attr('selected', true).trigger('change');
            $(e.currentTarget).find('input[name="firstName"]').val(student[0].firstName);
            $(e.currentTarget).find('input[name="lastName"]').val(student[0].lastName);
            $(e.currentTarget).find('input[name="admissionNumber"]').val(student[0].admissionNumber);
            $(e.currentTarget).find('select[name="gender"]').val(student[0].gender).attr('selected', true);
            $(e.currentTarget).find('select[name="department"] option[value=' + student[0].department._id + '] ').attr('selected', true);
            $(e.currentTarget).find('#editStudentForm').attr('action', '/student/update/' + student[0].admissionNumber);

        });
    })

    $('#deleteStudentModal').on('show.bs.modal', function(e) {
        var deleteName = $(e.relatedTarget).data('name');
        var admissionNumber = $(e.relatedTarget).data('id'); //admission number to be deleted
        $('#deleteName').text(deleteName);
        $('#deleteStudentButton').on('click', function() {
            $.ajax({
                type: 'POST',
                url: '/student/delete/' + admissionNumber
            });
            window.location.reload();
        })
    })
});