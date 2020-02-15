function createDocument(clientName, clientAddress, workDescribe, infoCompany) {
  
  var sheetCustomer = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказчик");
  var sheetWorkOrder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказ работы");
  var sheetMaterialOrder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заказ материалы");
  
  var positionsPhotoes=[];
  var emptyRowIndex=[];
  
  //заносим данные о заказчике из вкладки "Заказчик"
  
  sheetCustomer.getRange("C2").setValue(clientName);
  sheetCustomer.getRange("C3").setValue(clientAddress);
  sheetCustomer.getRange("E2").setValue(workDescribe);
  
  //формируем данные для генератора документа
  
  var customerData = sheetCustomer.getRange(2,2,sheetCustomer.getLastRow(),2).getValues();  //фиксированное кол-во столбцов (!)
  customerData[2][1] = Utilities.formatDate(customerData[2][1], "GMT+3", "dd.MM.yyyy"); //меняем формат даты
 
  var customerName = customerData[0][1];          // имя заказчика

  //создаем файл, присваиваем название
  var templateId = '12ldtbuAGCSDTCXZJmbzlJmkakK4o8whgFjVzPT32Vdw';  //id шаблона
  var folder = DriveApp.getFolderById('1ufO0ifFdkgygNJw2HlOCltTEUy1r7cbo'); //id папки, куда кидаем готовые КП
  
  var document = DriveApp.getFileById(templateId).makeCopy(folder);
  var documentId = document.getId();
  var documentURL = DriveApp.getFileById(documentId).getDownloadUrl();
  
  Logger.log(document)
  Logger.log("Ссылка на скачивание: " + documentURL )
  Logger.log("Ссылка на скачивание2: " + "https://docs.google.com/feeds/download/documents/export/Export?id="+documentId+"&exportFormat=pdf")
  
  DriveApp.getFileById(documentId).setName(customerName + " " + Utilities.formatDate(new Date, "GMT+3", "dd.MM.yyyy"));
 
  
  //формируем данные таблицы заказа
  
  if(sheetWorkOrder.getLastRow()-1 > 0)
    var positionsWorkData = sheetWorkOrder.getRange(2,1,sheetWorkOrder.getLastRow()-1,6).getValues(); //Данные заказа работы
  else
    var positionsWorkData = [];  //если данных нет
  
  if(sheetMaterialOrder.getLastRow()-1 > 0)
    var positionsMaterialData = sheetMaterialOrder.getRange(2,1,sheetMaterialOrder.getLastRow()-1,6).getValues(); //Данные заказа материалы
  else
    var positionsMaterialData = [];  //если данных нет
  
  var totalValueWork =  sheetWorkOrder.getRange('G1').getValue();    // Взять сумму заказа работы
  var totalValueMaterial =  sheetMaterialOrder.getRange('G1').getValue();    // Взять сумму заказа материалы
  
  var photoesUrl = sheetCustomer.getRange(2,4,sheetCustomer.getLastRow(),1).getValues(); //Фотографии
  
  Logger.log("Данные о заказчике: "+customerData)
  Logger.log("Данные о заказе: "+positionsWorkData)
  Logger.log("Фотографии:" + photoesUrl )
  
  insertProposal(documentId, infoCompany, customerData, workDescribe, positionsWorkData, positionsMaterialData, totalValueWork, totalValueMaterial, photoesUrl);

  return [true, "https://docs.google.com/feeds/download/documents/export/Export?id="+documentId+"&exportFormat=pdf"]
  //  return ["Документ успешно создан", documentURL]; 
  //  return ["Документ успешно создан", "https://drive.google.com/drive/u/0/folders/1ufO0ifFdkgygNJw2HlOCltTEUy1r7cbo"];  //папка
}

