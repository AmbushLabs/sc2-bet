import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


export default class ReplayDropzone extends Component {

    constructor(options) {
        super(options);
        this.onDrop = this.onDrop.bind(this);
    }


    render() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                    <div>Drop your replay here!</div>
                </Dropzone>
            </div>
        );
    }

    onDrop(files) {
        var data = new FormData();
        data.append('key', 'replays/' + this.props.game.id + '/' + this.props.game.upload_hash + '.SC2Replay');
        data.append('AWSAccessKeyId', 'AKIAJ3N46OA77EEOEHZA');
        data.append('acl', 'private');
        data.append('success_action_redirect', 'https://localhost:8443/game/completeUpload');
        data.append('policy', this.props.s3.policy);
        data.append('signature', this.props.s3.signature);
        data.append('file', files[0]);
        fetch('https://s3-us-west-2.amazonaws.com/gosuempire', {
            credentials: 'include',
            method: 'post',
            body: data
        });
    }

}