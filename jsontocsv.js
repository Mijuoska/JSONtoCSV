 
 function ConvertToJS() {
     let JSObject
     let input = document.getElementById('JSONinput').value
     try {
         JSObject = JSON.parse(input);
     } catch (e) {
         document.getElementById('message').innerHTML = "<p style='color: red;'>Text area empty or not valid JSON!</p>"
         return false;
     }
     return JSObject;
 }

 function createCSV(JSObject) {
     let headers
     let values = []
     // get object properties and values
     if (!JSObject[0]) {
         headers = Object.keys(JSObject);
         values.push(Object.values(JSObject))
     } else if (JSObject[0]) {
        headers = Object.keys(JSObject[0]);
         for (let i = 0; i < JSObject.length; i++) {
             values.push(Object.values(JSObject[i]))
     }
     CSV = [headers, values]
     return CSV
 }
}



 function convertJSON() {
     let JSObject = ConvertToJS();
     let CSVarr = createCSV(JSObject)
     let headersArr = CSVarr[0]
     let valuesArr = CSVarr[1]
     let CSVheaders = headersArr.join() + "\n"
     let CSVvalues = ""
     valuesArr.forEach(function (item) {
         CSVvalues += item.join() + "\n"
     });
     document.getElementById('CSVoutput').value = CSVheaders + CSVvalues
 }




 function createCSVArray(input, separator) {
 let regexMap = {"comma": /,/g, "semicolon": /;/g, "pipe": /|/}
 let regex = regexMap[separator]
  let csvArr = input.split("\n")
    for (let i = 0; i < csvArr.length; i++) {
        csvArr[i] = csvArr[i].replace(/\n/ig, "")
        // in case of separator being something else than a comma, we have to deal with commas within columns
        if (separator != "comma") {
            csvArr[i] = csvArr[i].replace(regexMap["comma"], ".")
        }
        csvArr[i] = csvArr[i].replace(regex, ",")
        csvArr[i] = csvArr[i].trim()
        csvArr[i] = csvArr[i].split(",")
        
    }
    // this removes the empty strings at the end of array
    csvArr.forEach(function (str) {
        if (str == "") {
            csvArr.splice(csvArr.indexOf(str), 1)
        }
    });
         return csvArr
  
    }


 function createJSOBject(csvArr) {
     header = csvArr.splice(0,1)[0]
     let objArr = []
     for (let i = 0; i < csvArr.length; i++) {
         let obj = {}
         header.forEach(function (item) {
             obj[item] = csvArr[i][header.indexOf(item)]
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
     let delimiter = document.getElementById('delimiter').value
     let input = document.getElementById('CSVinput').value
     csvArr = createCSVArray(input, delimiter);
     let JSObject = createJSOBject(csvArr)
     document.getElementById('JSONoutput').value = JSON.stringify(JSObject)
 }



 function clearBoxes(input, output, fileInput, convertButton, message) {
     document.getElementById(input).value = ""
     document.getElementById(output).value = ""
     document.getElementById(fileInput).value = "";
     if (document.getElementById(message)) {
         document.getElementById(message).innerText = ""
     }
     if (document.getElementById(convertButton).classList.contains('hide')) {
         console.log('inside if')
         document.getElementById(convertButton).classList.toggle('hide')
     }
 }


 let modeSelector = document.getElementsByName("mode")
 modeSelector.forEach(function (option) {
     option.addEventListener("change", function (e) {
         if (e.target.value == 'jsontocsv') {
             document.getElementsByClassName('JSONtoCSV')[0].classList.toggle('hide')
             document.getElementsByClassName('CSVtoJSON')[0].classList.toggle('hide')

         } else if (e.target.value == 'csvtojson') {
             document.getElementsByClassName('CSVtoJSON')[0].classList.toggle('hide')
             document.getElementsByClassName('JSONtoCSV')[0].classList.toggle('hide')

         }

     });

 });

 let convertJSONButton = document.getElementById("convertJSON")
 convertJSONButton.addEventListener("click", function () {
     convertJSON()

 })

 let convertCSVButton = document.getElementById('convertCSV')
 convertCSVButton.addEventListener('click', function () {
     convertCSV()
 });

 let clearJSONtoCSVButton = document.getElementById("clearJSON")
 clearJSONtoCSVButton.addEventListener("click", function () {
     clearBoxes('JSONinput', 'CSVoutput', 'json-file', 'convertJSON', 'message')
 })

 let clearCSVtoJSONButton = document.getElementById("clearCSV")
 clearCSVtoJSONButton.addEventListener("click", function () {
     clearBoxes('CSVinput', 'JSONoutput', 'csv-file', 'convertCSV', 'message')
 })

 let uploadJSONFile = document.getElementById('json-file')
 uploadJSONFile.addEventListener('change', function (e) {
     readFile(e.target.files[0], 'json', 'json-file', 'JSONinput')
 });


 let uploadCSVFile = document.getElementById('csv-file')
 uploadCSVFile.addEventListener('change', function (e) {
     readFile(e.target.files[0], 'csv', 'csv-file', 'CSVinput')
 });



// file reader
function readFile(file, ext, inputField, outputField) {
let reader = new FileReader()
let extension = file.name.split('.')[1]
if (extension != ext) {
    alert('Please upload only ' + ext + ' files')
    document.getElementById(inputField).value = "";
    return
}
reader.readAsText(file);
reader.onload = function (event) {
    document.getElementById(outputField).value = event.target.result
    if (ext == "json") {
        if (!document.getElementById('convertJSON').classList.containes('hide')) {
        document.getElementById('convertJSON').classList.toggle('hide')
        }
        convertJSON();
    } else if (ext == "csv") {
        if (!document.getElementById('convertCSV').classList.contains('hide')) {
         document.getElementById('convertCSV').classList.toggle('hide')
        }
        convertCSV()
    }
}
}

 

