import React from 'react';
import './CardGrid.css';
import Icon from './Icon';

const Preview = ({ url }) => (
  <img src={url} className='preview' />
);

const cleanse = (html: string) => {
  const htmlTag = /<\/?([^<>])+>/g;
  return html.replace(htmlTag, '').replace(/&amp;/g, '&');
};

const Descriptor = ({ title, description, createdAt }) => (
  <div className='detail'>
    <div id='title'>{title}</div>
    <div id='description'>{description && cleanse(description)}</div>
    <div id='created-at'>{createdAt}</div>
  </div>
);

const Footer = ({ shot }) => (
  <div className='footer'>
    <div className='footer-item'><Icon name='eye' />{shot.views_count}</div>
    <div className='footer-item'><Icon name='comment' />{shot.comments_count}</div>
    <div className='footer-item'><Icon name='heart' />{shot.likes_count}</div>
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
        {
          this.state.previewMode === 'descriptor' && (
            <Descriptor title={shot.title}
              description={shot.description}
              createdAt={shot.created_at}
            />
          )
        }
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

export default Card;
