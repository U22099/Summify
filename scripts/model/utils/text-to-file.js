import { jsPDF } from "jspdf";

export default function textToFile(text, title){

  const doc = new jsPDF();
  doc.text(text, 10, 10, { maxWidth: doc.internal.pageSize.width - 20});
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.pdf`;
  a.target = "_blank";
  a.click();
  URL.revokeObjectURL(url);
}