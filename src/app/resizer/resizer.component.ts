import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-resizer",
	templateUrl: "./resizer.component.html",
	styleUrls: ["./resizer.component.css"]
})
export class ResizerComponent implements OnInit {
	ngOnInit() {}

handleUploadImage(input) {
        let fr = new FileReader();
        fr.readAsDataURL(input.target.files[0]);
        fr.onload = (e: any) => {
            //this.updateCompanyLogo(input.target.files[0]);

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
}