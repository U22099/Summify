//import pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from "pdfmake/build/vfs_fonts";


export default function textToPdf(text, {title, subject, keywords}){
  /*pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  }*/
}