import { jsPDF } from "jspdf";

export default function textToFile(text, title) {

  const doc = new jsPDF();
  const pageSize = doc.internal.pageSize;
  const maxWidth = pageSize.width - 20;
  const lineHeight = 10;

  let lines = doc.splitTextToSize(text, maxWidth);
  let y = 10;
  for (let line of lines) {
    doc.text(line, 10, y);
    y += lineHeight;
    if (y > pageSize.height - 20) {
      doc.addPage();
      y = 10;
    }
  }


  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.pdf`;
  a.target = "_blank";
  a.click();
  URL.revokeObjectURL(url);
}