$(function () {


    // created an array that will hold the values from the checkboxes

    let dataParams = {};
    let count = 0;

    const postToServ = function () {
        $.ajax({
            method: "POST",
            url: '/api/employees',
            data: dataParams
        }).then(function (res) {
            console.log('Sent Data');
            console.log(res);
            $('.modal-title').empty();
            $('.modal-body').empty();
            $('.modal-title').text(`${res.name}`);
            $('.modal-body').append(`<img src ="${res.photo}" alt="Employee Image"></img>`);
            $('#alertModal').modal('show')

        }).catch(function (err) {
            throw new Error(err)
        });
    };

    const getData = function () {
        let checkBoxes = [];
        dataParams.name = $('#nameForm').val().trim();
        dataParams.photo = $('#photoLink').val().trim();

        if (dataParams.name === '' || dataParams.name === '') {
            alert('Name or Link is empty. Please fill out both');
            return;
        }

        $('input:checked').each(function () {
            checkBoxes.push($(this).val());
        });
        console.log(checkBoxes);
        if (checkBoxes.length < 10) {
            alert('Please Answer all options');
            return;
        } else if (checkBoxes.length > 10) {
            alert('Too many boxes checked!');
            return;
        } else {
            dataParams.scores = checkBoxes;
            postToServ();

        };

    };


    $('#submitButton').on('click', getData);

});