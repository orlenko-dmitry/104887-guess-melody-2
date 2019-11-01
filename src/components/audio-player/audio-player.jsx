/* eslint-disable no-invalid-this */
import React, {Fragment, PureComponent} from 'react';
import {string, bool, func} from 'prop-types';

class AudioPlayer extends PureComponent {
  static propTypes ={
    src: string.isRequired,
    isPlaying: bool.isRequired,
    onPlayButtonClick: func.isRequired,
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      isPlaying: nextProps.isPlaying,
    };
  }

  audioRef = React.createRef();

  state = {
    progress: 0,
    isLoading: true,
    isPlaying: null,
  };

  componentDidMount() {
    const {src} = this.props;
    const audio = this.audioRef.current;
    audio.src = src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentDidUpdate() {
    const audio = this.audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  playButtonClickHandler = () => {
    const {onPlayButtonClick} = this.props;
    onPlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          data-testid="play-btn"
          disabled={isLoading}
          onClick={this.playButtonClickHandler}
        ></button>
        <div className="track__status">
          <audio ref={this.audioRef}></audio>
        </div>
      </Fragment>
    );
  }
}

export default AudioPlayer;
