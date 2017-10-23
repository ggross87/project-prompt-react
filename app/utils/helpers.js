// Include the Axios library for HTTP requests
var axios = require("axios");

//  API Key
// var APIKey = "";

var helper = {
  runQuery: function(topic, startYear, endYear) {
    console.log("SEARCHING FOR " + topic);
    var queryURL = "http://arrive-interview-api.azurewebsites.net/api/carriers";
    return axios.get(queryURL).then(function(response) {
      var results = [];
      // If get a result, return that result's formatted address property
      if (response.data.results[0]) {
        for(var i = 0; i<5; i++){
          results.push(response.data.results[i].formatted);
        }
        console.log(results);
        return results;
      } else{
        // If we don't get any results, return an empty string
        return "No carrier's found.";
      }
    });
  },
  getSaved: function(){
    return axios.get('/api/saved');
  },

  postSaved: function(article){
    return axios.post('/api/saved', {carrier: carrier});
  },

  deleteSaved: function(id){
     return axios.delete('/api/saved/' + id);
  }
};

module.exports = helper;
