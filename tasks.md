# Setup

## Installation

Run the following command from the root folder of the cloned project to install all dependencies.

`npm install`

## Verify Setup

In order to verify that everything is setup correctly, run the following command, which should show you the failing tests. This is good! We'll be fixing these tests once we jump into the build step.

`npm run test`

Every time you want to check your work locally you can type that command, and it will report the status of every task in that module.

As you move through the modules, you can run module-specific tests with the script `npm run test:module1`, replacing the number with one that corresponds with the module you are working in.

You can also run a visual test using the command `npm run visual:module1`, replacing the number with one that corresponds with the module you are working in.

## Previewing Your Work

In order to see your changes in a browser, you can run `npm start` from the command line. This will open a browser and you should see your landing page.

# Module 01 - Main game loop

## 1.1 - Reference an external script

@external-script Open `index.html` and add a `script` tag that references the CreateJS on the CreateJS CDN. Also add a `script` tag for the `app.js` file.

## 1.2 - Listen for DOMContentLoaded

@listen-domcontentloaded Open `app.js` and add an event lister to the `document`. Listen for the `DOMContentLoaded` event. The event handler should be an anonymous function.

## 1.3 - Key code constants

@keycode-constants At the top of the event handler anonymous function. Declare 4 constants called `KEYCODE_LEFT`, `KEYCODE_UP`, `KEYCODE_RIGHT`, and `KEYCODE_DOWN`. Assign them the values 37, 38, 39 and 40 respectively.

## 1.5 - Create a stage

@create-stage Below the key code constants assign a constant called `stage` a `new createjs Stage`. Make sure that you have the proper ID.

## 1.6 - Create a shape

@shio-shape Below the `stage` constant, assign a  Assign a constant called `ship` a `new createjs Shape`.

## 1.7 - Draw the ship shape

@draw-ship On the `graphics` layer of the `ship` shape draw a white ship with the following points (0, 0); (30, 15); (0, 30); (7.5, 15); (0, 0);

## 1.8 - Add a shape to the stage

@ship-addchild Add the `ship` Shape to the `stage`.

## 1.9 - Ticker event listener

@ticker-event-listener Using the `createjs.Ticker` object and the on method, register a handler for the "tick" event. The handler function should be and anonymous function that updates the `stage`.

## 1.10 - Ticker FPS

@Ticker-fps Use `createjs.Ticker` object and `setFPS()` to set the frame per second to 30.

## 1.11 - Keyboard listener

@keyboard-listener Listen for when a user presses a key down. The handler should be called be and anonymous function with an `event` argument.

## 1.12 - Switch statement

@switch-statement Create a new switch statement and test the event.keyCode

## 1.13 - Left key

@left-key Create a case for KEYCODE_LEFT that moves the ship left at the rate 15 pixels. Break out of this case.

## 1.14 - Up key

@up-key Create a case for KEYCODE_UP that moves the ship up at the rate 15 pixels. Break out of this case.

## 1.15 - Right key

@up-key Create a case for KEYCODE_RIGHT that moves the ship right at the rate 15 pixels. Break out of this case.

## 1.16 - Down key

@down-key Create a case for KEYCODE_DOWN that moves the ship right at the rate 15 pixels. Break out of this case.