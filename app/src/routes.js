export default [
  {
    name: 'Home',
    path: '/',
    component: require('@/components/PageHome').default,
  },
  {
    name: 'Languages',
    path: '/languages/:language?',
    component: require('@/components/PageLanguages').default,
  },
  {
    name: 'Users',
    path: '/users/:author?',
    component: require('@/components/PageUsers').default,
  },
  {
    name: 'Profile',
    path: '/profile',
    component: require('@/components/PageProfile').default,
  },
  {
    name: 'Snippet',
    path: '/snippet/:snippet',
    component: require('@/components/PageSnippet').default,
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: require('@/components/PageNotFound').default,
  },
]
