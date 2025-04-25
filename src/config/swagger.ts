
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Snapify API',
//       version: '1.0.0',
//     },
//   },
//   apis: [path.join(__dirname, '../../docs/swagger.yaml')],
// }; 
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Snapify API',
      version: '1.0.0',
      description: 'A RESTful image-sharing backend using Node.js, PostgreSQL, and Cloudinary.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local development server',
      },
    ],
  },
  apis: [path.join(__dirname, '../../docs/swagger.yaml')],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);