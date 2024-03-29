import html2pdf from "html2pdf.js";

var opt = {
  margin: 0,
  filename: "billofsales.pdf",
  html2canvas: { 
    dpi: 192,
    scale:4,
    letterRendering: true,
    useCORS: true,
    scrollY: 0
  },
  jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
};

export const print = () => {
  var element = document.querySelector(".pdf-file-download").cloneNode(true);
  element.style.transform = "translateY(-20px)";
  element.classList.remove("shadow-sm");
  element.classList.remove("mt-5");

  var smallerText = element.querySelectorAll(".pdf-edit-title-small");
  smallerText.forEach(elem => {
   elem.style.fontSize = ".7rem";
   elem.style.fontWeight = "500";
  });

  var smallerText = element.querySelectorAll(".pdf-edit-small-not");
  smallerText.forEach(elem => {
   elem.style.fontSize = ".9rem";
   elem.style.fontWeight = "500";
  });

  var remPad = element.querySelectorAll(".remove-tp-b-pad");
  remPad.forEach(elem => {
    elem.style.padding = "10px ";
   });

  var itemsSize = element.querySelectorAll(".item-size-pdf");
  itemsSize.forEach(elem => {
  elem.style.fontSize = ".6rem";
  elem.style.fontWeight = "500";
  });

  var itempadding = element.querySelectorAll(".remove-padding-tops-item-pdf");
  itempadding.forEach(elem => {
    elem.style.padding = "0px ";
    elem.style.marginBottom = "0px ";
  });


   
 
  //   elem.style.fontSize = ".8rem";
  // });

  // element.querySelector(".logo-box").style.width = "300px";
  // //element.querySelector(".logo-box").style.marginLeft = "-20px";
  // element.querySelector(".logo-box").style.marginTop = "20px";
  // var smallerText = element.querySelectorAll(".pdf-edit-title-small");
  // smallerText.forEach(elem => {
  //  elem.style.fontSize = ".7rem";
  //  elem.style.fontWeight = "500";
  // });

  // var smallerText = element.querySelectorAll(".print-heavy");
  // smallerText.forEach(elem => {
  //  elem.style.fontWeight = "500";
  // });

  // var smallerText = element.querySelectorAll(".pdf-edit-title");
  // smallerText.forEach(elem => {
  //  elem.style.fontWeight = "500";
  // });

  // element.querySelectorAll('.light-pd').forEach(elm => {
  //   elm.style.padding = "9px";
  // })

  // element.querySelectorAll('.light-padding').forEach(elm => {
  //   elm.style.padding = "15px 0";
  // })

  html2pdf().from(element).set(opt).save();
};

