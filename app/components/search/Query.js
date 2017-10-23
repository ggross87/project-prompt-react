// Include React as a dependency
import React from "react";
import Search from "../Search";

// Query Component Declaration
class Query extends React.Component{

  // Here we set initial variables for the component to be blanks
  constructor(props) {

    super(props);

    this.state = {
      search: ""
    };

    this.setTerm = this.setTerm.bind(this);
  }

  // Whenever we detect ANY change in the textbox, we register it.
  handleChange: function(event) {
    console.log("TEXT CHANGED");

    // Here I create syntax to capture any change in text to the query terms (pre-search).
    // Sourced from Stack Overflow... more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // This code handles the sending of the search terms to the parent Search component
  handleSubmit: function(event) {
    event.preventDefault();
    console.log("CLICKED");
    this.props.updateSearch(this.state.search);
  }

  // Here I render the Query component
  render: function() {

    return (
      <div className="main-container">

        <div className="row">
          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-truck" aria-hidden="true"></i> Query
                  </strong>
                </h1>
              </div>
              <div className="panel-body">

                {/* Here I associate the text-box input with the state values */}
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <h4 className=""><strong>City</strong></h4>
                    <input
                      type="text"
                      value={this.state.search}
                      className="form-control"
                      id="search"
                      onChange={this.handleChange}
                      required
                    />

                  </div>

                  {/* Here we create the onClick event that triggers the HandleSubmit */}
                  <div className="pull-right">
                    <button
                      type="submit"
                      className="btn btn-danger"
                    >
                      <h4>Submit</h4>
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

// Export the module back to the route
export default Query;
