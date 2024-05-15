
//mengirim ke keduanya sheet dan drive
const DATA_ENTRY_SHEET_NAME = "Sheet1";
const FOLDER_ID = "1Ccm1S8Cbwyc_KwA4vnF8Nc_wyB4MR0_J"; // Ganti dengan ID folder Anda

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
  DATA_ENTRY_SHEET_NAME
);

function doPost(request) {
  const { postData: { contents, type } = {} } = request;

  // Mengurai data formulir
  var data = parseFormData(contents);
  appendToGoogleSheet(data);

  // Menangani unggahan file
  const blob = Utilities.newBlob(
    JSON.parse(contents),
    request.parameter.mimeType,
    request.parameter.filename
  );
  const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob);
  const fileInfo = {
    filename: file.getName(),
    fileId: file.getId(),
    fileUrl: file.getUrl(),
  };

  // Menggabungkan respons
  const responseObj = {
    formData: data,
    fileInfo: fileInfo,
  };

  return ContentService.createTextOutput(
    JSON.stringify(responseObj)
  ).setMimeType(ContentService.MimeType.JSON);
}

function parseFormData(postData) {
  var data = [];
  var parameters = postData.split("&");
  for (var i = 0; i < parameters.length; i++) {
    var keyValue = parameters[i].split("=");
    data[keyValue[0]] = decodeURIComponent(keyValue[1]);
  }
  return data;
}

function appendToGoogleSheet(data) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowData = headers.map((headerFld) => data[headerFld]);
  sheet.appendRow(rowData);
}