function insertProposal(documentId, infoCompany, customerData, workDescribe, positionsWorkData, positionsMaterialData, totalValueWork, totalValueMaterial, photoesUrl){ //Работа с doc шаблоном
  
  words2numbers(); //!!!  функция, добавляющая метод преобразования числе в слова к числовым значениям
  
  var body = DocumentApp.openById(documentId).getBody();
  
  Logger.log("Информация о компании: " + infoCompany.name + '  ' + infoCompany.stamp);
  
  //меняем данные о компании в шаблоне
   body.replaceText("{COMPANY}",infoCompany['name']);
   body.replaceText("{INN} ",infoCompany['inn']);
   body.replaceText("{KPP}",infoCompany['kpp']);  

  
  //вставляем печать
  var imageId = infoCompany['stamp'].match(/id=(.+)/)[1];    
  
  (/\/d\/([^\/]+)/)[1]; 
  
  Logger.log(imageId);
  
  var imageBlob = DriveApp.getFileById(imageId).getBlob(); 
  
  var targetElementStamp = body.findText("{DATE}").getElement();
  var targetIndexStamp = body.getChildIndex(targetElementStamp.getParent())+1;

  body.getChild(targetIndexStamp).appendInlineImage(imageBlob);
  
  //меняем текст в шаблоне на заданный
  for (var i=0; i < customerData.length; i++){
    customerData[i][0]!="" &&
    body.replaceText(customerData[i][0], customerData[i][1]);      
  } 
  
  //Находим индекс элемента, после которого вставляем наименование работ
  var targetElement_1 = body.findText("полняе").getElement();
  var targetIndex_1 = body.getChildIndex(targetElement_1.getParent())
  
  //вставляем наименование работ
  var styleWorkDescribe = {};
  styleWorkDescribe[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  styleWorkDescribe[DocumentApp.Attribute.FONT_SIZE] = 12;
  styleWorkDescribe[DocumentApp.Attribute.BOLD] = false;
  styleWorkDescribe[DocumentApp.Attribute.INDENT_FIRST_LINE] = 55; 
  styleWorkDescribe[DocumentApp.Attribute.INDENT_START] = 40;
  styleWorkDescribe[DocumentApp.Attribute.INDENT_END] = 100;
  
  body.insertParagraph(targetIndex_1+1, workDescribe).setAttributes(styleWorkDescribe);
  
  //Находим индекс элемента, после которого вставляем список работ
  var targetElement_2 = body.findText("пераци").getElement();
  var targetIndex_2 = body.getChildIndex(targetElement_2.getParent())+1;
  
  //вставляем список работ
 
  var styleList = {};
  styleList[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  styleList[DocumentApp.Attribute.FONT_SIZE] = 12;
  styleList[DocumentApp.Attribute.BOLD] = false;
  styleList[DocumentApp.Attribute.INDENT_FIRST_LINE] = 40; 
  
  for (var i in positionsWorkData){
     body.insertListItem(targetIndex_2,positionsWorkData[i][0] + " " + positionsWorkData[i][2] + 
                         " " + positionsWorkData[i][3] + " - " + positionsWorkData[i][4] + " руб.").setAttributes(styleList);
  }
  
  //Находим индекс элемента, после которого вставляем название список материалов
  var targetElement_3 = body.findText("териал").getElement();
  var targetIndex_3 = body.getChildIndex(targetElement_3.getParent())+1;
  
  //вставляем список материалов
  
  for (var i in positionsMaterialData){
     body.insertListItem(targetIndex_3,positionsMaterialData[i][0] + " " + positionsMaterialData[i][2] + 
                         " " + positionsMaterialData[i][3] + " - " + positionsMaterialData[i][4] + " руб.").setAttributes(styleList);
  }
  
//  if (positionsMaterialData == []) targetElement_3.getParent().appendText(" без материалов");
  
 //Определяем кол-во загруженных фотографий и меняем от этого их размер в документе
  if (photoesUrl.length <= 3) {  
    var photoHeight = 450;
    var photoWidth = photoHeight * 1.33
  }
  else if (photoesUrl.length > 3 && photoesUrl.length <= 6) {
    var photoHeight = 200;
    var photoWidth = photoHeight * 1.33
  }
  else if (photoesUrl.length > 6) {
    var photoHeight = 150;
    var photoWidth = photoHeight * 1.33
  }

  
  //вставляем фото в документ
  var indexPhoto = targetIndex_1 + 2;
  var indexPageBreak = indexPhoto + 1;
  
  var styleImage = {};
  styleImage[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
    DocumentApp.HorizontalAlignment.CENTER;
  styleImage[DocumentApp.Attribute.INDENT_FIRST_LINE] = 25; 
  
  for (i in photoesUrl) {
    
    if (photoesUrl[i][0].match(/./)) {
      var imageId = photoesUrl[i][0].match(/\/d\/([^\/]+)/)[1];    
      var imageBlob = DriveApp.getFileById(imageId).getBlob(); 
      body.getChild(indexPhoto).appendInlineImage(imageBlob).setHeight(photoHeight).setWidth(photoWidth).getParent().setAttributes(styleImage);
    }
  }
  photoesUrl.length > 0 && body.insertPageBreak(indexPageBreak); //Вставляем разрыв страницы, если есть фото
  
  // вставляем параграф с общей стоимостью
  
  var totalPrice = parseInt(totalValueWork) + parseInt(totalValueMaterial);
  var totalPriceNDS = totalPrice*1.2;
  var amountNDS = totalPriceNDS - totalPrice;
  
  var styleTotal = {};
  styleTotal[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
    DocumentApp.HorizontalAlignment.LEFT;
  styleTotal[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  styleTotal[DocumentApp.Attribute.FONT_SIZE] = 12;
  styleTotal[DocumentApp.Attribute.BOLD] = true;
  styleTotal[DocumentApp.Attribute.FOREGROUND_COLOR] = '#000000';
  styleTotal[DocumentApp.Attribute.INDENT_FIRST_LINE] = 35; 
    
  if (infoCompany.nds == true) {
    var totalParagraph = body.insertParagraph(targetIndex_2 + positionsWorkData.length + positionsMaterialData.length + 3,
                                            "Итого стоимость работ с материалом: " + totalPriceNDS + " руб." + " (" + totalPriceNDS.toPhrase() + ")," + 
                                            "\n\t в том числе НДС (20%): " + amountNDS + " руб." + " (" + amountNDS.toPhrase() + ")");
  }
  
  else {
    var totalParagraph = body.insertParagraph(targetIndex_2 + positionsWorkData.length + positionsMaterialData.length + 3,
                                            "Итого стоимость работ с материалом: " + totalPrice + " руб." + " (" + totalPrice.toPhrase() + "), без НДС");
  }
  
  totalParagraph.setAttributes(styleTotal);
  
}
