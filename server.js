var koa = require("koa");
var send = require("koa-send");
var app = koa();

app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log("%s %s - %s", this.method, this.url, ms);
});

app.use(function *(next) {
  if (this.request.path.startsWith("/dist")) {
    yield send(this, this.request.path, {root: __dirname});
  } else {
    yield next;
  }
});

app.use(function *() {
  yield send(this, "index.html", {root: __dirname});
});

app.listen(8080);
console.log("Server started on 8080");
