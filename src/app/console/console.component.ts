import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { log } from 'console';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  @Select(state => state.appState.percussionPlaying) beatPlaying$:Observable<boolean>;
  isBeat: boolean = true;

  visuals: string[] = [];
  visualsOne: string[] =[];
  visualsTwo: string[] = [];
  visualsThree: string[] = [];
  visualsFour: string[] = [];
  visualsFive: string[] = [];

  ngOnInit(): void {
    this.beatPlaying$.subscribe((beat) => {
      this.isBeat = beat;
    })

    this.getRandomColorArray('visuals')
    this.getRandomColorArray('visualsOne')
    this.getRandomColorArray('visualsTwo')
    this.getRandomColorArray('visualsThree')
    this.getRandomColorArray('visualsFour')
    this.getRandomColorArray('visualsFive')

      if (typeof window !== 'undefined'){
        window.setInterval(() => this.click(), 1); // time called at ongoing interal, thus this.count +=1 to accumulate change of time
      }

  }

  getRandomColorArray(arrayName:string) {
    for ( let i = 0 ; i < 5 ; i++ ) {
      let color:string;
      let randomNum: number = Math.random()
      if (randomNum > 0 ) {
        color = 'white'
      }
      if (randomNum > 0.25 ) {
        color = 'black'
      }
      if (randomNum > 0.50 ) {
        color = 'grey'
      }
      if (randomNum > 0.75 ) {
        color = 'hotpink'
      }


      this[arrayName].push(`background-Color: ${color};`)

    }
  }

  click() {
    if (this.isBeat) {
      let randomNum: number = Math.random()
      if (randomNum > 0 ) {
        this.visuals = this.visualsOne
      }
      if (randomNum > 0.20 ) {
        this.visuals = this.visualsTwo
      }
      if (randomNum > 0.40 ) {
        this.visuals = this.visualsThree
      }
      if (randomNum > 0.60 ) {
        this.visuals = this.visualsFour
      }
      if (randomNum > 0.80 ) {
        this.visuals = this.visualsFive
      }
    }
  }
}
