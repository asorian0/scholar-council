// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    userPoolId: 'eu-west-1_texAdvEA5',
    userPoolWebClientId: '7qlb1424lcc96oko59rrmqiqgu',
    endpoint: 'https://scholar-council.auth.eu-west-1.amazoncognito.com',
    oauth: {
      scope: ['openid', 'profile', 'email'],
      redirectSignIn: 'http://localhost:4200',
      redirectSignOut: 'http://localhost:4200',
      domain: 'scholar-council.auth.eu-west-1.amazoncognito.com',
      responseType: 'code',
    },
    region: 'eu-west-1',
  },
  apiUrl:
    'https://jhcdrqu4hzaqlmwozljo63rcom.appsync-api.eu-west-1.amazonaws.com/graphql',
  apiKey: 'da2-zqwoq4nzufdu3frkgqymruwafi',
  title: 'Consejo Escolar',
  subtitle: 'CEIP Mariana Pineda',
  supportEmail: 'asoriano.dev@gmail.com',
  supportSubject: 'Contacto%20Consejo%20Escolar',
  repoUrl: 'https://github.com/asorian0/scholar-council',
  defaultLanguage: 'es',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
