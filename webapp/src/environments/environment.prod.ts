export const environment = {
  production: true,
  auth: {
    userPoolId: 'eu-west-1_texAdvEA5',
    userPoolWebClientId: '7qlb1424lcc96oko59rrmqiqgu',
    endpoint: 'https://scholar-council.auth.eu-west-1.amazoncognito.com',
    oauth: {
      scope: ['openid', 'profile', 'email'],
      redirectSignIn:
        'https://consejo-escolar.ceip-mariana-pineda.click',
      redirectSignOut:
        'https://consejo-escolar.ceip-mariana-pineda.click',
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
