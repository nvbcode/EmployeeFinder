let employees = require('../data/employees');


module.exports = function (app) {

    app.get('/api/employees', function (req, res) {
        res.json(employees);
    });

    app.post('/api/employees', function (req, res) {
        console.log(req.body);
        let absDiff = 0;
        let diffArr = [];

        let userArray = req.body.scores;


        // looping through the list of employees
        for (let i = 0; i < employees.length; i++) {
            let scoreArray = employees[i].scores
            console.log(scoreArray);

            // looping through the scores of a specific employee

            for (let j = 0; j < scoreArray.length; j++) {
                absDiff += Math.abs(parseInt(scoreArray[j]) - parseInt(userArray[j]));
            };
            diffArr.push(absDiff);
            absDiff = 0;


        };
        // employees.push(req.body);
        console.log(`check: ${diffArr}`);
        const minVal = Math.min.apply(null, diffArr);
        console.log(minVal);
        const value = diffArr.indexOf(minVal);
        console.log(value);
        const responseData = {
            name: employees[value].name,
           photo: employees[value].photo
        };
        res.json(responseData);
    });

}