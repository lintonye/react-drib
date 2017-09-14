import React from 'react';
import './CardGrid.css';

const Preview = ({ url, onMouseEnter, onMouseLeave }) => (
  <img src={url} className='preview'
    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
);

const DetailOverlay = ({ title, description, createdAt }) => (
  <div className='detail'>
    <div>{title}</div>
    <div>{description}</div>
    <div>{createdAt}</div>
  </div>
);

const Icon = ({name}) => <i className={'fa fa-fw fa-'+name}></i>;

const Footer = ({ shot }) => (
  <div className='footer'>
    <div className='footer-item'><Icon name='eye' />{shot.views_count}</div>
    <div className='footer-item'><Icon name='comment' />{shot.comments_count}</div>
    <div className='footer-item'><Icon name='heart' />{shot.likes_count}</div>
  </div>
);

export default class DribbbleCard extends React.Component {
  state = {
    previewMode: 'teaser'
  }
  handleMouseEnter = () => this.setState({ previewMode: 'animated' })
  handleMouseLeave = () => this.setState({ previewMode: 'teaser' })
  render() {
    const { shot } = this.props;
    const previewUrl = this.state.previewMode === 'teaser'
      ? shot.images.teaser
      : shot.images.hidpi;
    return (
      <div className='card'>
        <Preview url={previewUrl}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave} />
        <DetailOverlay title={shot.title}
          description={shot.description}
          createdAt={shot.created_at}
        />
        <Footer shot={shot} />
      </div>
    )
  }
}