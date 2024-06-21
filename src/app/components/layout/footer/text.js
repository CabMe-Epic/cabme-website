
let recID;
let existingTestId = '';
let userID;
let Name;
let hardcodedemailIdTest = "anushkavaidya04@gmail.com"
let queryStringForUser = `(Email == "${hardcodedemailIdTest}")`;
let dealerId;
let ModelId;
let AllDivision;
let Mobile_1;
let User_Type = '';
let AllDealers;
let filePhotoArray = [];
let fileOthersArray = [];
let existingPhotoArray = [];
let existingDocsArray = [];
let AllModels = [];
let AllProductGroup = [];
let countryData = [];
let locationName;
const currentDatee = new Date().toLocaleDateString('en-CA');

const parts = currentDatee.split('-');
const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
document.getElementById('fFFbrRegDate').textContent = formattedDate;


// let failureDate = document.getElementById('failureDate');
// var currentDate = new Date();
// var maxDate = currentDate.toISOString().split('T')[0];
// failureDate.max = maxDate;

async function getUserData() {

  await ZOHO.CREATOR.init();
  try {
    showLoader();
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    let EditFlag = queryParams.EditFlag;
    if (EditFlag) {
      console.log(EditFlag);
      var inputElement1 = document.getElementById('submit1');
      var parentElement1 = inputElement1.parentNode;
      parentElement1.removeChild(inputElement1);

      var inputElement2 = document.getElementById('showDrafts');
      var parentElement2 = inputElement2.parentNode;
      parentElement2.removeChild(inputElement2);

      var inputElement3 = document.getElementById('reset');
      var parentElement3 = inputElement3.parentNode;
      parentElement3.removeChild(inputElement3);
    }
    var initparams = ZOHO.CREATOR.UTIL.getInitParams();
    console.log(initparams, "SG Initparams");

    let hardcodedemailIdTest = initparams.loginUser;
    // hardcodedemailIdTest='piyush@aarialife.in';
    let queryStringForUser = `(Email == "${hardcodedemailIdTest}")`;

    configOfRegistered_FFBRs = {
      appName: "ffbr",
      reportName: "Users1",
      criteria: queryStringForUser,
    };

    user = await ZOHO.CREATOR.API.getAllRecords(
      configOfRegistered_FFBRs
    );

    console.log(user);
    user = user.data;
    user = await getRecordById(user, 'Users1')
    console.log(user);
    Name = user[0].Name.display_value;
    Mobile_1 = user[0].Mobile_1;
    User_Type = user[0].User_Type.display_value;

    if (User_Type == 'DEALER') {
      initialProductTableForDealer();
    }

    document.getElementById('initiatorContNameInput').value = user[0].Mobile_1;
    document.getElementById('initiatorSpan').textContent = Name;
    configOfdivision = {
      appName: "ffbr",
      reportName: "Divisions1",
    };
    const response = await ZOHO.CREATOR.API.getAllRecords(configOfdivision);
    AllDivision = response;
    populateDivisionOptions(response);
    configOfModels = {
      appName: "ffbr",
      reportName: "Models",
    }
    const count = await ZOHO.CREATOR.API.getRecordCount(configOfModels);
    let totalCount = count.result.records_count;
    console.log(totalCount);

    let j = totalCount / 200 + 1;
    for (let i = 1; i < j; i++) {
      let configOftest_request = {
        appName: "ffbr",
        reportName: "Models",
        page: i,
        pageSize: "200",
      };
      let response = await ZOHO.CREATOR.API.getAllRecords(configOftest_request)
      AllModels = AllModels.concat(response.data);
      document.getElementById('productGroup').disabled = true;
      document.getElementById('productSegment').disabled = true;
      document.getElementById('productSubCategory').disabled = true;
    }
    hideLoader();

    console.log(Name, "Name ")
  } catch (err) {
    hideLoader();
    console.log(err)
  }



}



async function populateDivisionOptions(response) {
  const divisionSelect = document.getElementById("division");
  divisionSelect.innerHTML = ""; // Clear existing options

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select Classification";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.hidden = true;
  divisionSelect.appendChild(defaultOption);

  const classification = document.querySelector('input[name="dome"]:checked');

  if (classification && classification.value != 'Domestic') {
    divisionSelect.disabled = false;
    const divisions = response.data.filter(item => item.Classification === classification.value);
    divisions.forEach(item => {
      const option = document.createElement("option");
      option.value = item.ID;
      option.textContent = item.Division_Name;
      divisionSelect.appendChild(option);
    });
  } else {
    divisionSelect.disabled = true;
  }
}
const radioButtons = document.querySelectorAll('input[name="dome"]');
radioButtons.forEach(button => {
  console.log(button)
  button.addEventListener('change', async function () {
    populateDivisionOptions(AllDivision);
    if (button.value == "Export") {
      configLocation = {
        reportName: 'All_Countries'
      }
      const res = await ZOHO.CREATOR.API.getAllRecords(configLocation);
      console.log(res.data);
      countryData = res.data;
      const inputElement = document.getElementById('location');
      inputElement.oninput = filterLocation;
    } else {
      const inputElement = document.getElementById('location');
      inputElement.oninput = null;

    }
  });
});
function setMaxDate() {
  let currentDate = new Date().toISOString().split('T')[0];
  document.getElementById('deliveryDate').max = currentDate;
  document.getElementById('commissioningDate').max = currentDate;
  document.getElementById('manufactoringDate').max = currentDate;
}

function addProductRow(check) {
  let quantityAffected = document.getElementById('quantityAffected').value;
  let table = document.getElementById('productDetailsTable');
  let row = table.rows.length;


  var lastRow = table.rows[table.rows.length - 2];
  console.log(lastRow);
  var commisionDate = lastRow.cells[3].querySelector('input').value;
  var manufactoringDate = lastRow.cells[4].querySelector('input').value;
  if (check) {
    if (manufactoringDate == '') {
      alert('Failure Date is mandatory to add new row');
      return;
    }
    if (commisionDate == '') {
      alert('Commision Date is mandatory to Add new row');
      return;
    }
  }
  if (check) {
    var productSerialNo = lastRow.cells[1].querySelector('input').value;
    if (productSerialNo.length < 6 || productSerialNo.length > 30) {
      alert('Serial No. can have minimum 6 Character and maximum 30 Character')
      return;
    }
  }


  if (quantityAffected === '') quantityAffected = 0;
  if (quantityAffected > row - 2) {


    var newRow = table.insertRow(table.rows.length - 1); // Insert above the last row
    var serialCell = newRow.insertCell(0);
    var productSerialCell = newRow.insertCell(1);
    var deliveryDateCell = newRow.insertCell(2);
    var commissioningDateCell = newRow.insertCell(3);
    var manufacturingDateCell;
    var removeCell;
    setMaxDate();
    if (User_Type != 'DEALER') {
      manufacturingDateCell = newRow.insertCell(4);
      removeCell = newRow.insertCell(5);
    } else {
      removeCell = newRow.insertCell(4);
    }

    serialCell.innerHTML = table.rows.length - 2;
    productSerialCell.innerHTML = '<input type="text" name="productSerialNo" required>';
    deliveryDateCell.innerHTML = '<input type="date" class="deliveryDate" name="deliveryDate"  onclick="setDate(this.closest(`tr`))" oninput="setDateConstraints(this.closest(`tr`))" >';
    commissioningDateCell.innerHTML = '<input type="date" class="commissioningDate" onclick="setDate(this.closest(`tr`))"  name="commissioningDate" required>';
    if (User_Type != 'DEALER') {
      manufacturingDateCell.innerHTML = '<input type="date" class="manufactoringDate" onclick="setDate(this.closest(`tr`))" name="manufactoringDate" required>';
    }

    removeCell.innerHTML = '<a href="#" class="edit" onclick="editRow(this)">Edit</a><a href="#" class="remove" onclick="removeRow(this)">Remove</a>';

    // Add cells to the new row

  } else {
    alert('Please Insert Valid Quantity First')
  }
}







var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
console.log(queryParams);


var myForm = document.querySelector('form');

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
});


