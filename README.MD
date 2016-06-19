# Nitro Spec Recorder {NR}

Javascript User actions recorder and spec/test compiler


### Chrome extension:
  - Coming soon

### What It Does/Has:

  - tracks User Activity by listening to 4 event types:

      - "click"
      - "keyup"
      - "contextmenu"
      - "change"

  - user is able to actually build the end test spec from {NR} UI with appropriate codeblocks like expect(...), wait(...), log(...), that are defined by provided descriptor

  - {NR} produces end spec that can be used by a testrunner in a framework of choice based on the provided descriptor (basically can produce any code)

  - events propagation prevention is not going to block {NR}

  - All tracked by {NR} events are undoable/re-doable at any given point, as well as saving/loading tracking progress

  - Has a persistent local-storage, which allows not to lose tracking progress on page refresh

  - {NR} is shipped in a form of dev. chrome-extension that is easy to install and it can plugin in any web application


### Whom needs it?
 tests automations engineers to:
  - write automated End-to-End tests
  - reduce amount of boiler plate code to minimum
  - write less error-prone and more solid tests


### Technologies used:

  - React                                   - for rendering
  - Redux                                   - as store
  - Redux DevTools, DockMonitor, LogMonitor - as app's store manager and mutator
  - jtc                                     - code compiler
  - js-beautify                             - as compiled JTC output formatter
  - webpack                                 - as app bundler
  - babel                                   - for es6 to es5 transform


### Requirements:

  - Chrome  =^latest version
  - Chrome devtools
  - npm     =^latest version
  - webpack =^latest version


### Run and Build

  ```
  npm i
  npm i -g webpack
  webpack
  ```


### Usage

  1. Use chrome extension (COMMING SOON)
  2. import in your app using ```import Recorder from '<PATH_TO_FOLDER_WITH_RECORDER>';```
  3. Build the bundle with running ```webpack``` and injecting that though Chrome devtools

### Examples

  - https://github.com/ronanamsterdam/NitroRecorderSampleApp

### Documentation

  - https://github.com/ronanamsterdam/nitrorecorder/tree/master/docs
