/*import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;*/


export default function textToPdf(text, {title, subject, keywords}){
  /*const docDefinition = {
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
    console.log(e.message);
    return false;
  }*/
}