function checkAllFieldsInDocument() {
  // Select all input and select elements (excluding disabled ones)
  var allFields = document.querySelectorAll('input[required]:not([disabled]), select[required]:not([disabled]), textarea[required]:not([disabled])');

  for (var i = 0; i < allFields.length; i++) {
    var field = allFields[i];

    // Check if the field value is empty
    if (field.value.trim() === '') {
      alert('Please fill in all fields.');
      console.log(field);
      return false;
    }

  }
  return true;
}
function formatDate(dateString) {
  if (dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  return null;
}
async function submitData(status) {

  if (!checkAllFieldsInDocument()) {
    return;
  }
  if (EditMode == false) {
    if (fileOthersArray.length == 0 || filePhotoArray.length == 0) {
      alert('Attachment Files are mandatory');
      return;
    }
  }



  let Obligation = document.getElementById('obligation').value;
  let Product_Sub_Category = document.getElementById('productSubCategory').value;
  let Initiator_Contact_Number = document.getElementById('initiatorContNameInput').value;
  let Initiator_Name = document.getElementById('initiatorContNameInput').value;
  let Divisions = document.getElementById('division').value;
  let manufactoringDate = document.getElementById('manufactoringDate')

  if (manufactoringDate.value == '') {
    alert('Please Select the Manufactoring Date');
    return;
  }

  const domesticRadio = document.getElementById('domestic');
  const exportRadio = document.getElementById('export');

  if (!domesticRadio.checked && !exportRadio.checked) {
    alert('Please select either Domestic or Export.');
    return;
  }


  let table = document.getElementById('productDetailsTable');
  var lastRow = table.rows[table.rows.length - 2];
  var productSerialNo = lastRow.cells[1].querySelector('input').value;
  if (productSerialNo.length < 6 || productSerialNo.length > 30) {
    alert('Serial No. can have minimum 6 Character and maximum 30 Character')
    return;
  }


  let Dealer_Id_Name = dealerId;
  let Quantity_Affected = document.getElementById('quantityAffected').value;
  let Model_Number = ModelId;
  // let Model_Number=3453453453;
  let Manufacture_at = document.getElementById('manufactureat').value;
  if (Manufacture_at == 'undefined') {
    Manufacture_at = null;
  }

  let FFBR_Category_Defect = document.getElementById('ffbrCategory').value;
  let Customer_Name = document.getElementById('coustomerName').value;
  let Additional_Info = document.getElementById('addiionalInfo').value;
  const radioButtons = document.querySelectorAll('input[name="dome"]');
  console.log(radioButtons, "Location")
  let Location = document.getElementById("location").value;
  // if(document.getElementById("export").checked){
  //   let Location = locationName;

  // }
  // else{
  //   Location = locationElement.value;

  // }

  //   console.log(Location, "Location");
  //   console.log(locationElement, "Location")
  //  alert(locationName)
  // radioButtons.forEach(button => {
  //   console.log(button)
  //   if (button.value == "Export") {
  //     Location = locationName;
  //   } else {
  //     Location = document.getElementById('location').value;
  //   }
  // });
  // let Failure_Date = document.getElementById('failureDate').value;
  let Failed_Component = document.getElementById('failedPart').value;
  let Component_Model = document.getElementById('componentModel').value;
  let Component_Make = document.getElementById('componentMake').value;
  let Serial_Number_of_Failed_Part = document.getElementById('serialNo').value;
  let Observation_of_Dealer_SDE = document.getElementById('ObservationDealer').value;
  let Action_Taken_on_Failure = document.getElementById('actionTakenFailure').value;

  let Field_visit_required_by_factory_R_D_Service = getRadioVal('fieldVisitYes', 'fieldVisitNo');

  let Failed_part_sent_to_factory = getRadioVal('failedPartYes', 'failedPartNo');



  let Docket_No = document.getElementById('docketNo').value;
  let Additional_Information = document.getElementById('addiInfo').value;
  let Ticket_No = document.getElementById('ticketNo').value;
  let Preliminary_Root_Cause_analysis = document.getElementById('preliminaryRoot').value;
  let Product_Group = document.getElementById('productGroup').value;
  let Product_Segment = document.getElementById('productSegment').value;
  let productSegmentText = getSelectedText('productSegment')
  let Nature_of_Problem = document.getElementById('natureOfProblem').value;

  let FFBR_Classification
  if (document.getElementById('domestic').checked) {
    FFBR_Classification = document.getElementById('domestic').value;
  } else if (document.getElementById('export').checked) {
    FFBR_Classification = document.getElementById('export').value;
  }

  let Coil_Type = document.getElementById('coilType').value;
  let Chassis_Type = document.getElementById('chassisType').value;


  const today = new Date();
  const isoDateString = today.toISOString().split('T')[0].replace(/-/g, '');
  console.log(isoDateString, "formattedDate");



  let Registration_Date_of_FFBR = formattedDate;

  console.log(Registration_Date_of_FFBR, "Registration_Date_of_FFBR")




  let attachmentPhoto = document.getElementById('attachmentPhoto').files[0];
  let attachmentOtherDoc = document.getElementById('attachmentOtherDoc').files[0];
  let Model_Number_Other;
  if (ModelId?.length > 0) {
    Model_Number_Other = '';
  } else {
    if (document.getElementById('EntermodelNoInput').value.length <= 0) {
      alert("Enter Model Number");
      return;
    } else {
      Model_Number_Other = document.getElementById('EntermodelNoInput').value;
    }

  }


  // let personName=document.getElementById('personName').value;
  // let emailId=document.getElementById('emailId').value;


  let Products;
  if (User_Type == 'DEALER') {
    Products = getTableData(document.getElementById('productDetailsTable'), ['Serial_No', 'Product_Serial_No', 'Delivery_Date', 'Commissioning_Date']);
    Products.forEach(product => {
      product.Delivery_Date = formatDate(product.Delivery_Date);
      product.Commissioning_Date = formatDate(product.Commissioning_Date);
    });
  } else {
    Products = getTableData(document.getElementById('productDetailsTable'), ['Serial_No', 'Product_Serial_No', 'Delivery_Date', 'Commissioning_Date', 'Failure_Date']);
    Products.forEach(product => {
      product.Delivery_Date = formatDate(product.Delivery_Date);
      product.Commissioning_Date = formatDate(product.Commissioning_Date);
      product.Failure_Date = formatDate(product.Failure_Date);
    });
  }

  let Mark_CC_of_FFBR_To = getTableData(document.getElementById('personTable'), ['S_No', 'Person_Name', 'Email']);
  if (!validateEmails(Mark_CC_of_FFBR_To)) {
    return;
  }
  console.log(Quantity_Affected + ' ' + Products.length);
  if (Quantity_Affected != Products.length) {
    alert('Quantity Effected shhould be equal to the Number of Products Entered');
    return;
  }


  // let hardcodedemailIdTest = "sneha.rai.sr4@gmail.com" 
  // let queryString=`(Email == "${hardcodedemailIdTest}")`;
  // let modifiedQueryString = queryString.trim(); // Remove leading and trailing whitespaces
  // modifiedQueryString = modifiedQueryString.slice(0, -5); // Remove the last '&&'

  // configOfRegistered_FFBRs = {
  //   appName: "ffbr",
  //   reportName: "Users1",
  //   criteria: queryString,
  // };

  // user = await ZOHO.CREATOR.API.getAllRecords(
  //   configOfRegistered_FFBRs
  // );

  // console.log(user);

  //   user=user.data;


  Initiator_Name = user[0].ID

  // if (user[0].User_Type?.display_value == "Dealer") {
  //   Dealer_Id_Name = user[0].Dealer_Id_Name
  //   document.getElementById('dealerId').value = Dealer_Id_Name;
  // }




  FFBR_Status = status
  let obj = {
    Divisions,
    Model_Number_Other,
    Manufacture_at,
    Obligation,
    Product_Sub_Category,
    Registration_Date_of_FFBR,
    Initiator_Contact_Number,
    Initiator_Name,
    Dealer_Id_Name,
    Quantity_Affected,
    Model_Number,
    Products,
    Customer_Name,
    Additional_Info,
    Location,
    FFBR_Category_Defect,
    Failed_Component,
    Component_Model,
    Component_Make,
    Serial_Number_of_Failed_Part,
    Observation_of_Dealer_SDE,
    Action_Taken_on_Failure,
    Field_visit_required_by_factory_R_D_Service,
    Failed_part_sent_to_factory,
    Docket_No,
    Additional_Information,
    Ticket_No,
    Preliminary_Root_Cause_analysis,
    FFBR_Classification,
    Coil_Type,
    Chassis_Type,
    Mark_CC_of_FFBR_To,
    Product_Group,
    Product_Segment,
    Nature_of_Problem,
    FFBR_Status

  };


  let formData = {
    "data": {}
  };

  formData.data = obj;
  console.log(obj);
  // openPopup();

  let response;
  let ID;

  try {
    if (existingTestId === '') {
      config = {
        appName: "ffbr",
        formName: "Register_FFBR",
        data: formData
      }
      //add record API
      response = await ZOHO.CREATOR.API.addRecord(config)
      response = response.data;
      console.log(response);
      ID = response.ID;
    } else {
      config = {
        appName: "ffbr",
        reportName: 'Registered_FFBRs',
        id: existingTestId,
        data: formData
      }

      //update record API
      response = await ZOHO.CREATOR.API.updateRecord(config)
      response = response.data;
      ID = response.ID;
    }
  } catch (err) {
    console.log(err);
  }



  console.log(response);


  try {

    let i = 1;
    if (existingPhotoArray && existingPhotoArray.length != 0) {
      i = existingPhotoArray.length + 1;
    }
    console.log(filePhotoArray);
    filePhotoArray.forEach(async el => {
      let attachmentData = {
        Register_FFBR_Link: ID,
        S_No: i++,
      }
      let attachmentform = {};
      attachmentform.data = attachmentData
      config = {
        appName: 'ffbr',
        formName: "FFBR_Attachments_Subform",
        data: attachmentform,
      }
      console.log("before calling API FFBR_Attachments_Subform", config);

      let res = await ZOHO.CREATOR.API.addRecord(config);
      console.log("before getting response from API FFBR_Attachments_Subform", res);

      res = res.data;
      console.log("before calling API FFBR_Attachments_Subform", res);

      let subformID = res.ID;

      config = {
        appName: 'ffbr',
        reportName: "FFBR_Attachments_Report",
        id: subformID,
        fieldName: "Files",
        file: el.Attachment,
      };

      var data = await ZOHO.CREATOR.API.uploadFile(config);
      console.log(data);

    })


    i = 1;
    if (existingDocsArray && existingDocsArray.length != 0) {
      i = existingDocsArray.length + 1;
    }
    fileOthersArray.forEach(async el => {


      let attachmentData = {
        Register_FFBR_Link: ID,
        S_No: i++,
      }



      let attachmentform = {};
      attachmentform.data = attachmentData
      config = {
        appName: 'ffbr',
        formName: "FFBR_Docs_Subform",
        data: attachmentform,
      }
      console.log("before calling API FFBR_Docs_Subform", config);

      let res = await ZOHO.CREATOR.API.addRecord(config);
      console.log("before getting response from API FFBR_Docs_Subform", res);

      res = res.data;
      console.log("before calling API FFBR_Docs_Subform", res);
      let subformID = res.ID;




      config = {
        appName: 'ffbr',
        reportName: "FFBR_Docs_Subform_Report",
        id: subformID,
        fieldName: "File_Upload",
        file: el.Attachment,
      };

      var data = await ZOHO.CREATOR.API.uploadFile(config);
      console.log(data);
      window.location.reload();

    })


    alert('SuccessFully Registered');
    var referrer = document.referrer;

    // Extract the fragment identifier from the URL
    var fragment = window.location.hash;
    
    // Append the fragment identifier to the referring URL if it exists
    if (fragment && referrer) {
        referrer += fragment;
    }

    // const previousURL = document.referrer;
    alert(referrer+fragment);
    await ZOHO.CREATOR.init().then(async function () {
      var param =
      {
      action: "open",
      url: "https://creatorapp.zoho.in/bluestarindia/ffbr#Page:Track_My_FFBR2",
      window: "same"
      };
      await ZOHO.CREATOR.UTIL.navigateParentURL(param);
    });


    console.log(EditMode);
    await ZOHO.CREATOR.init().then(function () {
      var param = { action: "closeall" };
      ZOHO.CREATOR.UTIL.navigateParentURL(param);
    });







    // config = {
    //   appName: "ffbr",
    //   reportName: "Registered_FFBRs",
    //   id: ID,
    //   fieldName: "Attachment_of_Photographs",
    //   file: attachmentPhoto
    // }




    // var data = await ZOHO.CREATOR.API.uploadFile(config)
    // console.log(data);

    // config = {
    //   appName: "ffbr",
    //   reportName: "Registered_FFBRs",
    //   id: ID,
    //   fieldName: "Other_Documents_Attachments",
    //   // parentId:ID,
    //   file: attachmentOtherDoc
    // }

    // //upload file API
    // var data = await ZOHO.CREATOR.API.uploadFile(config)
    // console.log(data);
  } catch (err) {
    console.log(err);
    window.location.reload();
  }








}


async function removeDraftRecord(buttonElement, id) {
  let row = buttonElement.closest('tr');
  let query = `(ID == "${id}")`;
  row.remove();
  config = {
    appName: 'ffbr',
    reportName: "Registered_FFBRs",
    criteria: query
  }

  await ZOHO.CREATOR.API.deleteRecord(config).then(function (response) {
    console.log(response);
  });
  alert('Successfully Removed Draft');



}


async function getRecordById(regFfbrData, reportName) {


  const regFbbrID = [];
  let dataArr = [];
  console.log(regFfbrData);
  regFfbrData.forEach((el) => {
    regFbbrID.push(el.ID);
  });

  for (let i = 0; i < regFbbrID.length; i++) {
    const regFbbrIDdata = {
      appName: "ffbr",
      reportName: reportName,
      id: regFbbrID[i],
    };

    const singleUserData = await ZOHO.CREATOR.API.getRecordById(regFbbrIDdata);
    dataArr.push(singleUserData.data);
    console.log('dataArr' + singleUserData.data)
  }
  return dataArr;
}

function getRadioVal(radio1, radio2) {
  let val;

  let rad1 = document.getElementById(radio1);
  let rad2 = document.getElementById(radio2);

  if (rad1.checked) {
    val = rad1.value;
  } else if (rad2.checked) {
    val = rad2.value;
  }

  return val;
}

function getSelectedText(id) {
  var selectElement = document.getElementById(id);
  var selectedIndex = selectElement.selectedIndex;
  return selectElement.options[selectedIndex].text;
}


function validateFileUpload(fileInput, allowedTypes) {
  if (allowedTypes.length <= 0) {
    return;
  }
  if (fileInput.files.length > 0) {
    var fileType = fileInput.files[0].type;

    if (allowedTypes.indexOf(fileType) === -1) {
      alert(`Only ${allowedTypes.join(', ')}`);
      fileInput.value = '';
    }
  }
}



function getTableData(table, keys) {
  var tbody = table.getElementsByTagName('tbody')[0];
  var rows = tbody.getElementsByTagName('tr');
  var rowDataArray = [];

  // Define the keys you want to use

  for (var i = 0; i < rows.length - 1; i++) {
    var cells = rows[i].getElementsByTagName('td');
    var rowData = {};

    for (var j = 0; j < cells.length && j < keys.length; j++) {
      if (j === 0) {
        rowData[keys[j]] = i + 1;
      } else {
        var inputs = cells[j].getElementsByTagName('input');
        if (inputs.length > 0) {
          // Use predefined keys for other columns
          rowData[keys[j]] = inputs[0].value;
        }
      }
    }

    rowDataArray.push(rowData);
  }

  console.log("sadsadadsad", rowDataArray);
  return rowDataArray;
}


async function populateProductSegment() {
  //   for Product_Segments1
  let divisionSelect = document.getElementById("productSegment");
  divisionSelect.innerHTML = '<option value="">Select</option>';

  // let model = document.getElementById("modelNumber");
  // model.innerHTML = '<option value="">Other</option>';
  // document.getElementById('modelNoInput').disabled = false;

  let productSubCategory = document.getElementById("productSubCategory");
  productSubCategory.innerHTML = '<option value="">Select</option>';



  let queryString = "(";


  document.getElementById("productGroup").value !== "" &&
    document.getElementById("productGroup").value !== "All"
    ? (queryString += `Product_Group == ${BigInt(document.getElementById("productGroup").value)} && `)
    : null;

  queryString += ")";

  let modifiedQueryString = queryString.trim(); // Remove leading and trailing whitespaces
  modifiedQueryString = modifiedQueryString.slice(0, -5); // Remove the last '&&'
  modifiedQueryString += ")";

  config_New = {
    appName:"ffbr",
    reportName: "Product_Segments1",
    criteria: modifiedQueryString.trim(),
  };



  try {
    await ZOHO.CREATOR.API.getAllRecords(config_New)
      .then(function (response) {
        // callback block
        divisionSelect.innerHTML = '';

        console.log("Product_Segment ", response);
        const data = response.data;
        console.log(data);
        // Loop through the data and create options
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.ID;
          option.textContent = item.Product_Segment;
          divisionSelect.appendChild(option);
        });
      })
  } catch (err) {
    console.log(err);
  }

  // config_New = {
  //   reportName: "Models",
  //   criteria: modifiedQueryString.trim(),
  // };



  // try {
  //   await ZOHO.CREATOR.API.getAllRecords(config_New)
  //     .then(function (response) {
  //       // callback block

  //       console.log("Model ", response);
  //       const data = response.data;
  //       console.log(data);
  //       // Loop through the data and create options
  //       data.forEach((item) => {
  //         const option = document.createElement("option");
  //         option.value = item.ID;
  //         option.textContent = item.Model;
  //         model.appendChild(option);
  //       });
  //     })
  // } catch (err) {
  //   console.log(err);
  // }


  // let query = `(Product_Groups1 == ${document.getElementById('productGroup').value})`;
  // config_New = {
  //   reportName: "Product_Sub_Categories",
  //   criteria: query,
  // };



  // try {
  //   await ZOHO.CREATOR.API.getAllRecords(config_New)
  //     .then(function (response) {
  //       // callback block

  //       console.log("productSubCategory ", response);
  //       const data = response.data;
  //       console.log(data);
  //       // Loop through the data and create options
  //       data.forEach((item) => {
  //         const option = document.createElement("option");
  //         option.value = item.ID;
  //         option.textContent = item.Product_Sub_Category;
  //         productSubCategory.appendChild(option);
  //       });
  //     })
  // } catch (err) {
  //   console.log(err);
  // }





}

