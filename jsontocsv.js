 
    function ConvertToJS() {
        var input = document.getElementById('JSONinput').value
        try {
            var JSobject = JSON.parse(input);
        } catch (e) {
            document.getElementById('message').innerHTML = "<p style='color: red;'>Text area empty or not valid JSON!</p>"
            return false;
        }
        return JSobject;
    }

    function createCSVArrays(JSObject) {
        values = []
        // get object properties and values
        if (!JSObject[0]) {
            headers = Object.keys(JSObject);
            values.push(Object.values(JSObject))
        } else {
        for (var i = 0; i < JSObject.length; i++) {
            values.push(Object.values(JSObject[i]))
        }
             }
        CSV = [headers, values]
        return CSV
    }



    function printCSV() {
        var JSObject = ConvertToJS();
        var CSVarr = createCSVArrays(JSObject)
        headersArr = CSVarr[0]
        valuesArr = CSVarr[1]
        CSVheaders = headersArr.join() + "\n"
        CSVvalues = ""
        valuesArr.forEach(function (item) {
            CSVvalues += item.join() + "\n"
        });
        document.getElementById('CSVoutput').value = CSVheaders + CSVvalues
    }



function createCSVArray(csvString) {
    var csvArr = csvString.split(" ")
    return csvArr
}

function getLineBreakIndex(csvArr) {
    return csvArr[0].indexOf("\n")
}

function getCSVHeaders(csvArr) {    
    var firstLineBreakIndex = getLineBreakIndex(csvArr)
    var headerString = csvArr[0].slice(0, firstLineBreakIndex)
    var headerArr = headerString.split(",")
    return headerArr
}

function getCSVValues(csvArr){
    var headerArr = getCSVHeaders(csvArr)
    var firstLineBreakIndex = getLineBreakIndex(csvArr)
    // Insert a linebreak to the end in case not in input: This makes sure the last row is recognized by what follows
    if (csvArr[0].slice(-1) != '\n') {
        csvArr[0] += '\n'
    }
    var valuesString = csvArr[0].slice(firstLineBreakIndex)
    var cleanedStr = valuesString.replace(/\n/ig, ',')
    var valuesArr = cleanedStr.replace(/,/g, " ").trim().split(" ")
    // create separate arrays for each row, remove corresponding values from values array. Store rows in their own array
    var numRows = csvArr[0].split("\n").length - 2
    var rows = []
    for (var i = 0; i < numRows; i++) {
        var row = valuesArr.slice(0, headerArr.length)
        valuesArr.splice(0, headerArr.length)
        rows.push(row)
    }
    return rows
}

function createJSOBject(header, rows) {
    var objArr = []
    for (var i = 0; i < rows.length; i++) {
        var obj = {}
        header.forEach(function (item) {
            obj[item] = rows[i][header.indexOf(item)]
        });
        objArr.push(obj);
    }
    if (objArr.length == 1) {
        return objArr[0]
    } else {
    return objArr
    }
}
   

    function convertCSV() {
        var input = document.getElementById('CSVinput').value
        var csvArr = createCSVArray(input);
        var header = getCSVHeaders(csvArr);
        var rows = getCSVValues(csvArr);
        var JSObject = createJSOBject(header, rows)
        document.getElementById('JSONoutput').value = JSON.stringify(JSObject)
    }



    function clearBoxes(input, output, message) {
        document.getElementById(input).value = ""
        document.getElementById(output).value = ""
        if (document.getElementById(message)) {
            document.getElementById(message).innerText = ""
        }
    }

    

   var modeSelector = document.getElementsByName("mode")
    modeSelector.forEach(function (option) {
        option.addEventListener("change", function (e) {
        if (e.target.value == 'jsontocsv') {
            document.getElementsByClassName('JSONtoCSV')[0].classList.add('show')
            document.getElementsByClassName('JSONtoCSV')[0].classList.remove('hide')
             document.getElementsByClassName('CSVtoJSON')[0].classList.add('hide')

        } else if (e.target.value == 'csvtojson') {
            document.getElementsByClassName('CSVtoJSON')[0].classList.add('show')
             document.getElementsByClassName('CSVtoJSON')[0].classList.remove('hide')
             document.getElementsByClassName('JSONtoCSV')[0].classList.add('hide')
             document.getElementsByClassName('JSONtoCSV')[0].classList.remove('show')

        }

 }); 

});

var convertJSONButton = document.getElementById("convertJSON") 
convertJSONButton.addEventListener("click", function () {
    printCSV()
    
}) 

var convertCSVButton = document.getElementById('convertCSV')
convertCSVButton.addEventListener('click', function() {
    convertCSV()
});

var clearJSONtoCSVButton = document.getElementById("clearJSON")
clearJSONtoCSVButton.addEventListener("click", function() {
    clearBoxes('JSONinput', 'CSVoutput', 'message')
})

var clearCSVtoJSONButton = document.getElementById("clearCSV")
clearCSVtoJSONButton.addEventListener("click", function () {
    clearBoxes('CSVinput', 'JSONoutput', 'message')
})





    
