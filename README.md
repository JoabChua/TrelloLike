# Trello Like Application

## Usage

This application is developed in a span of 2 days. The scope of this application is closely aligned with the requirement given by the company.

#### To run and test this application on local machine

1. git clone from this repo.
```bash
git clone https://github.com/JoabChua/TrelloLike.git
```
2. Install the dependencies that are required to serve this on a localhost server.
```bash
npm install
```
3. To run and start the application, run the command below.
```bash
npm start
```
4. Head over to your browser. [click here](http://localhost:8080) to open.
5. For unit test of the project, the test coverage involves mocking db.json data in the test file to simulate GET, POST, DELETE, PUT, PATCH without making HTTP call. In addition, it covers most of the JS functions that are used in the application. The framework used for testing is JEST. 
```bash
npm test
```
6. After which the result of the test will be shown. 

## Further Improvement

1. This project can be further improved by implementing checks upon deletion. 
2. The drag and drop component can be more intuitive and more seamless given more freedom on the use of other helper libraries. 
3. More animations could have been added to improve on the user experience.

## Copyright

This application is fully created from scratch by JoabChua without using any web application framework, instead using pure vanilla HTML, JS and CSS. 

## Limitation

I have to agree that this project is not coded in the most elegant way, given the time and freedom constraints that I am given. However, it fulfils all the functionalities that are required. 