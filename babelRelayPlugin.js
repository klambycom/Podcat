var babelRelayPlugin = require("babel-relay-plugin");
var introspectionQuery = require("graphql/utilities").introspectionQuery;
var request = require("sync-request");

//var graphqlUrl = "http://95.85.33.102/graphql";
var graphqlUrl = "http://localhost:4000/graphql";
var response = request("GET", graphqlUrl, {
  qs: {
    query: introspectionQuery
  }
});

var schema = JSON.parse(response.body.toString("utf-8"));

module.exports = babelRelayPlugin(schema.data, {
  abortOnError: true
});
