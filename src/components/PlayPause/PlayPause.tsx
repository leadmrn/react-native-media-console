import React, {createRef} from 'react';
import {Animated, Image, Platform, TouchableHighlight} from 'react-native';
import {Control} from '../Control';
import {NullControl} from '../NullControl';
import type {VideoAnimations} from '../../types';
import {styles} from './styles';

export const playPauseRef = createRef<TouchableHighlight>();

interface PlayPauseProps {
  animations: VideoAnimations;
  disablePlayPause: boolean;
  paused: boolean;
  togglePlayPause: () => void;
  resetControlTimeout: () => void;
  showControls: boolean;
  onPressForward: () => void;
  onPressRewind: () => void;
}

const play = require('../../assets/img/play.png');
const pause = require('../../assets/img/pause.png');
const rewind = require('../../assets/img/rewind.png');
const forward = require('../../assets/img/forward.png');

export const PlayPause = ({
  animations,
  disablePlayPause,
  paused,
  togglePlayPause,
  resetControlTimeout,
  showControls,
  onPressForward,
  onPressRewind,
}: PlayPauseProps) => {
  let source = paused ? play : pause;

  const animatedStyles = {
    opacity: animations.controlsOpacity,
    zIndex: showControls ? 99999 : 0,
  };

  if (disablePlayPause) {
    return <NullControl />;
  }

  return (
    <Animated.View
      pointerEvents={'box-none'}
      style={[styles.container, animatedStyles]}>
      <Control
        disabled={!showControls}
        callback={onPressRewind}
        resetControlTimeout={resetControlTimeout}>
        <Image source={rewind} resizeMode={'contain'} style={styles.rewind} />
      </Control>
      <Control
        disabled={!showControls}
        callback={togglePlayPause}
        resetControlTimeout={resetControlTimeout}
        style={styles.playContainer}
        controlRef={playPauseRef}
        {...(Platform.isTV ? {hasTVPreferredFocus: showControls} : {})}>
        <Image source={source} resizeMode={'contain'} style={styles.play} />
      </Control>
      <Control
        disabled={!showControls}
        callback={onPressForward}
        resetControlTimeout={resetControlTimeout}>
        <Image source={forward} resizeMode={'contain'} style={styles.rewind} />
      </Control>
    </Animated.View>
  );
};
