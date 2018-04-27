# Formula 1 Highlight Project

## [Live Demo](https://f1highlight.triadiprabowo.com)

Project built using Angular-CLI 1.3.0 and Angular 4, this project using Karma and Jasmine as unit testing, lazy-load design pattern, AoT compilation, shared modules/components to be reusable and reactive programming. 

Optimization after running build production using Gulp, rendering gzip file to compress more file size, optimize image size, GZIP enabled.

### Command List
* `npm start` - run local development server (livereload) on localhost:4200
* `npm test` - run unit test
* `npm run build` - build development mode (no optimization)
* `npm run build:prod` - build production mode
* `npm start:prod` - start server production using pm2 on port 4000
* `npm stop:prod` - stop production server from pm2
* `npm restart:prod` - restart production server

### Work Reproduction
* Spending 3-5 hours each day, finishing in 3 days
* First, write test cases & designing application structure
* Secondly, start development by making required services and components
* Third, prettify user interface
* Fourth, making the UI design to be responsive
* Fifth, tweaking unit test and run test
* Finally, create optimization with Gulp for postbuild as AngularCLI is not giving webpack config unless we are doing `ng eject`

### Story Summary
- Day 1, write test case & designing application structure
- Day 2, making season and season detail component
- Day 3, prettify UI, responsive design, tweak unit test, create optimize, deploy

### UI/UX Concept
User interface/experience designed with eye appealing and user-friendly for mobile user / desktop user concept.

### PageSpeed
Using lazy-load pattern, requesting dependencies on demand and enabling GZIP compression in application proven to be speed up page load time and application download size which is good for low-end user (slow connection).
![Live Demo Pagespeed](https://preview.ibb.co/gbEbTc/Screenshot_from_2018_04_28_04_28_03.png)