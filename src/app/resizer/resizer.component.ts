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

handleUploadImage(input) {
        let fr = new FileReader();
        fr.readAsDataURL(input.target.files[0]);
        fr.onload = (e: any) => {
            this.updateCompanyLogo(input.target.files[0]);
            

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