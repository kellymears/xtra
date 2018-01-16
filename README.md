![Xtra](https://github.com/kellymears/xtra/blob/master/client/src/assets/img/xtra-medium.jpg)

# A non-exploitative Medium

![](https://github.com/kellymears/xtra/blob/master/client/src/assets/img/medium-pollock-banner.jpg)

## Node Scripts

There are scripts in `package.json` that might be useful:

* `npm start` from `./` runs Xtra's Express API
* `npm start` from `./client/` runs Xtra's React front-end.
* `npm run lint` will run eslint with `--fix` to conform code style to the project's style. Please do this before submitting a PR (glad to have you, by the way)
* `npm xtra` will lint, start the server, and start the frontend using pipes. Note that you will not be able to monitor the output of the server console, only the client.

## Things to know.

* client must be run at `localhost:3000` for Auth0 authentication to function.
* client expects server to run at localhost:8888. this proxy is specified in `./client/package.json`.

### Configuration Templates for sensitive data

A configuration template for sensitive `.gitignore` files are provided. They should both be modified to include your own connection details & renamed as such:

* MongoDB: `./models/config.template.js` becomes `./models/config.js`
* AWS: `./modules/awsConfig.template.js` becomes `./models/awsConfig.js`

### Licensing

This project is licensed under **CC BY-NC-SA**. You are free to use & modify this project however you like **as long as you do not profit from this work**. Normally I use MIT or GNU, but this project is specifically anticapitalist.

Note: I do plan on using Xtra to raise money *through a donation model* in my production instance. This money will go straight to the authors of content, if they want to enable this "tipping" feature.

## I'm sorry in advance.   

I am not a programmer. Definitionally speaking, I am a hack.

![I have no idea what I'm doing](https://carboncostume.com/wordpress/wp-content/uploads/2015/11/hackerman.jpg)
