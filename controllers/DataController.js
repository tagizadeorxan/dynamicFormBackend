const apiResponse = require("../helpers/apiResponse");
const fs = require('fs');



exports.data = [
    (req, res) => {
        fs.readFile('../backend/assets/data.json', (err, data) => {
            if (err) apiResponse.ErrorResponse(res, err);
            data = JSON.parse(data)
            apiResponse.successResponseWithData(res, "success", data)
        })

    }
]

exports.dataChange = [
    (req, res) => {
        let requestData = req.body

        fs.readFile('../backend/assets/data.json', (err, data) => {
            if (err) apiResponse.ErrorResponse(res, err);
            data = JSON.parse(data)
            function editData (arr,requestData) {
              return arr.map(e => {
                  if(e.data_type === 'group') {
                    editData(e.value,requestData)
                    return e
                  } else {
                     let find = requestData.find(r => Number(r.id) === Number(e.uid))
                     if(find) {
                         e.value = find.value
                     }
                     return e
                  }
              })
            }
            let result = editData(data,requestData)
            fs.writeFile("../backend/assets/data.json", JSON.stringify(result), function writeJSON(err) {
                if (err) return apiResponse.ErrorResponse(res, err);;
                console.log('success')
            apiResponse.successResponseWithData(res, "success",result)
              });

            

        })
    }
]