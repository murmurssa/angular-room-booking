import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../../services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  room1: Event[];
  room2: Event[];
  room3: Event[];
  eventForm: FormGroup;

  constructor(private apiservice: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.getEvent();
  }

  getEvent(): void {
    this.apiservice.getEventData().subscribe(data => {
      this.room1 = data[0];
      this.room2 = data[1];
      this.room3 = data[2];
    });
  }

  submit(): void {
    this.apiservice.addEvent({
      title: this.eventForm.controls.title.value,
      date: this.eventForm.controls.date.value,
      timeStart: this.eventForm.controls.timeStart.value,
      timeEnd: this.eventForm.controls.timeEnd.value,
      roomId: this.eventForm.controls.roomId.value
    });
    this.getEvent();
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      title: [[''], [
        Validators.required,
        Validators.pattern(/[A-zА-я0-9,]/)
      ]
      ],
      date: [[], Validators.required],
      timeStart: [[], Validators.required],
      timeEnd: [[], Validators.required],
      roomId: ['1']
    });
  }
}
