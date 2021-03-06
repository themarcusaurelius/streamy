import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    };

    //Helper method for letting user add/delete their stream
    renderAdmin(stream) {
       if (stream.userId === this.props.currentUserId) {
           return (
               <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button inverted primary">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button inverted red">
                        Delete
                    </Link>
               </div>
            );
        } 
    };

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon video" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>  
                </div>
            );
        });
    };

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button violet">
                        Create Stream
                    </Link>
                </div>
            );
        }
    };
    
    render() {
        return (
            <div className="ui purple raised segment">
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }      
};

const mapStateToProps = state => {
    //Takes an object as a value, pulls out the values, and inserts them into an array 
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);