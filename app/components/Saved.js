// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Create the Main component
var Saved = React.createClass({

  getInitialState: function() {
    return { savedCarriers: "" };
  },

  // When this component mounts, get all saved articles from our db
  componentDidMount: function() {
    helpers.getSaved().then(function(carrierData) {
      this.setState({ savedCarriers: carrierData.data });
      console.log("saved results", carrierData.data);
    }.bind(this));
  },

  // This code handles the deleting saved articles from our database
  handleClick: function(item) {
    console.log("CLICKED");
    console.log(item);

    // Delete the list!
    helpers.deleteSaved(item.name, item.date, item.locations).then(function() {

      // Get the revised list!
      helpers.getSaved().then(function(carrierData) {
        this.setState({ savedCarriers: carrierData.data });
        console.log("saved results", carrierData.data);
      }.bind(this));

    }.bind(this));
  },
  // A helper method for rendering the HTML when we have no saved articles
  renderEmpty: function() {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Save your first carrier...</em>
          </span>
        </h3>
      </li>
    );
  },

  // A helper method for mapping through our articles and outputting some HTML
  renderCarriers: function() {
    return this.state.savedCarriers.map(function(carrier, index) {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{carrier.location}</em>
              </span>
              <span className="btn-group pull-right">
                <a href={carrier.name} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">View Details</button>
                </a>
                <button className="btn btn-primary" onClick={() => this.handleClick(carrier)}>Delete</button>
              </span>
            </h3>
            <p>Date Searched: {carrier.date}</p>
          </li>
        </div>
      );
    }.bind(this));
  },

  // A helper method for rendering a container and all of our carrier's inside
  renderContainer: function() {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-download" aria-hidden="true"></i> Save Carrier's</strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderCarriers()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render: function() {
    // If we have no carrier's, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.savedCarriers) {
      return this.renderEmpty();
    }
    // If we have carrier's, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
});

// Export the module back to the route
module.exports = Saved;
