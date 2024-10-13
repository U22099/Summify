import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts.js'

//pdfMake.vfs = pdfMakeFonts.vfs;

export default function textToPdf(text, {title, subject, keywords}){
  const docDefinition = {
    info: {
      title,
      author: "Summify",
      subject,
      keywords,
      creator: 'pdfMake',
      producer: 'pdfMake',
    },
    content: [
      {
        text,
        fontSize: 14,
      },
    ],
  };
  try {
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download(`${title}.pdf`);
    return true;
  } catch (e) {
    console.log(e.messagey);
    return false;
  }
}