async function populateProductSubcat() {
  let query = `(Product_Groups1 == ${document.getElementById('productGroup').value} && Product_Segments == ${document.getElementById('productSegment').value})`;
  config_New = {
    reportName: "Product_Sub_Categories",
    criteria: query,
  };

  try {
    await ZOHO.CREATOR.API.getAllRecords(config_New)
      .then(function (response) {
        // callback block
        productSubCategory.innerHTML = '';
        console.log("productSubCategory ", response);
        const data = response.data;
        console.log(data);
        // Loop through the data and create options
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.ID;
          option.textContent = item.Product_Sub_Category;
          productSubCategory.appendChild(option);
        });
      })
  } catch (err) {
    console.log(err);
  }
}



// async function populateDataBasedOnModelName() {
//   let modelNoInput = document.getElementById('modelNoInput');
//   let modelNoSelect = document.getElementById('modelNumber');
//   if (modelNoSelect.value == '') {
//     modelNoInput.disabled = false;
//     document.getElementById('coilType').value = '';
//     document.getElementById('chassisType').value = '';
//     return ;
//   } else {
//     modelNoInput.value = '';
//     modelNoInput.disabled = true;
//   }

//   let modelNumber = document.getElementById('modelNumber').value;

//   document.getElementById('coilType').value = '';
//   document.getElementById('chassisType').value = '';

