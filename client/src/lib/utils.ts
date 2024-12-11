import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle null or undefined values
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const downloadPDF = (data) => {
  const role = localStorage.getItem("role");

  if (!data) return null;
  let name, email, offer;
  if (role === "candidate") {
    offer = data;
  } else {
    ({ name, email, offer } = data || {});
  }
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;

  // Helper function to add multiline text
  const addMultilineText = (text, x, y, maxWidth) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length;
  };

  // Add company logo placeholder
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, margin, 40, 20, "F");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("LOGO", margin + 12, margin + 12);

  // Add current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(
    currentDate,
    pageWidth - margin - doc.getTextWidth(currentDate),
    margin + 10
  );

  // Add title
  let yPosition = margin + 40;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  const title = "OFFER LETTER";
  doc.text(title, pageWidth / 2 - doc.getTextWidth(title) / 2, yPosition);

  // Add greeting
  yPosition += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    `Dear ${role === "recruiter" ? name : offer.candidate.name},`,
    margin,
    yPosition
  );

  // Add opening paragraph
  yPosition += 15;
  const openingText = `We are pleased to offer you the position of ${offer.jobTitle} at ${offer.companyName}. We believe your skills and experience are an excellent match for our company.`;
  const linesUsed = addMultilineText(
    openingText,
    margin,
    yPosition,
    pageWidth - 2 * margin
  );
  yPosition += linesUsed * 5;

  // Add offer details table
  yPosition += 15;
  doc.autoTable({
    startY: yPosition,
    margin: { left: margin },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 80 },
      1: { cellWidth: pageWidth - 2 * margin - 10 },
    },
    body: [
      ["Position", capitalizeFirstLetter(offer.jobTitle)],
      ["Department", capitalizeFirstLetter(offer.department)],
      ["Location", capitalizeFirstLetter(offer.location)],
      ["Start Date", formatDate(offer.startDate)],
      ["Job Type", capitalizeFirstLetter(offer.jobType)],
      ["Salary", "$" + capitalizeFirstLetter(offer.salary)],
    ],
    theme: "plain",
    styles: {
      fontSize: 11,
      cellPadding: 5,
    },
  });

  yPosition = doc.lastAutoTable.finalY + 15;

  // Add job description
  doc.setFont("helvetica", "bold");
  doc.text("Job Description", margin, yPosition);
  yPosition += 10;
  doc.setFont("helvetica", "normal");
  const descLines = addMultilineText(
    offer.jobDescription,
    margin,
    yPosition,
    pageWidth - 2 * margin
  );
  yPosition += descLines * 7 + 15;

  // Add benefits section
  doc.setFont("helvetica", "bold");
  doc.text("Benefits Package", margin, yPosition);
  yPosition += 10;
  doc.setFont("helvetica", "normal");

  offer.benefits?.forEach((benefit) => {
    doc.text("• " + benefit, margin + 5, yPosition);
    yPosition += 7;
  });

  // Add signature section
  if (yPosition + 80 > pageHeight) {
    doc.addPage();
    yPosition = margin;
  }

  yPosition += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Acceptance of Offer", margin, yPosition);

  yPosition += 20;

  // Add recruiter signature if available
  if (offer.recruiterSignature) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(offer.recruiterSignature, margin, yPosition - 5);
  }
  doc.line(margin, yPosition, margin + 70, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text("Company Representative", margin, yPosition + 10);

  // Add candidate signature if available
  if (offer.candidateSignature) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(offer.candidateSignature, pageWidth - margin - 70, yPosition - 5);
  }
  doc.line(pageWidth - margin - 70, yPosition, pageWidth - margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text("Candidate Signature", pageWidth - margin - 70, yPosition + 10);

  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  const footerText = `${offer.companyName} - ${offer.companyEmail}`;
  doc.text(
    footerText,
    pageWidth / 2 - doc.getTextWidth(footerText) / 2,
    pageHeight - 10
  );

  // Save the PDF
  doc.save(`${offer.candidate.name}_Offer_Letter.pdf`);
};
