function doGet() {

  var output = HtmlService.createTemplateFromFile('web').evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return output
}

function onInstall(e){
  onOpen(e);
}

function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('Генератор')
        .addItem('Запустить', 'showSidebar')
        .addToUi();
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile('sidebar').evaluate().setTitle('Генератор КП').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(html);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}