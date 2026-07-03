export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT ?? '7000', 10),
    environment: process.env.NODE_ENV,
  },
});