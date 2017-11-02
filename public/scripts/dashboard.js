var URL = location.protocol + '//' + location.host;

var studentAPI = URL + '/student/';

$(document).ready(function() {
    /*$('#editStudentModal').on('show.bs.modal', function(e) {
        var admissionNumber = $(e.relatedTarget).data('id');
        $.getJSON(studentAPI + admissionNumber).done(function(student) {
            $(e.currentTarget).find('select[name="faculty"] option[value=' + student[0].faculty + ']').attr('selected', true).trigger('change');
            $(e.currentTarget).find('input[name="firstName"]').val(student[0].firstName);
            $(e.currentTarget).find('input[name="lastName"]').val(student[0].lastName);
            $(e.currentTarget).find('input[name="admissionNumber"]').val(student[0].admissionNumber);
            $(e.currentTarget).find('select[name="gender"]').val(student[0].gender).attr('selected', true);
            console.log(student[0].department.name);
            $(e.currentTarget).find('select[name="department"] ').val(student[0].department.name).attr('selected', true);
            $(e.currentTarget).find('#editStudentForm').attr('action', '/student/update/' + student[0].admissionNumber);

        });
    })*/
});