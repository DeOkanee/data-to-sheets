//copy dari sini


function doPost(e) {
    const folderId = "1Ccm1S8Cbwyc_KwA4vnF8Nc_wyB4MR0_J";  // Or Folder ID which is used for putting the file instead of "root", if you need.
  
    const blob = Utilities.newBlob(JSON.parse(e.postData.contents), e.parameter.mimeType, e.parameter.filename);
    const file = DriveApp.getFolderById(folderId).createFile(blob);
    const responseObj = {filename: file.getName(), fileId: file.getId(), fileUrl: file.getUrl()};
    return ContentService.createTextOutput(JSON.stringify(responseObj)).setMimeType(ContentService.MimeType.JSON);
  }
  