//   configOfRegistered_FFBRs = {
//     appName: "ffbr",
//     reportName: "Models",
//     id: `${modelNumber}`
//   };

//   await ZOHO.CREATOR.API.getRecordById(configOfRegistered_FFBRs).then(response => {
//     response = response.data;

//     console.log(response);

//     // const divisionSelect = document.getElementById("manufactureat");
//     // console.log("Product_Groups ", response);
//     // const option = document.createElement("option");
//     // option.value = response.Manufacture_At.ID;
//     // option.textContent = response.Manufacture_At.display_value;
//     // divisionSelect.appendChild(option);
//     // document.getElementById('manufactureat').value = response.Manufacture_At.ID;
//     populateDropdownAndSelect(response.Manufacture_At.display_value);
//     document.getElementById('coilType').value = response.Coil_Type;
//     document.getElementById('chassisType').value = response.Chassis_Type;
//   })
// }

async function populateDataBasedOnModelNameEdit(obj) {
  document.getElementById('EntermodelNoInput').value = obj.Model_Number.display_value;
}

async function populateDataBasedOnModelName(model) {
  console.log(model);
  if (model == "other") {
    // const selectElement = document.getElementById('modelNumber');
    // selectElement.innerHTML = '';
    // const option = document.createElement('option');
    // option.value = '';
    // option.textContent = "Other";
    // selectElement.appendChild(option);
    // document.getElementById('modelNumber').disabled = true;
    // document.getElementById('modelNumber').disabled = false;
    document.getElementById('EntermodelNoInput').value = '';
    document.getElementById('EntermodelNoInput').disabled = false;
    document.getElementById('productGroup').disabled = false;
    document.getElementById('productSegment').disabled = false;
    document.getElementById('manufactureat').disabled = false;
    document.getElementById('productSubCategory').disabled = false;
    const productGroupElement = document.getElementById('productGroup');
    const productSegmentElement = document.getElementById('productSegment');
    const productSubCatElement = document.getElementById('productSubCategory');
    const manufactureElement = document.getElementById('manufactureat');
    ModelId = '';
    const coilElement = document.getElementById('coilType');
    const chasisElement = document.getElementById('chassisType');
    chasisElement.value = '';
    coilElement.value = '';
    productGroupElement.innerHTML = '<option value="">Select</option>';
    productSegmentElement.innerHTML = '<option value="">Select</option>';
    productSubCatElement.innerHTML = '<option value="">Select</option>';
    manufactureElement.innerHTML =  '<option value="">Select</option>';

    const divisionSelect = document.getElementById("productGroup");
    AllProductGroup.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.ID;
      option.textContent = item.Product_Group_Name;
      divisionSelect.appendChild(option);
    });
    const manDivision = document.getElementById('manufactureat');
    plantData.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.ID;
      option.textContent = item.Plant_Name;
      manDivision.appendChild(option);
    });

  } else {
    // const selectElement = document.getElementById('modelNumber');
    const productGroupElement = document.getElementById('productGroup');
    const productSegmentElement = document.getElementById('productSegment');
    const productSubCatElement = document.getElementById('productSubCategory');
    const manufactureElement = document.getElementById('manufactureat');
    const coilElement = document.getElementById('coilType');
    const chasisElement = document.getElementById('chassisType');


    // selectElement.innerHTML = '';
    // const option = document.createElement('option');
    // option.value = model.ID;
    // option.textContent = model.Model;
    document.getElementById('EntermodelNoInput').value = model.Model;
    document.getElementById('EntermodelNoInput').disabled = true;
    ModelId = model.ID;

    coilElement.value = model.Coil_Type || "";
    chasisElement.value = model.Chassis_Type || "";

    productGroupElement.innerHTML = '';
    const optionProductroup = document.createElement('option');
    optionProductroup.value = model.Product_Group.ID;
    optionProductroup.textContent = model.Product_Group.display_value;

    productSegmentElement.innerHTML = '';
    const optionproductSegment = document.createElement('option');
    optionproductSegment.value = model.Product_Segment.ID;
    optionproductSegment.textContent = model.Product_Segment.display_value;


    manufactureElement.innerHTML = '';
    const optionManufactureSegment = document.createElement('option');
    optionManufactureSegment.value = model.Manufacture_At.ID;
    optionManufactureSegment.textContent = model.Manufacture_At.display_value;

    productSubCatElement.innerHTML = '';
    const optionproductSubCat = document.createElement('option');
    optionproductSubCat.value = model.Product_Sub_Category;
    optionproductSubCat.textContent = model.Product_Sub_Category;

    // selectElement.appendChild(option);
    productGroupElement.appendChild(optionProductroup);
    manufactureElement.appendChild(optionManufactureSegment);
    productSegmentElement.appendChild(optionproductSegment);
    productSubCatElement.appendChild(optionproductSubCat);

    // document.getElementById('modelNumber').disabled = true;
    document.getElementById('productGroup').disabled = true;
    document.getElementById('productSegment').disabled = true;
    document.getElementById('manufactureat').disabled = true;
    document.getElementById('productSubCategory').disabled = true;
    document.getElementById('coilElement').disabled = true;
    document.getElementById('chasisElement').disabled = true;
  }

}

config = {

  reportName: "Registered_FFBRs",
};

let dealerList = [];

// async function getDealerDetails() {

//   const dealerName = document.getElementById("dealerId").value;
//   console.log(dealerName, "hello");
//   // if (dealerList?.data[0]?.Dealer_Code === dealerName) {
//   //   document.getElementById("dealerList").innerHTML = dealerList.data[0].Name;
//   // }
//   // else {
//   //   document.getElementById("dealerList").innerHTML = "Not match";

//   // }


//   let filteredDealerList = dealerList.filter(dealer => {
//     // Convert both strings to lowercase to make the search case-insensitive
//     const input = document.getElementById("dealerId").value;
//     const dealerId = dealer.Dealer_Code;
//     const dealerName = dealer.Name;
//     // Check if either the dealer_id or dealer_name contains the input string
//     return dealerId==input || dealerName==input;
//   });
//   console.log('filteredDealerList Checksg ',filteredDealerList);
//   // dealerId=filteredDealerList[0].ID;
//   // console.log('dealerId'+dealerId);


