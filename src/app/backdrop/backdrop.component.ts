import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { log } from 'console';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit{
  visualSettings$: Observable<boolean> = this.store.select((state) => state.appState.visualSettings);
  visualSettings:any;
  // movingParts = [{class:'background-color': 'hotpink'}]
  // movingParts: any = [
  //   {'font-family': 'Georgia', 'font-size': '2rem', 'background-color': 'lime', 'color': 'blue', 'padding': '1rem'},
  //   {'font-family': 'Georgia', 'font-size': '2rem', 'background-color': 'hotpink', 'color': 'blue', 'padding': '1rem'},
  //   {'font-family': 'Georgia', 'font-size': '2rem', 'background-color': 'crimson', 'color': 'blue', 'padding': '1rem'},
  //   {'font-family': 'Georgia', 'font-size': '2rem', 'background-color': 'yellow', 'color': 'blue', 'padding': '1rem'}

  // ]

  movingParts: string[] = [
    // 'width: 5rem; height: 5rem; background-Color: cornflowerblue; border: 2px dashed black; font-size: 1.5rem; color: grey; ',


  ]

  constructor(private store:Store) {}

  ngOnInit(): void {
        this.visualSettings$.subscribe((settings: any) => {
            this.visualSettings = settings;
            console.log(this.visualSettings);

    })
    for (let i = 0; i < 200; i++) {
      const size = String(0.1 + (Math.round(Math.random() -0.2) * 0.4))
      const top = String(Math.round(Math.random() * 100))
      const left = String(Math.round(Math.random() * 100))
      const scale = String(0.5 + (Math.round(Math.random()) * 0.5))
      // const background =  'linear-gradient(168deg, #58b580 0%, #a67be0 50%, #6624c0 100%)'
      const background =  'radial-gradient(circle, #ffffff7b 0%, #ffffff7d 10%, #ff179a63 55%, #1774ff70 80%, #fb00ff7b 100% )'
      // console.log(top);
      // console.log(left);
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
