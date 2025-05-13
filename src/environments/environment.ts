/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_ENDPOINT: 'http://localhost:5000/',
  BASEURL: "http://localhost:5000/",
  logo_URL : "assets/images/logo.png",
  logo_height : 55,
  logo_width : 200,
  Nb_dialogbox_close_while_click_outside : false,
  PasswordPattern :"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$",
  GOOGLE_MAP_DEFAULT_LOCATION : "Madurai, India",
  MAP_ZOOM: 10,
  GoogleMapKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k'
};
