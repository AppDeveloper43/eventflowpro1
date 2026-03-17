import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  budget: number;
  status: string;
  notes: string;
}

interface EventInfo {
  name: string;
  type: string;
  date: string;
  venue: string;
  guests: number;
  budget: number;
  status: string;
  notes: string;
}

function formatPKR(n: number) {
  return "PKR " + n.toLocaleString("en-PK");
}

function addHeader(doc: jsPDF, title: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Burgundy header bar
  doc.setFillColor(128, 30, 60);
  doc.rect(0, 0, pageWidth, 38, "F");
  
  // Gold accent line
  doc.setFillColor(205, 164, 52);
  doc.rect(0, 38, pageWidth, 2, "F");
  
  // Logo text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("ShaadiPlanner", 15, 18);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Professional Wedding & Event Management", 15, 26);
  
  // Title on right
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, pageWidth - 15, 22, { align: "right" });
  
  // Date
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(220, 200, 200);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-PK")}`, pageWidth - 15, 30, { align: "right" });
  
  doc.setTextColor(0, 0, 0);
}

function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(128, 30, 60);
    doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
    doc.setTextColor(220, 200, 200);
    doc.setFontSize(7);
    doc.text("ShaadiPlanner — Pakistani Wedding & Event Management", 15, pageHeight - 6);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 6, { align: "right" });
  }
}

export function exportContactPDF(contact: ContactInfo) {
  const doc = new jsPDF();
  addHeader(doc, "Client Details");
  
  let y = 50;
  
  // Client name
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(128, 30, 60);
  doc.text(contact.name, 15, y);
  y += 5;
  
  // Status badge
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Status: ${contact.status.toUpperCase()}`, 15, y + 5);
  y += 15;
  
  // Divider
  doc.setDrawColor(205, 164, 52);
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);
  y += 10;
  
  // Details table
  const details = [
    ["Email", contact.email || "—"],
    ["Phone", contact.phone || "—"],
    ["Event Type", contact.eventType],
    ["Event Date", contact.eventDate || "TBD"],
    ["Expected Guests", String(contact.guests)],
    ["Budget", formatPKR(contact.budget)],
  ];
  
  autoTable(doc, {
    startY: y,
    head: [["Field", "Details"]],
    body: details,
    theme: "grid",
    headStyles: { fillColor: [128, 30, 60], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 10 },
    bodyStyles: { fontSize: 10 },
    alternateRowStyles: { fillColor: [252, 248, 244] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
    margin: { left: 15, right: 15 },
  });
  
  // Notes
  if (contact.notes) {
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(128, 30, 60);
    doc.text("Notes", 15, finalY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(contact.notes, 170);
    doc.text(lines, 15, finalY + 8);
  }
  
  addFooter(doc);
  doc.save(`${contact.name.replace(/\s+/g, "_")}_details.pdf`);
}

export function exportFullReport(clients: ContactInfo[], events: EventInfo[]) {
  const doc = new jsPDF();
  addHeader(doc, "Complete Report");
  
  let y = 50;
  
  // Summary section
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(128, 30, 60);
  doc.text("Summary", 15, y);
  y += 10;
  
  const totalBudget = clients.reduce((s, c) => s + c.budget, 0) + events.reduce((s, e) => s + e.budget, 0);
  const totalGuests = clients.reduce((s, c) => s + c.guests, 0) + events.reduce((s, e) => s + e.guests, 0);
  
  const summaryData = [
    ["Total Clients", String(clients.length)],
    ["Total Events", String(events.length)],
    ["Total Guests", String(totalGuests)],
    ["Total Budget", formatPKR(totalBudget)],
  ];
  
  autoTable(doc, {
    startY: y,
    body: summaryData,
    theme: "plain",
    bodyStyles: { fontSize: 11 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 60 } },
    margin: { left: 15, right: 15 },
  });
  
  y = (doc as any).lastAutoTable.finalY + 15;
  
  // Clients table
  if (clients.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(128, 30, 60);
    doc.text("Clients", 15, y);
    y += 5;
    
    autoTable(doc, {
      startY: y,
      head: [["Name", "Phone", "Event", "Date", "Guests", "Budget", "Status"]],
      body: clients.map((c) => [c.name, c.phone || "—", c.eventType, c.eventDate || "TBD", String(c.guests), formatPKR(c.budget), c.status]),
      theme: "grid",
      headStyles: { fillColor: [128, 30, 60], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [252, 248, 244] },
      margin: { left: 15, right: 15 },
    });
    
    y = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Events table
  if (events.length > 0) {
    if (y > 240) {
      doc.addPage();
      addHeader(doc, "Complete Report");
      y = 50;
    }
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(128, 30, 60);
    doc.text("Events", 15, y);
    y += 5;
    
    autoTable(doc, {
      startY: y,
      head: [["Event Name", "Type", "Date", "Venue", "Guests", "Budget", "Status"]],
      body: events.map((e) => [e.name, e.type, e.date || "TBD", e.venue || "—", String(e.guests), formatPKR(e.budget), e.status]),
      theme: "grid",
      headStyles: { fillColor: [128, 30, 60], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [252, 248, 244] },
      margin: { left: 15, right: 15 },
    });
  }
  
  addFooter(doc);
  doc.save(`ShaadiPlanner_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
