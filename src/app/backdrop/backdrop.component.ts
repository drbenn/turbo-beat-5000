import { style, transition, trigger, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { log } from 'console';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1400ms ease-out',
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('1400ms ease-in',
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class BackdropComponent implements OnInit{
  visualSettings$: Observable<boolean> = this.store.select((state) => state.appState.visualSettings);
  visualSettings:any;
  movingParts: string[] = []

  constructor(private store:Store) {}

  ngOnInit(): void {
        this.visualSettings$.subscribe((settings: any) => {
            this.visualSettings = settings;

    })
    for (let i = 0; i < 200; i++) {
      const size = String(0.1 + (Math.round(Math.random() -0.2) * 0.4))
      const top = String(Math.round(Math.random() * 100))
      const left = String(Math.round(Math.random() * 100))
      const scale = String(0.5 + (Math.round(Math.random()) * 0.5))
      const background =  'radial-gradient(circle, #ffffff7b 0%, #ffffff7d 10%, #ff179a63 55%, #1774ff70 80%, #fb00ff7b 100% )'
      let selectedAnimation:string;

      if (i % 1 === 0) {
        selectedAnimation = 'part-anim-1'
      }
      if (i % 2 === 0) {
        selectedAnimation = 'part-anim-2'
      }
      if (i % 3 === 0) {
        selectedAnimation = 'part-anim-3'
      }
      if (i % 4 === 0) {
        selectedAnimation = 'part-anim-4'
      }

      this.movingParts.push(`width: ${size}rem; height: ${size}rem; background: ${background}; border: 0px solid #FFD1F37C; border-radius: 10rem; bpx-shadow: 2px 2px 5px #FFFFFF; font-size: 1.5rem; color: grey; position: absolute; z-index: -5; top:${top}%; left: ${left}%; animation: ${selectedAnimation} 35s linear infinite`)
    }
  }

}
