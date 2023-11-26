import express from 'express';
import path from 'path';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(path.resolve(), 'public')));

app.get('/', (request, response) => {
      response.sendFile('index.html');
});
app.post('/result', (request, response)=> {
      const a2 = parseFloat(request.body.a2Value);
      const b2 = parseFloat(request.body.b2Value);

      if (isNaN(a2) || isNaN(b2)) {
            response.send("You must use only numbers");
      } else {
      // Pythagoras triangle formula: a^2+b^2=c^2
      const result = Math.sqrt(a2**2 + b2**2).toFixed(2);
      response.send(
          "a^2: " + (a2**2) + "<br>" +
          "b^2: " + (b2**2) + "<br>" +
          "The result is: " + result
      );
      }
});

const server = app.listen(8000, () => console.log('Listening on port 8000...'));
export { server };