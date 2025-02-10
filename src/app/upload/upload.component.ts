import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-upload',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadMessage: string = '';
  excelData: any[][] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      this.uploadMessage = "No file selected.";
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/api/upload', formData).subscribe({
      next: (response) => {
        this.uploadMessage = "File uploaded successfully!";
      },
      error: (error) => {
        console.error("Upload error:", error);
        this.uploadMessage = "Error uploading file.";
      }
    });
  }
}