//   let inputElement = document.getElementById("dealerId");
//   let dealerNameInput = inputElement.value;


//   console.log("dealerNameInput", filteredDealerList);

//   //new code
// const ulElement = document.getElementById("dealerList");
// // Clear previous results
// ulElement.innerHTML = '';

//   // Check if there are any dealers in the filtered list
//   if (filteredDealerList.length > 0) {
//     // Iterate through the filteredDealerList and append each dealer as a list item
//     filteredDealerList.forEach(dealer => {
//       const liElement = document.createElement("li");
//       liElement.textContent = dealer.Name; // Or any other format you prefer
//       dealerId = dealer.ID
//       ulElement.appendChild(liElement);
//     });
//   } else {
// 	dealerId = ""
//     // If no dealers were found, show a message
//     ulElement.innerHTML = '<li>No dealers found.</li>';
//   }

//   // if (dealerList.data[0].Dealer_Code == dealerNameInput) {
//   //   document.getElementById("dealerList").innerHTML = dealerList.data[0].Name;
//   // }
//   // else {
//   //   document.getElementById("dealerList").innerHTML = 'Not Matched';
//   // }
// }

function failedDisable(){
  if(document.getElementById('domestic').checked && document.getElementById('obligation').value === 'Warranty'){
    document.getElementById('failedPart').disabled = true;
    const target = document.getElementById("setMandatory");
    target.className = "";
    target.innerText = "";
    const targetReq = document.getElementById("failedPart");
    targetReq.setAttribute("required", false);
  }else{
    document.getElementById('failedPart').disabled = false;
    const target = document.getElementById("setMandatory");
    target.className = "required";
    target.innerText = "*";
    const targetReq = document.getElementById("failedPart");
    targetReq.removeAttribute("required");
  }
}

function filterDealers() {
  // Get the input value
  let inputValue = document.getElementById("dealerId").value.toLowerCase();

  let resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = '';

  // Filter the dealers based on input value
  if (inputValue === '') {
    return;
  }
  const ulElement = document.getElementById("dealerList");
  ulElement.innerHTML = '';

  let filteredDealers = dealerList.filter(function (dealer) {
    return dealer.Name.toLowerCase().includes(inputValue) || dealer.Dealer_Code.toLowerCase().includes(inputValue);
  });
  if (filteredDealers.length > 0) {
    filteredDealers.forEach(function (dealer) {
      let dealerDiv = document.createElement("div");
      dealerDiv.textContent = dealer.Name;
      const liElement = document.createElement("li");
      liElement.textContent = dealer.Name;
      dealerDiv.addEventListener('click', function () {
        document.getElementById("dealerId").value = dealer.Name;
        dealerId = dealer.ID
        const liElement = document.createElement("li");
        liElement.textContent = dealer.Name;
        ulElement.appendChild(liElement);
        resultsContainer.innerHTML = '';
      });
      resultsContainer.appendChild(dealerDiv);
    });
  } else {
    dealerId = ""
    ulElement.innerHTML = '<li>No dealers found.</li>';
  }

}

function filterLocation() {
  let inputValue = document.getElementById("location").value.toLowerCase();

  let resultsContainer = document.getElementById("resultsLocation");
  resultsContainer.innerHTML = '';

  if (inputValue === '') {
    return;
  }
  const ulElement = document.getElementById("locationlist");

  let filteredDealers = countryData.filter(function (location) {
    return location.Country.toLowerCase().includes(inputValue);
  });
  if (filteredDealers.length > 0) {
    filteredDealers.forEach(function (dealer) {
      let dealerDiv = document.createElement("div");
      dealerDiv.textContent = dealer.Country;

      dealerDiv.addEventListener('click', function () {
        document.getElementById("location").value = dealer.Country;
        locationName = dealer.Country;

        ulElement.textContent = locationName;


        resultsContainer.innerHTML = '';
      });
      resultsContainer.appendChild(dealerDiv);
    });
  } else {

  }
}
let EditMode = false;
function filterModels() {
  let inputValue = document.getElementById("modelNoInput").value.toLowerCase();

  let resultsContainer = document.getElementById("resultsModels");
  resultsContainer.innerHTML = '';
  resultsContainer.style.display = 'block';

  if (inputValue === '') {
    return;
  }

  let filteredDealers = AllModels.filter(function (model) {
    return model.Model.toLowerCase().includes(inputValue);
  });
  if (filteredDealers.length > 0) {
    filteredDealers.forEach(function (dealer) {
      let dealerDiv = document.createElement("div");
      dealerDiv.textContent = dealer.Model;

      dealerDiv.addEventListener('click', function () {
        ModelId = dealer.ID;
        document.getElementById("modelNoInput").value = dealer.Model;
        populateDataBasedOnModelName(dealer);

        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
      });
      resultsContainer.appendChild(dealerDiv);
    });
  } else {
    let dealerDiv = document.createElement("div");
    dealerDiv.textContent = "Other";
    dealerDiv.addEventListener('click', function () {
      ModelId = '';
      document.getElementById("modelNoInput").value = "other";
      populateDataBasedOnModelName("other");
      resultsContainer.style.display = 'none';
      resultsContainer.innerHTML = '';
    });
    resultsContainer.appendChild(dealerDiv);
  }
}

function customToLowerCase(inputString) {
  return inputString.split('').map(char => char.match(/[a-zA-Z]/) ? char.toLowerCase() : char).join('');
}

