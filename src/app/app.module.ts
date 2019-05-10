import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ResizerComponent } from './resizer/resizer.component';
import {AutoResizeDirective} from './directives/auto-resize';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, ResizerComponent, AutoResizeDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
