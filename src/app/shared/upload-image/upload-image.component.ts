import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
})
export class UploadImageComponent {
  imageList: { fileUrl: string; file: File }[] = [];
  @Output() imageListChange: EventEmitter<{ fileUrl: string; file: File }[]> =
    new EventEmitter();

  private processFile(file: File): { fileUrl: string; file: File } {
    const reader = new FileReader();
    let fileData: { fileUrl: string; file: File } = { fileUrl: '', file: file };
    reader.onload = (e: any) => {
      fileData.fileUrl = e.target.result;
    };
    reader.readAsDataURL(file);
    return fileData;
  }

  handleImageUpload(info: any): void {
    if (info.target.files !== this.imageList.map((img) => img.file)) {
      this.imageList = [];
    }
    const files = Array.prototype.slice.call(info.target.files);
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageList.push(this.processFile(file));
      };
      reader.readAsDataURL(file);
    }
    this.imageListChange.emit(this.imageList);
  }
}