ZOHO.CREATOR.init().then(async function (data) {
  showLoader();

  configOfRegistered_FFBRs = {
    appName: "ffbr",
    reportName: "Dealers",
  };


  let count = await ZOHO.CREATOR.API.getRecordCount(configOfRegistered_FFBRs)
  let totalCount = count.result.records_count;



  let j = (totalCount / 100) + 1;
  if (totalCount % 2 != 0) {
    j++;
  }
  let initialPage = 1;
  for (let i = 1; i <= j; i++) {
    config = {
      appName:"ffbr",
      reportName: 'Dealers',
      page: i,
      pageSize: 100,
    };
    let response = await ZOHO.CREATOR.API.getAllRecords(config)
    const data = response.data;
    dealerList = dealerList.concat(data);
    console.log("dealerList", dealerList);
  }
  await populateDropdownAndSelect("");



  // dealerList = await ZOHO.CREATOR.API.getAllRecords(
  //   configOfRegistered_FFBRs
  // )

  console.log({ dealerList }, "suraj");



  const { reportName } = config;
  await ZOHO.CREATOR.API.getAllRecords({reportName})
    .then(async function (response) {
      configOfProduct_Groups = {
        appName:"ffbr",
        reportName: "Product_Groups",
      };

      configOfComplaint_Types = {
        appName:"ffbr",
        reportName: "Complaint_Types",
      };

      configOfProduct_Sub_Categories = {
        appName:"ffbr",
        reportName: "Product_Sub_Categories",
      };
      configOfPlants = {
        appName:"ffbr",
        reportName: "Plants1"
      }

      await ZOHO.CREATOR.API.getAllRecords(configOfProduct_Groups).then(function (
        response
      ) {
        //callback block
        const divisionSelect = document.getElementById("productGroup");
        console.log("Product_Groups ", response);
        const data = response.data;
        AllProductGroup = data;
        // Loop through the data and create options
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.ID;
          option.textContent = item.Product_Group_Name;
          divisionSelect.appendChild(option);
        });
      });
      // await ZOHO.CREATOR.API.getAllRecords(configOfPlants).then(function (
      //   response
      // ) {
      //   //callback block
      //   const divisionSelect = document.getElementById("manufactureat");
      //   const data = response.data;
      //   data.forEach((item) => {
      //     const option = document.createElement("option");
      //     option.value = item.ID;
      //     option.textContent = item.Plant_Name;
      //     divisionSelect.appendChild(option);
      //   });
      // });





      await ZOHO.CREATOR.API.getAllRecords(configOfComplaint_Types).then(function (
        response
      ) {
        const divisionSelect = document.getElementById("natureOfProblem");
        console.log("Complaint_Types ", response);
        const data = response.data;
        divisionSelect.innerHTML = "";
        const initialOption = document.createElement("option");
        initialOption.value = "";
        initialOption.textContent = "Select";
        divisionSelect.appendChild(initialOption);
        // Loop through the data and create options based on the selected value
        data.forEach((item) => {
          //   if (selectedValue === "All" || item.Complaint_Type === selectedValue) {
          const option = document.createElement("option");
          option.value = item.ID;
          option.textContent = item.Complaint_Description;
          // console.log("option.value", option.value);
          divisionSelect.appendChild(option);
          //   }
        });
      });




      configOfRegistered_FFBRs = {
        appName: "ffbr",
        reportName: "Failed_Parts",
      };

      // failed_records = await ZOHO.CREATOR.API.getAllRecords(
      //   configOfRegistered_FFBRs
      // );

      await ZOHO.CREATOR.API.getAllRecords(configOfRegistered_FFBRs).then(function (
        response
      ) {
        //callback block
        const divisionSelect = document.getElementById("failedPart");
        console.log("Failed_Parts ", response);
        const data = response.data;
        // Loop through the data and create options
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.ID;
          option.textContent = item.Failed_Part_Name;
          divisionSelect.appendChild(option);
        });
      });





      var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
      console.log('queryParams ' + queryParams.recID);
      let recID = queryParams.recID;
      let EditFlag = queryParams.EditFlag;

      if (recID != undefined) {
        EditMode = true;

        const attachmentPhoto = document.getElementById('attachmentPhoto');
        const attachmentRequiredSpan = document.getElementById('attachmentRequired');
        const otherRequiredSpan = document.getElementById('otherRequired');

        const attachmentOtherDoc = document.getElementById('attachmentOtherDoc');
        attachmentPhoto.removeAttribute('required');
        attachmentRequiredSpan.parentNode.removeChild(attachmentRequiredSpan);
        otherRequiredSpan.parentNode.removeChild(otherRequiredSpan);
        attachmentOtherDoc.removeAttribute('required');
        await getData(recID).then(res => {
          if (EditFlag == undefined) {


            const inputs = document.querySelectorAll("input, textarea, select, a");
            // document.getElementById("attachmentRequired").classList.remove("required");
            // document.getElementById("otherRequired").classList.remove("required");
            // document.getElementById("docketNo").classList.remove("required");
            // document.getElementById("coilType").classList.remove("required");
            // document.getElementById("chassisType").classList.remove("required");
            // document.getElementById("coilType").required = false
            // document.getElementById("chassisType").required = false;
            // document.getElementById("docketNo").required = false
            document.getElementById("attachmentOtherDoc").required = false;
            document.getElementById("attachmentPhoto").required = false;
            inputs.forEach((element) => {
              if (element.tagName.toLowerCase() === "a") {
                element.removeAttribute("onclick");
                element.removeAttribute("href");

                element.addEventListener("click", function (event) {
                  event.preventDefault();
                  event.stopPropagation();
                });
              } else {
                element.disabled = true;
              }
            });
            let tbody = document.getElementById('tbody');
            const rowCount = tbody.rows.length;

            for (let i = 0; i < tbody.rows.length - 1; i++) {
              const row = tbody.rows[i];
              let cell = row.cells[4];
              let input = cell.querySelector('input');
              input.disabled = false;
            }
            document.getElementById('submit').disabled = false;

          }
        })
      }



      // ZOHO.CREATOR.API.getAllRecords(configOfProduct_Sub_Categories)
      // .then(function (response) {
      //   // callback block
      //   const divisionSelect = document.getElementById("productSubCategory");
      //   console.log("productSubCategory ", response);
      //   const data = response.data;
      //   console.log(data);
      //   // Loop through the data and create options
      //   data.forEach((item) => {
      //     const option = document.createElement("option");
      //     option.value = item.ID;
      //     option.textContent = item.Product_Sub_Category;
      //     divisionSelect.appendChild(option);
      //   });
      // })




      // configOfRegistered_FFBRs = {
      //   appName: "ffbr",
      //   reportName: "Models",
      // };
      // // model_no_master  = await ZOHO.CREATOR.API.getAllRecords(
      // //   configOfRegistered_FFBRs
      // // );


      // ZOHO.CREATOR.API.getAllRecords(configOfRegistered_FFBRs).then(function (
      //   response
      // ) {
      //   //callback block
      //   const divisionSelect = document.getElementById("modelNumber");
      //   console.log("modelNumber ", response);
      //   const data = response.data;
      //   // Loop through the data and create options
      //   data.forEach((item) => {
      //     const option = document.createElement("option");
      //     option.value = item.ID;
      //     option.textContent = item.Model;
      //     divisionSelect.appendChild(option);
      //   });
      // })
      hideLoader();
      await getUserData();

    })

});

let plantData = null;
async function populateDropdownAndSelect(desiredString) {
  const divisionSelect = document.getElementById("manufactureat");

  if (!plantData) {
    const configOfPlants = {
      appName:"ffbr",
      reportName: "Plants1"
    }
    await ZOHO.CREATOR.API.getAllRecords(configOfPlants).then(function (response) {
      plantData = response.data;
    });
  }

  // Populate the dropdown using the stored plantData
  plantData.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.ID;
    option.textContent = item.Plant_Name;

    // Check if the textContent matches the desired string
    if (item.Plant_Name === desiredString) {
      option.selected = true; // Set the option as selected
    }

    divisionSelect.appendChild(option);
  });
}


async function populateDraft() {
  let tableBody = document.getElementById('popupTableBody');
  tableBody.innerHTML = '';
  config = {
    reportName: "Registered_FFBRs",
  };

  ZOHO.CREATOR.init().then(async function (data) {

    const { reportName } = config;

    await ZOHO.CREATOR.API.getAllRecords({ reportName }).then(async function (response) {


      await getUserData().then(user => {
        response = response.data;
        console.log("data", { response });
        let draftStatusObjects = response.filter(obj => obj.FFBR_Status === "Draft");

         getRecordById(draftStatusObjects, 'Registered_FFBRs').then(userData => {
          EditMode = true;
          userData.forEach(data => {
            console.log(data);
            tableBody.innerHTML +=
              `
                <tr>
                  <td><button onclick="getData('${data.ID}')">${data.ID}</button></td>
                  <td>${data.Customer_Name}</td>
                  <td>${data.Location}</td>
                  <td>${data.Product_Segment.display_value}</td>
                  <td><button onclick="removeDraftRecord(this,'${data.ID}')">Remove</button></td>
                </tr>
                `
          })
        });
        EditMode = false;
      });
    });
  })
}



function addPersonTable(check) {

  let table = document.getElementById('personTable');
  let row = table.rows.length;

  var lastRow = table.rows[table.rows.length - 2];
  if (check && lastRow.cells[2].tagName != 'TH') {
    var email = lastRow.cells[2].querySelector('input').value;
    if (!isValidEmail(email)) {
      alert('Please Insert Valid Email before inserting the Row')
      return;
    }
  }


  var newRow = table.insertRow(table.rows.length - 1); // Insert above the last row
  var serialCell = newRow.insertCell(0);
  var personName = newRow.insertCell(1);
  var emailId = newRow.insertCell(2);
  var removeCell = newRow.insertCell(3);

  // Populate cells with data
  serialCell.innerHTML = table.rows.length - 2; // Update the Serial No.
  personName.innerHTML = '<input id="personName" type="text" required >';
  emailId.innerHTML = '<input id="emailId"  type="text" required >';
  removeCell.innerHTML = '<a href="#" class="edit" onclick="editRow(this)">Edit</a><a href="#" class="remove" onclick="removeRow(this)">Remove</a>';



}





function handleFailedPartChange() {
  // Add your logic here for handling the change in the second set of radio buttons
  // For example, you can check the selected value:
  const failedPartYes = document.getElementById("failedPartYes");
  const failedPartNo = document.getElementById("failedPartNo");

  if (failedPartYes.checked) {
    document.getElementById('docketNo').disabled = false;
  } else if (failedPartNo.checked) {
    document.getElementById('docketNo').value = '';
    document.getElementById('docketNo').disabled = true;
  }
}





