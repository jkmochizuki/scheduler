# Interview Scheduler

React scheduler application that allows users to book and cancel interviews. It combines a concise API with a WebSocket server to build a realtime experience.

## Final Product

#### A user can switch between weekdays:

![gif switch weekdays"](https://github.com/jkmochizuki/scheduler/blob/master/docs/days.gif)

#### A user can book an interview by entering the student name and selecting the interviewer. The remaining spots counter updates dynamically:

![gif book interview"](https://github.com/jkmochizuki/scheduler/blob/master/docs/book_an_interview.gif)

#### A user can edit the details or cancel an existing interview:

![gif edit and delete interview"](https://github.com/jkmochizuki/scheduler/blob/master/docs/edit_and_delete_interviews.gif)

#### A user is shown an error if an interview cannot be saved or deleted:

![gif error handling"](https://github.com/jkmochizuki/scheduler/blob/master/docs/error_handling.gif)

#### The client application communicates with a WebSocket server. When a user books or cancels an interview, all connected users see the update in their browser:

![gif websocket server"](https://github.com/jkmochizuki/scheduler/blob/master/docs/websocket_server.gif)

## Getting Started

- Clone this repository: git clone git@github.com:jkmochizuki/scheduler.git
- cd scheduler
- Install dependencies with `npm install`
- Run webpack development server with `npm start`
- Go to http://localhost:8000/ in your browser

### API Server

In another terminal window:
- Clone the API server repository: https://github.com/lighthouse-labs/scheduler-api
- Follow the instructions in the README file

### Running Tests

#### Jest Test Framework

```sh
npm test
```

#### Storybook Visual Testbed

```sh
npm run storybook
```

#### Cypress

```sh
npm run cypress
```

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts