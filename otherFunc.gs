function getElementsFromDB(){
  var sheetWorkDB = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Работы");
  var sheetMaterialDB = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Материалы");
  var sheetSettings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Настройки");
  
  var dataWork = sheetWorkDB.getDataRange().getValues();
  var dataMaterial = sheetMaterialDB.getDataRange().getValues();
  var dataCompany = sheetSettings.getRange(2,1,sheetSettings.getLastRow(),5).getValues();
  var dataMeasure = sheetSettings.getRange(2,7,sheetSettings.getLastRow(),7).getValues();
  
  var elements = {};
  elements['work']=[];
  elements['material']=[];
  elements['company']=[];
  elements['measure']=[];

  for (var i = 1; i < dataWork.length; i++) {
      elements['work'].push({   
                        name: dataWork[i][0],
                        price: dataWork[i][1],
                        measure: dataWork[i][2],
                    })
  }
  
  for (var i = 1; i < dataMaterial.length; i++) {
      elements['material'].push({   
                        name: dataMaterial[i][0],
                        price: dataMaterial[i][1],
                        measure: dataMaterial[i][2],
                    })
  }
  
  for (var i = 0; i < dataCompany.length; i++) {
     dataCompany[i][0]!='' && elements['company'].push({   
                        name: dataCompany[i][0],
                        nds: dataCompany[i][1],
                        inn: dataCompany[i][2],
                        kpp: dataCompany[i][3],
                        stamp: dataCompany[i][4],
                    })
  }
  
  for (var i = 0; i < dataMeasure.length; i++) {
        dataMeasure[i][0]!='' && elements['measure'].push({   
                        name: dataMeasure[i][0],
                    })
  }
  
  return elements
 }
  
function addElementToWorkOrderGS(element, amount){
 Logger.log (element)
 
 var sheetOrder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказ работы");
 
 var rowToAppend = [];
 rowToAppend.push(element.name);
 rowToAppend.push(element.price);
 rowToAppend.push(amount);
 rowToAppend.push(element.measure);
  
 sheetOrder.appendRow(rowToAppend);
 
 var cell = sheetOrder.getRange(sheetOrder.getLastRow(),5);  //вписываем формулу в столбец со стоимостью
 cell.setFormulaR1C1("=MULTIPLY(R[0]C[-3];R[0]C[-2])");
}

function addElementToMaterialOrderGS(element, amount){
 Logger.log (element)
 
 var sheetOrder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказ материалы");
 
 var rowToAppend = [];
 rowToAppend.push(element.name);
 rowToAppend.push(element.price);
 rowToAppend.push(amount);
 rowToAppend.push(element.measure);
  
 sheetOrder.appendRow(rowToAppend);
 
 var cell = sheetOrder.getRange(sheetOrder.getLastRow(),5);  //вписываем формулу в столбец со стоимостью
 cell.setFormulaR1C1("=MULTIPLY(R[0]C[-3];R[0]C[-2])");
}



function clearSheet() {
  var sheetWorkOrder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказ работы");
  var sheetMaterialOrder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказ материалы");
  var sheetCustomer = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказчик");
  
  sheetWorkOrder.getRange(2,1,sheetWorkOrder.getLastRow(),sheetWorkOrder.getLastColumn()).clearContent();
  sheetMaterialOrder.getRange(2,1,sheetMaterialOrder.getLastRow(),sheetMaterialOrder.getLastColumn()).clearContent();
  sheetCustomer.getRange("C2:C3").clearContent();
  sheetCustomer.getRange(2,4, sheetCustomer.getLastRow(),1).clearContent();
  sheetCustomer.getRange("E2").clearContent();

}

function uploadImagesGS(uploadsSrc, uploadsName, uploadsType){
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказчик");
  
  try {
    
     var folder = DriveApp.getFolderById("1qzRrIeEUItb0z4-BZJpH32FbNj3qgkJw");
     Logger.log("Папка для загрузки: "+ folder);
     var fileUrl = [];
    
    
    //декдоируем data URL файлы в utf-8, создаем изображения
     for (var i in uploadsSrc){
   
       var bytes = Utilities.base64Decode(uploadsSrc[i].substr(uploadsSrc[i].indexOf('base64,')+7));
       
       var blob = Utilities.newBlob(bytes, uploadsType[i], uploadsName[i]);
       
       var file = folder.createFile(blob);
       file.setDescription("Загружено генератором КП");
       
       sheet.getRange(2 + parseInt(i),4).setValue(file.getUrl()); // вставляем ссылку на файл в таблицу
       
     }
         
     return true 
  } 
  
 catch (error) {
   
    return error.toString();
  }
  
}