function removeRow(link) {

  var row = link.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function setDate(currentRow) {
  var commissioningDateInput = currentRow.querySelector('.commissioningDate');
  var deliveryDateInput = currentRow.querySelector('.deliveryDate');
  var manufacturingDateInput = currentRow.querySelector('.manufactoringDate');
  var currentDate = new Date();
  var maxDate = currentDate.toISOString().split('T')[0];
  deliveryDateInput.max = maxDate;
  commissioningDateInput.max = maxDate;
  manufacturingDateInput.max = maxDate;

}


function setDateConstraints(currentRow) {
  var deliveryDateInput = currentRow.querySelector('.deliveryDate');
  var commissioningDateInput = currentRow.querySelector('.commissioningDate');
  var manufacturingDateInput = currentRow.querySelector('.manufactoringDate');
  commissioningDateInput.min = deliveryDateInput.value;
  commissioningDateInput.max = new Date().toISOString().split('T')[0];
  manufacturingDateInput.max = deliveryDateInput.value;
}

// const today = new Date();
// const isoDateString = today.toISOString().split('T')[0];
// const parts = isoDateString.split('-');


// const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
// console.log(formattedDate)
// document.getElementById("fFFbrRegDate").textContent = formattedDate;

// let initiator_Name = document.getElementById("initiatorName");
// ZOHO.CREATOR.init()
//   .then(function (data) {
//     var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
//    let pg = queryParams.productGroups;
//    pgData = pg.data;
//     console.log("1", queryParams);
//     console.log("A", queryParams.productGroups);
//     let user = JSON.parse(queryParams.loggedInUserDetails);
//     let productGroup = JSON.parse(queryParams.productGroups);
//     let productGroupData = productGroup.data;

//     let productSegment = JSON.parse(queryParams.productSegments);
//     let product = productSegment.data;

//     aapendproductGroup(productGroupData);
//     function aapendproductGroup(data) {
//       data.forEach((el) => {
//         let option = document.createElement("option");
//         option.textContent = el.name;
//         document.getElementById("productGroup").append(option);
//       });
//     }
//     // Product Group:
//     let selectedValue;
//     document.getElementById("productGroup").addEventListener("change", function () {
//       selectedValue = this.value;
//       console.log(selectedValue);
//       appendProductSegment(selectedValue);
//     });

//     // product Segment
//     function appendProductSegment(filterCriteria) {
//       document.getElementById("productSegment").innerHTML = "";
//       let filteredProducts = product.filter(item => item.productGroup.name === filterCriteria);

//       let productSegment = document.getElementById("productSegment");
//       productSegment.innerHTML = "";

//       let defaultOption = document.createElement("option");
//       defaultOption.textContent = "Select";
//       productSegment.appendChild(defaultOption);

//       filteredProducts.forEach((el) => {
//         let option = document.createElement("option");
//         option.textContent = el.name;
//         document.getElementById("productSegment").append(option);
//       });
//     }

//     console.log("indraTest",selectedValue);
//     console.log("productGroupName", productGroup.data);

//     document.getElementById("initiatorSpan").innerText = user.name;



//       console.log("kel", pgData.name);





//     document.getElementById("submit").addEventListener('click', function(){

//       let aa = document.getElementById("productGroup").value;
//       if(aa == "OEM"){
//         console.log("yes");
//       }else{
//         console.log("NO");
//       }
//     })


//   });




async function openPopup() {
  var popupTable = document.getElementById("popupTable");
  popupTable.classList.remove("hidden");

  // Example data (replace with your actual data)

}

function closePopup() {
  var popupTable = document.getElementById("popupTable");
  popupTable.classList.add("hidden");
}

function populatePopupTable(data) {
  var tableBody = document.getElementById("popupTableBody");
  tableBody.innerHTML = "";

  data.forEach(function (item) {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td><button onclick="getDetailsOfDraftAndPopulate('${item.ID}')">${item.draftCode}</button></td>
      <td>${item.customerName}</td>
      <td>${item.location}</td>
      <td>${item.productSegment}</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}




async function getDetailsOfDraftAndPopulate(draftCode) {
  const regFbbrIDdata = {
    appName: "ffbr",
    reportName: "Registered_FFBRs",
    id: draftCode,
  };

  const singleUserData = await ZOHO.CREATOR.API.getRecordById(regFbbrIDdata);
  await populateFieldsFromObject(singleUserData.data);
  closePopup();
}


async function getData(Id) {
  console.log(Id)
  const regFbbrIDdata = {
    appName: "ffbr",
    reportName: "Registered_FFBRs",
    id: Id,
  };

  console.log(regFbbrIDdata)
  const singleUserData = await ZOHO.CREATOR.API.getRecordById(regFbbrIDdata);
  existingDocsArray = singleUserData.data.Docs_SubForm;
  existingPhotoArray = singleUserData.data.Photo_Attachments_SubForm;
  existingTestId = Id;

  console.log("Log Message for Prabhat", singleUserData);


   await populateFieldsFromObject(singleUserData.data);
  closePopup();




}

async function populateFieldsFromObject(obj) {
  document.getElementById('fFFbrRegDate').textContent = obj.Registration_Date_of_FFBR;
  document.getElementById('productGroup').value = obj.Product_Group.ID;
  document.getElementById('ffbrCategory').value = obj.FFBR_Category_Defect;
  await populateProductSegment().then(res => {
    document.getElementById('productSegment').value = obj.Product_Segment.ID;
    // document.getElementById('modelNumber').value = obj.Model_Number.ID;
    document.getElementById('productSubCategory').value = obj.Product_Sub_Category.ID

    populateDataBasedOnModelNameEdit(obj).then(res => {
      document.getElementById('coilType').value = obj.Coil_Type;
      document.getElementById('chassisType').value = obj.Chassis_Type;
      // if (obj.Model_Number == '') {
      //   document.getElementById('modelNumber').value = '';
      // }
    })

  })
  document.getElementById('manufactureat').value = obj.Manufacture_at.ID;
  document.getElementById('modelNoInput').value = obj.Model_Number_Other;



  setSelectValue('natureOfProblem', obj.Nature_of_Problem.ID);
  setSelectValue('obligation', obj.Obligation);
  setSelectValue('productSubCategory', obj.Product_Sub_Category.ID);

  setSelectValue('failedPart', obj.Failed_Component.ID)

  document.getElementById('initiatorContNameInput').value = obj.Initiator_Contact_Number;
  document.getElementById('dealerId').value = obj.Dealer_Id_Name.display_value || "";
  document.getElementById('quantityAffected').value = obj.Quantity_Affected;
  document.getElementById('coustomerName').value = obj.Customer_Name;
  document.getElementById('addiionalInfo').value = obj.Additional_Info;
  document.getElementById('location').value = obj.Location;
  // document.getElementById('failureDate').value = obj.Failure_Date;
  document.getElementById('componentModel').value = obj.Component_Model;
  document.getElementById('componentMake').value = obj.Component_Make;
  document.getElementById('serialNo').value = obj.Serial_Number_of_Failed_Part;
  document.getElementById('ObservationDealer').value = obj.Observation_of_Dealer_SDE;
  document.getElementById('actionTakenFailure').value = obj.Action_Taken_on_Failure;

  // Handle radio buttons

  document.getElementById('docketNo').value = obj.Docket_No;
  document.getElementById('addiInfo').value = obj.Additional_Information;
  document.getElementById('ticketNo').value = obj.Ticket_No;
  document.getElementById('preliminaryRoot').value = obj.Preliminary_Root_Cause_analysis;

  // Handle radio buttons for FFBR Classification





  document.getElementById('quantityAffected').value = obj.Products.length;



  let failedPart = obj.Failed_part_sent_to_factory;
  if (failedPart == 'No') {
    document.getElementById('docketNo').value = '';
    document.getElementById('docketNo').disabled = true;
    document.getElementById('failedPartNo').checked = true;
  } else {
    document.getElementById('docketNo').disabled = false;
    document.getElementById('failedPartYes').checked = true;
  }




  // let failedPart=obj.Failed_part_sent_to_factory;
  // if(failedPart === 'Export'){
  //   document.getElementById('failedPartNo').checked=false;
  // }else{
  //   document.getElementById('failedPartYes').checked=false;
  // }

  let field = obj.Field_visit_required_by_factory_R_D_Service;

  if (field === 'Yes') {
    document.getElementById('fieldVisitYes').checked = true;
  } else {
    document.getElementById('fieldVisitNo').checked = true;
  }

  let FFBR_Classification = obj.FFBR_Classification;
  if (FFBR_Classification === 'Domestic') {
    document.getElementById('domestic').checked = true;
  } else {
    document.getElementById('export').checked = true;

  }
  populateDivisionOptions(AllDivision).then(res => {
    document.getElementById('division').value = obj.Divisions?.ID
  })



  let table = document.getElementById('productDetailsTable');
  removeRowsExceptFirstTwo(table);
  for (let i = 1; i < obj.Products.length; i++) {
    // if(document.getElementById('productDetailsTable').rows.length>=obj.Products.length+1){
    //   break;
    // }
    addProductRow(false);

  }
  document.getElementById('showPhotos').innerHTML = '';

  obj.Photo_Attachments_SubForm.forEach(item => {
    // Finding the index of "/api" in the display_value
    var startIndex = item.display_value.indexOf("/api");
    if (startIndex !== -1) {
        // Extracting the substring starting from "/api"
        var apiLink = item.display_value.slice(startIndex);
        // Constructing the complete link
        var photoLink = "https://creator.zoho.in" + apiLink;
        var img = new Image();
        img.src = photoLink;
        
        // Setting styles for the image
        img.style.width = '200px';
        img.style.height = '200px';
        img.style.objectFit = 'contain';
        img.style.marginTop = '50px';
        
        img.onload = function () {
            if (img.width < img.height) {
                img.height = 300;
            } else {
                img.width = 300;
            }
            document.getElementById('showPhotos').appendChild(img);
        };
        
    }
});
document.getElementById('showDoc').innerHTML = '';
  obj.Docs_SubForm.forEach(item => {
    var startIndex = item.display_value.indexOf("/api");
    if (startIndex !== -1) {
        // Extracting the substring starting from "/api"
        var apiLink = item.display_value.slice(startIndex);

        
        const aLink = "https://creator.zoho.in" + apiLink;
        const filepathIndex = apiLink.indexOf("filepath=");

        let filename = "";
        if (filepathIndex !== -1) {
          const filepathSubstring = apiLink.substring(filepathIndex);
          const filepathParts = filepathSubstring.split("_");
          filename = filepathParts.slice(1).join("_");
        }

        const aElement = document.createElement('a');

        aElement.style.marginTop = '50px';
        
        aElement.href = aLink;
        // aElement.textContent = filename;
        aElement.innerHTML = `${filename} <br> <br>`;
        document.getElementById('showDoc').appendChild(aElement);
    }
  })

  let products = obj.Products;

  let i = 1;



  products.forEach(data => {
    let row = table.rows[i++]; // Assuming `i` is initialized somewhere

    let string = data.display_value;
    let parts = string.split(' -').map(part => part.trim());

    let cell = row.cells[0];
    cell.textContent = parts[0];

    cell = row.cells[1];
    inputField = cell.querySelector('input');
    console.log(inputField);
    inputField.value = parts[1];

    // Start populating date fields from parts[1] onwards
    for (let j = 2; j < parts.length; j++) {
      let cellIndex = j; // Cell index corresponds to parts index

      if (cellIndex < row.cells.length) {
        cell = row.cells[cellIndex];
        let inputField = cell.querySelector('input[type="date"]');

        if (!inputField) {
          // Create a new date input field if not found
          inputField = document.createElement('input');
          inputField.type = 'date';

          // Append the input field to the cell
          cell.appendChild(inputField);
        }

        // Convert date string from 'DD-MM-YYYY' to 'YYYY-MM-DD'
        let dateString = parts[j];
        let [day, month, year] = dateString.split('-');
        let isoDateString = `${year}-${month}-${day}`;

        // Set the value of the date input field
        inputField.value = isoDateString;
      } else {
        console.error(`Cell index ${cellIndex} out of range for row`);
      }
    }
  });
  table = document.getElementById('personTable');
  removeRowsExceptFirstTwo(table);
  let customer = obj.Mark_CC_of_FFBR_To;

  for (let i = 1; i < customer.length; i++) {
    // if(document.getElementById('personTable').rows.length>=customer.length+1){
    //   break;
    // }
    addPersonTable(false);
  }



  i = 1;
  customer.forEach(el => {
    let inputField = null
    let row = table.rows[i++];

    let string = el.display_value;
    let parts = string.split(' = ').map(part => part.trim());
    let cell = row.cells[0];

    cell.textContent = parts[0]



    cell = row.cells[1];
    inputField = cell.querySelector('input');
    console.log(inputField)
    inputField.value = parts[1];

    cell = row.cells[2];
    inputField = cell.querySelector('input');
    inputField.value = parts[2];


  })



}





// Populate table data













function setSelectValue(selectId, providedValue) {
  // Get the select element
  let selectElement = document.getElementById(selectId);

  // Iterate through options and set the selected attribute for the matching option
  for (let i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value === providedValue) {
      selectElement.options[i].selected = true;
      break;  // Stop the loop once the matching option is found
    }
  }
}


function isValidEmail(email) {
  // Define a regular expression for a basic email format
  // const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailRegex = /^[\w-\.]+@(aarialife\.in|bluestarindia\.com|globalbluestar\.com)$/;
  // Test the email against the regular expression
  return emailRegex.test(email);
}





function validateEmails(emailArray) {
  for (const el of emailArray) {
    if (!isValidEmail(el.Email)) {
      alert('Please Insert Valid Email');
      return false; // Set flag to false and return
    }
  }
  return true; // If all emails are valid, return true
}



function removeRowsExceptFirstTwo(table) {
  if (table) {
    var rowCount = table.rows.length;
    for (var i = rowCount - 2; i > 1; i--) {
      table.deleteRow(i);
    }
  }
}



function initialProductTableForDealer() {
  document.getElementById('productDetailsTable').innerHTML =
    `
    <colgroup>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Product Serial No.</th>
            <th>Delivery Date</th>
            <th>Commissioning Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td> <input type="text" name="productSerialNo" id="productSerialNo" required> </td>
            <td><input type="date" name="deliveryDate" class="deliveryDate" id="deliveryDate" required
                onclick="setDate(this.closest('tr'))" oninput="setDateConstraints(this.closest('tr'))"></td>
            <td><input type="date" name="commissioningDate" class="commissioningDate"
                onclick="setDate(this.closest('tr'))" id="commissioningDate" required></td>
            <td><a href="#" class="edit" onclick="editRow(this)">Edit</a><a href="#" class="remove"
                onclick="removeRow(this)">Remove</a></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><input type="button" class="btn" id="addProductsRow" onclick="addProductRow(true)"
                value="Add New Row" /></td>
          </tr>
  `
}




function formatDateToInput(dateString) {
  const months = {
    "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
    "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
  };

  const [day, month, year] = dateString.split('-');
  const formattedDate = `${day.padStart(2, '0')}-${months[month]}-${year}`;
  return formattedDate;
}



function selectCategory() {
  let table = document.getElementById('productDetailsTable');
  let row = table.rows.length;

  console.log(row);

  let quantityInput = document.getElementById('quantityAffected');
  let quantity = quantityInput.value;

  if (quantity.trim() === '' || isNaN(quantity)) {
    return;
  }

  quantity = parseFloat(quantity);
  if (quantity < row - 2) {
    alert("Please Insert a Valid Quantity First");
    quantityInput.value = '';
  }
  if (quantity >= 5) {
    document.getElementById('ffbrCategory').value = 'A';
    document.getElementById("failedPartYes").checked = true;
    document.getElementById('docketNo').disabled = false;
    document.getElementById("failedPartYes").disabled = true;
    document.getElementById("failedPartNo").disabled = true;
  } else {
    document.getElementById('ffbrCategory').value = '';
    document.getElementById("failedPartYes").disabled = false;
    document.getElementById("failedPartNo").disabled = false;
    document.getElementById("failedPartYes").checked = false;
    document.getElementById('docketNo').disabled = true;
    document.getElementById('docketNo').value = '';
    document.getElementById("failedPartNo").checked = true;
  }
}




function checkFileSize(fileInput) {
  const fileSize = fileInput.files[0].size;
  const maxSize = 10 * 1024 * 1024;

  if (fileSize > maxSize) {
    alert('File size exceeds the limit of 10 MB.');
    fileInput.value = '';
    return false;
  }
  return true;
}






function handleFileAdditionPhoto(event) {
  event.preventDefault();
  const fileList = document.getElementById('fileListPhoto');
  const fileInput = document.getElementById('attachmentPhoto');

  filePhotoArray.forEach(el => console.log(el));
  const files = fileInput.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const li = document.createElement('li');
    const fileObj = {
      Attachment: file
    };

    li.textContent = file.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      const index = filePhotoArray.indexOf(fileObj);
      if (index !== -1) {
        filePhotoArray.splice(index, 1);
      }
      fileList.removeChild(li);
    };

    li.appendChild(deleteButton);

    fileList.appendChild(li);
    filePhotoArray.push(fileObj);
  }

  fileInput.value = '';



}


function handleFileAdditionOthers(event) {
  event.preventDefault();
  const fileList = document.getElementById('fileListOthers');
  const fileInput = document.getElementById('attachmentOtherDoc');

  fileOthersArray.forEach(el => console.log(el));
  const files = fileInput.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const li = document.createElement('li');
    const fileObj = {
      Attachment: file
    };

    li.textContent = file.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      const index = fileOthersArray.indexOf(fileObj);
      if (index !== -1) {
        fileOthersArray.splice(index, 1);
      }
      fileList.removeChild(li);
    };

    li.appendChild(deleteButton);

    fileList.appendChild(li);
    fileOthersArray.push(fileObj);
  }

  fileInput.value = '';
}

function showLoader() {
  document.getElementById('loader-container').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader-container').style.display = 'none';
}


