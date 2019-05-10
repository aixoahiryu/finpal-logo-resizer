import { Directive, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[autoResize]'
})
export class AutoResizeDirective {

  constructor(private el: ElementRef) { }

  @Output
  public autoResize = new EventEmitter();

  @HostListener('change', ['$event']) onChange(event) {
    let fr = new FileReader();
    fr.readAsDataURL(event.target.files[0]);
    fr.onload = (e: any) => {
      // Max size for thumbnail
      var base64 = fr.result
      const maxHeight = 50;
      const self = this;

      // Create and initialize two canvas
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      // Create original image
      var img = new Image();
      img.onload = (() => {
        // Determine new ratio based on max size
        var ratio = 1;
        if (img.height > maxHeight)
          ratio = maxHeight / img.height;

        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

        var img64 = canvas.toDataURL();
        //self.proceedEvent(AdminInfoEvent.UPLOAD_LOGO, self.convertBase64ToFile(img64, self.createRandomString()));
        console.log(img64);
        var img2 = new Image();
        img2.setAttribute('display','block');
        img2.setAttribute('top','10px');
        img2.src = img64;
        document.body.appendChild(img2);
      })
      img.src = base64 as string;
    }
  }
}
