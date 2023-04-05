# Angular to namecheap
1. index.html base href =     <base href="./">
2. make sure all img, snd, vid references to assets folder use './assets/....'
    not '../../../../assets' or whatever
3. ng build
4. zip into 1 file contents of dist/charging-stations so index.html will be in root
5. in namecheap c-panel, public html folder
      - create 'charging-stations' folder
      - upload zipped file into 'charged-stations' folder
      - unzip within folder
      - site should be up and running within a minute




# TurboBeat5000

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
