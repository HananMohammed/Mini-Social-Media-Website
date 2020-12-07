import React, {Component} from 'react';
 
class Search extends Component {

    render(){
        <div class="col-md-8">
            <input type="text"
                className="form-control mb-3 mt-3"
                id="posttextarea"
                placeholder="Search Posts ......"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
            />
        </div>
    }

}

export default Search ;