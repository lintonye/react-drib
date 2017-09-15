import React from 'react';
import Icon from './Icon';
import * as Utils from './Utils';
import { Motion, spring } from 'react-motion';

import './CardGrid.css';

const Preview = ({ url }) => (
  <img src={url} className='preview' />
);

const Descriptor = ({ title, description, createdAt, style }) => (
  <div className='desc' style={style}>
    <div id='title'>{title}</div>
    <div id='description'>{Utils.cleanse(description)}</div>
    <div id='created-at'>{Utils.formatDate(createdAt)}</div>
  </div>
);

const AnimatedDescriptorOpacity = ({ shot, visible }) => (
  <Motion style={{ opacity: spring(visible ? 1 : 0) }}>
    {
      ({ opacity }) => (
        <Descriptor title={shot.title}
          description={shot.description}
          createdAt={shot.created_at}
          style={{ opacity }}
        />
      )
    }
  </Motion>
);

const AnimatedDescriptorPopup = ({ shot, visible }) => (
  <Motion style={{
    y: spring(visible ? 0 : 100),
    opacity: spring(visible ? 1 : 0)
  }}>
    {
      ({ y, opacity }) => (
        <Descriptor title={shot.title}
          description={shot.description}
          createdAt={shot.created_at}
          style={{ transform: `translateY(${y}px)`, opacity }}
        />
      )
    }
  </Motion>
);

const AnimatedDescriptor = AnimatedDescriptorPopup;

const Footer = ({ shot }) => (
  <div className='footer'>
    <div className='footer-item'><Icon name='eye' />{shot.views_count.toLocaleString()}</div>
    <div className='footer-item'><Icon name='comment' />{shot.comments_count.toLocaleString()}</div>
    <div className='footer-item'><Icon name='heart' />{shot.likes_count.toLocaleString()}</div>
  </div>
);

const GifTarget = ({ onMouseEnter, onMouseLeave }) => (
  <div className='gif-target'
    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    [ GIF ]
  </div>
);

class Content extends React.Component {
  state = {
    previewMode: 'teaser'
  }
  handleMouseEnterGifTarget = () => this.setState({ previewMode: 'animated' })
  handleMouseEnterDescTarget = () => this.setState({ previewMode: 'descriptor' })
  handleMouseLeave = () => this.setState({ previewMode: 'teaser' })
  render() {
    const { shot } = this.props;
    const previewImage = this.state.previewMode === 'animated'
      ? shot.images.hidpi
      : shot.images.teaser;
    return (
      <div className='content'
        onMouseEnter={this.handleMouseEnterDescTarget}
        onMouseLeave={this.handleMouseLeave}
      >
        <Preview url={previewImage} />
        <AnimatedDescriptor shot={shot} visible={this.state.previewMode === 'descriptor'} />
        {shot.animated && (
          <GifTarget
            onMouseEnter={this.handleMouseEnterGifTarget}
            onMouseLeave={this.handleMouseLeave}
          />
        )}
      </div>
    );
  }
}

const Card = ({ shot }) => (
  <div className='card'>
    <Content shot={shot} />
    <Footer shot={shot} />
  </div>
);

const CardGrid = ({ shots }) => (
  <div className='card-grid'>
    {shots.map(shot => (
      <Card shot={shot} />
    ))}
  </div>
);

export default CardGrid;