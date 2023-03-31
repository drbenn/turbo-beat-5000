import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit{
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



  ngOnInit(): void {
    for (let i = 0; i < 250; i++) {
      const size = String(0.1 + Math.round(Math.random() * 1))
      const top = String(Math.round(Math.random() * 100))
      const left = String(Math.round(Math.random() * 100))
      const scale = String(0.5 + (Math.round(Math.random()) * 0.5))
      const background =  'linear-gradient(168deg, #58b580 0%, #a67be0 50%, #6624c0 100%)'
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




      this.movingParts.push(`width: ${size}rem; height: ${size}rem; background: ${background}; border: 2px solid #FFD1F37C; border-radius: 15px; bpx-shadow: 2px 2px 5px #FFFFFF; font-size: 1.5rem; color: grey; position: absolute; z-index: -5; top:${top}%; left: ${left}%; animation: ${selectedAnimation} 60s linear infinite`)
    }
  }

}
