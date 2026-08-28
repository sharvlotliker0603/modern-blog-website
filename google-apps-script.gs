/**
 * Google Apps Script backend for the Inkly blog form.
 *
 * Google Sheet columns:
 * Timestamp | Name | Email | Title | Category | Content
 */

const SHEET_NAME = "Blog Posts";

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Email", "Title", "Category", "Content"]);
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Inkly Blog API is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    setupSheet();

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const p = e.parameter || {};

    const name = String(p.name || "").trim();
    const email = String(p.email || "").trim();
    const title = String(p.title || "").trim();
    const category = String(p.category || "").trim();
    const content = String(p.content || "").trim();

    if (!name || !email || !title || !category || !content) {
      return jsonResponse({
        status: "error",
        message: "All required fields must be filled."
      });
    }

    sheet.appendRow([
      new Date(),
      name,
      email,
      title,
      category,
      content
    ]);

    return jsonResponse({
      status: "success",
      message: "Blog post saved successfully."
    });
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
