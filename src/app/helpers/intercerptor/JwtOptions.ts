export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    skipWhenExpired: true,
    allowedDomains: ['locage.herokuapp.com'],
    disallowedRoutes: [],
  };
}
