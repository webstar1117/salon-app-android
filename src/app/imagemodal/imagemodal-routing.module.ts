import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagemodalPage } from './imagemodal.page';

const routes: Routes = [
  {
    path: '',
    component: ImagemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagemodalPageRoutingModule {}
