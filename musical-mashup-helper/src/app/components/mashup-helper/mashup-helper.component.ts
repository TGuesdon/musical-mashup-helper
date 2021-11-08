import { Component, OnInit } from '@angular/core';
import { ControlsService } from 'src/app/services/controls.service';

@Component({
  selector: 'app-mashup-helper',
  templateUrl: './mashup-helper.component.html',
  styleUrls: ['./mashup-helper.component.scss']
})
export class MashupHelperComponent implements OnInit {

  constructor(
    public controlsService: ControlsService
  ) { }

  ngOnInit(): void {
    
  }

}
