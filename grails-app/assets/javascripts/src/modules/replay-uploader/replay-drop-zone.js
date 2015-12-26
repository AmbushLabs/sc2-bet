import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import replayStatus from './../../api/game/replayStatus';
import {
    FETCH_REPLAY_STATUS,
    UPLOAD_REPLAY
} from './../../actions/actions';


export default class ReplayDropzone extends Component {

    constructor(options) {
        super(options);
        this.onDrop = this.onDrop.bind(this);
    }

    render() {
        return (
            <Dropzone className="center p3 replay-drop-zone" onDrop={this.onDrop} multiple={false}>
                <p className="h1 ss-icons ss-uploadbox bold"></p>
                <p className="h3">When you are finished playing, upload your replay by clicking or dragging it here!</p>
            </Dropzone>
        );
    }

    onDrop(files) {
        const { dispatch, game, s3 } = this.props;
        const { id, upload_hash } = game;
        const { policy, signature} = s3;
        var data = new FormData();
        data.append('key', 'replays/' + id + '/' + upload_hash + '.SC2Replay');
        data.append('AWSAccessKeyId', 'AKIAJ3N46OA77EEOEHZA');
        data.append('acl', 'private');
        data.append('success_action_redirect', this.props.config.site_uri + 'game/completeUpload');
        data.append('policy', policy);
        data.append('signature', signature);
        data.append('file', files[0]);
        dispatch({
            type: UPLOAD_REPLAY
        });
        fetch('https://s3-us-west-2.amazonaws.com/gosuempire', {
            credentials: 'include',
            method: 'post',
            body: data
        }).then(() => {
            dispatch(replayStatus(game.id))
        });
    }

};

