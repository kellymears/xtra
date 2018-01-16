![Xtra](https://github.com/kellymears/xtra/blob/master/client/src/assets/img/xtra-medium.jpg)

# A non-exploitative Medium

![](https://github.com/kellymears/xtra/blob/master/client/src/assets/img/medium-pollock-banner.jpg)

* client must be run at `localhost:3000` for Auth0 authentication to function.
* client expects server to run at localhost:8888. that proxy is set in `./client/package.json`.

## Configuration Templates

A configuration template for `.gitignore` files are provided. They should both be modified to include your own connection details & renamed as such:

* MongoDB: `./models/config.template.js` becomes `./models/config.js`
* AWS: `./modules/awsConfig.template.js` becomes `./models/awsConfig.js`

## A note on licensing

This project is licensed under **CC BY-NC-SA**. You are free to use & modify this project however you like **as long as you do not profit from this work**. Normally I use MIT or GNU, but this project is specifically anticapitalist.

## Node Scripts

There are scripts in `package.json` that might be useful:

* `npm start` runs Xtra
* `npm run lint` will run eslint and conform code style to the project's.
* `npm xtra` will lint, start the server, and start the frontend using pipes. Note that you will not be able to monitor the output of the server console, only the client.
* if you want to run the client in a separate terminal window, you can run `npm start` from `./client`

### I'm sorry in advance.   

I am not a programmer. Definitionally speaking, I am a hack.

![I have no idea what I'm doing](https://carboncostume.com/wordpress/wp-content/uploads/2015/11/hackerman.jpg)
