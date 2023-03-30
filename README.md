# Interview Scheduler

React scheduler application that allows users to book and cancel interviews. It combines a concise API with a WebSocket server to build a realtime experience.

## Final Product

### A user can switch between weekdays:

![gif switch weekdays"]()

### A user can book an interview by entering the student name and selecting the interviewer. The remaining spots counter updates dynamically:

![gif book interview"]()

### A user can edit the details or cancel an existing interview:

![gif edit and delete interview"]()

### A user is shown an error if an interview cannot be saved or deleted:

![gif error handling"]()

### The client application communicates with a WebSocket server. When a user books or cancels an interview, all connected users see the update in their browser:

![gif websocket server"]()

## Getting Started

- Clone this repository: git clone git@github.com:jkmochizuki/scheduler.git
- cd scheduler
- Install dependencies with `npm install`
- Run webpack development server with `npm start`
- Go to http://localhost:8000/ in your browser

### API Server

In another terminal window:
- Clone the API server repository: git@github.com:jkmochizuki/scheduler-api.git
- cd scheduler-api
- Run the API server with `npm start`

### Jest Test Framework

```sh
npm test
```

### Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts