import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-lorry-print',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './lorry-print.component.html',
  styleUrls: ['./lorry-print.component.scss']
})
export class LorryPrintComponent {
  @Input() lrData: any;
  @ViewChild('printArea', { static: false }) printArea!: ElementRef;

  generatePdf(orderId: string, action: 'download' | 'print' = 'download') {
    const element = this.printArea.nativeElement;
    
    // Temporarily make it visible for capture
    element.style.position = 'relative';
    element.style.left = '0';
    element.style.visibility = 'visible';

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      // Restore offscreen styles
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.visibility = 'hidden';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      if (action === 'print') {
        const blob = pdf.output('blob');
        const blobUrl = URL.createObjectURL(blob);
        
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        iframe.src = blobUrl;
        
        document.body.appendChild(iframe);
        
        iframe.onload = () => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          setTimeout(() => {
            document.body.removeChild(iframe);
            URL.revokeObjectURL(blobUrl);
          }, 3000);
        };
      } else {
        pdf.save(`Lorry_Receipt_${orderId || 'Download'}.pdf`);
      }
    }).catch(err => {
      console.error('Error generating PDF:', err);
      // Restore styles in case of error
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.visibility = 'hidden';
    });
  }

  getPdfBase64(orderId: string): Promise<string> {
    const element = this.printArea.nativeElement;
    
    element.style.position = 'relative';
    element.style.left = '0';
    element.style.visibility = 'visible';

    return html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.visibility = 'hidden';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      return pdf.output('datauristring');
    }).catch(err => {
      console.error('Error generating PDF base64:', err);
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.visibility = 'hidden';
      throw err;
    });
  }
}
