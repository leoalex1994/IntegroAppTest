// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ubits: {
    uuid: "5be207dd-2964-4918-9841-d9a222b01ec4",
    url: "https://www.ubitslearning.com/login/index.php",
  },
  uakika: {
    url: "https://epicc.uakika.com/",
    token: "https://integroepicc.com:8080/api/uakika.php",
  },
  factorh: {
    url: "https://integro.factor-rh.com/portalusuario.php/seguridad/integroSSOLogin",
    token: "https://integroepicc.com:8080/api/factorh.php",
    urlNotificaciones:"https://api.integro.factor-rh.com/api"
  },
  hrider: {
    url: "https://www.hrider.net/",
  },
  endpoints: {
    encrypt: "https://integroepicc.com:8080/api/encription.php",
  },
  // Test
  //path: "https://integro-api.genbri.com/api",
  // Local
   path: "https://integroepiccapp.integroepicc.com:5001/api",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
