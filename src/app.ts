import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const env = nunjucks.configure([
  'node_modules/govuk-frontend/dist',
  'views'
], {
    autoescape: true,
    express: app
});

app.listen(process.env.port || 3000, () => {
    console.log("Application running");
});

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 } }));

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

app.use(express.static('node_modules/govuk-frontend/dist/govuk/'))
app.use(express.static('node_modules/govuk-frontend/dist/govuk/assets'))
app.use(express.static('static/'));

app.get('/', function(req, res){ res.render('index.njk'); });

app.get('*', function(req, res){ res.render('errors/404.njk'); });