import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-resizer",
	templateUrl: "./resizer.component.html",
	styleUrls: ["./resizer.component.css"]
})
export class ResizerComponent implements OnInit {
	ngOnInit() {}
  logoFileImage: File;
  companyResource: CompanyResource = new CompanyResource();
  originalBase64:any;

handleUploadImage(input) {
        let fr = new FileReader();
        fr.readAsDataURL(input.target.files[0]);
        fr.onload = (e: any) => {
            this.updateCompanyLogo(this.resizeBase64(fr.result, 200, 50));
            //this.updateCompanyLogo(fr.result);
            this.originalBase64 = fr.result;
            
            console.log(this.companyResource.companyLogoPath);
            console.log(input.target.files);
            // Crop image section
            //===============================================================================================
            // let image = new Image();
            // image.src = e.target.result;
            // image.onload = () => {
            //     let proportion = image.width / image.height
            //     // if proportion of image's width and height is in acceptable range => auto upload
            //     if (proportion >= 2.5 && proportion <= 3.5) {
            //         this.handleFinalImage(image.src);
            //     }
            //     // show croptool if image larger than it should AND doesn't match proportion.
            //     if (image.width > 150 && image.height > 50 && (proportion < 2.5 || proportion > 3.5)) {
            //         this.cropImage.showCropTool(input.target.files[0]);
            //     }
            //     // show alert if image too small
            //     if ((image.width < 150 || image.height < 50) && (proportion < 2.5 || proportion > 3.5)) {
            //         this.confirmationDialogService.showModal({
            //             title: "Warning",
            //             message: "Please select an image with recommended size 150 x 50 pixels.",
            //             btnOkText: "OK"
            //         });
            //     }
            // }
        }

    }
  
  handleFinalImage(base64: any) {
        $("#logoImage").attr('src', base64);
        this.logoFileImage = this.convertBase64ToFile(base64, this.createRandomString());
        
        this.updateCompanyLogo(this.logoFileImage);
  }

  resizeBase64(base64, maxWidth, maxHeight){


  // Max size for thumbnail
  if(typeof(maxWidth) === 'undefined')  maxWidth = 500;
  if(typeof(maxHeight) === 'undefined')  maxHeight = 500;

  // Create and initialize two canvas
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var canvasCopy = document.createElement("canvas");
  var copyContext = canvasCopy.getContext("2d");

  // Create original image
  var img = new Image();
  img.src = base64;

  // Determine new ratio based on max size
  var ratio = 1;
  if(img.width > maxWidth)
    ratio = maxWidth / img.width;
  else if(img.height > maxHeight)
    ratio = maxHeight / img.height;

  // Draw original image in second canvas
  canvasCopy.width = img.width;
  canvasCopy.height = img.height;
  copyContext.drawImage(img, 0, 0);

  // Copy and resize second canvas to first canvas
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL();



 }

  //===========================================================================

  private updateCompanyLogo(input)
  {
    this.companyResource.companyLogoPath = input;
  }

  private dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }

  convertBase64ToFile(base64: any, fileName: string, option?: any): any {
    if (base64) {
      let tempBlob: Blob = this.dataURItoBlob(base64);
      // let listBlob: any[] = [tempBlob];
      // let file = new File(listBlob, fileName, option);

      return tempBlob;
    } else
      return null;
  }
}

class CompanyResource {
    id: string;
    crmurl: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    phone: string;
    email: string;
    companyLogoPath: string;
    //socialMedias: SocialMedias[];
    registerName: string;
    registerNumber: number;
    licenseNumber: number;
}