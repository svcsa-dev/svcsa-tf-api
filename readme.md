# svcsa-tf-api

> SVCSA track & field RESTful API

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/svcsa-tf-api
    npm install
    ```

3. Start local app for development

  ```
  npm run dev
  ```

4. Build app for production

    ```
    npm run compile # Compile TypeScript source
    npm start
    ```

## API Documentation

```
/docs/
```

## Service Folder Structure

```
- Services
 | -- track-field
   |-- player
   |-- team
 | -- basketball
   | -- player
   | -- team
```

- Two top level modules: `track-field` and `basketball`
- Track & field services should be prefix by `tf-`
- Basketball services should be prefix by `bb-`
- 


## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
