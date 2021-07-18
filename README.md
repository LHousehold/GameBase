# GameBase
Boilerplate for Azure-hosted web games

To run locally, Azure SWA emulator and Azure Functions Core Tools must be installed and configured with local settings.

0. Run `npm install` from these three directories: frontend, httpFunctions, triggerFunctions.
1. Build the frontend project with `npm run build` from the frontend directory.
2. From the top level directory, run `swa frontend/build --api httpFunctions`.
3. From the triggerFunctions directory, run `func start --port 7072`.

This project uses the SWA emulator to run the frontend project backed by an API as described in the httpFunctions directory.
It uses Azure function core tools to host the remaining non-http-based functions such as cosmosdb triggers, which are under the triggerFunctions directory.
