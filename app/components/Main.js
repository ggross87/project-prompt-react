//Dependencies
var React = require('react');

// Here I include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to my API's
var helpers = require("./utils/helpers");

//creating Main Component to search and fetch results
var Main = React.createClass({
  getInitialState: function(){
    return { search: ["","",""], results: []};
  },
  //loads when page is ready
  componentDidMount: function(){
    //gets all saved articles
    helpers.getSaved().then(function(response) {
      console.log("Saved: " + response.data);
      this.setState({ saved: response.data });
    }.bind(this));
  },
  //any time a component changes, it updates
  componentDidUpdate: function(){
    var searchTerms = this.state.search;
      // Run the query for the address
      helpers.runQuery(searchTerms[0], searchTerms[1], searchTerms[2]).then(function(data) {
        if(data !== this.state.results){
          console.log("Results," + data);
          this.setState({ results: data });

          // After we've received the result... then post the search term to our history.
          helpers.postSaved(this.state.search).then(function() {
            console.log("Updated!");
          }.bind(this));
        }
      }.bind(this));
  },
  //lets children update to parent
  setSearch: function(topic, startYear, endYear){
    this.setState({ search: [topic, startYear, endYear] });
  },
  //Render the function
  render: function(){
    return (
      
    );
  }
});

module.exports = Main;
