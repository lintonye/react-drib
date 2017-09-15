/* CardGrid styled with styled-components */

import React from 'react';
import Icon from './Icon';
import * as Utils from './Utils';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

const PreviewImg = styled.img`
  width: 200px;
  height: 150px;
  margin: 10px 10px 0 10px;
`;

const DescDiv = styled.div`
  padding: 10px;
  background: rgba(255,255,255,0.9);
  color: #7D7D7D;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  #title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  #description {
    font-size: 12px;
    flex-grow: 1;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 150px;
  }
  #created-at {
    font-size: 14px;
  }  
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  padding: 8px 10px 8px 10px; 
`;

const FooterItemDiv = styled.div`
  margin-left: 12px;
  color: #777;
  font-size: 11.5px;
  i {
    font-size: 13px;
    margin-right: 2px;
  }
`;

const GifTargetDiv = styled.div`
  font-size: 9px;
  color: #aaaaaa;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
`;

const ContentDiv = styled.div`
  position: relative;
  > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

const CardDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background: #FFFFFF;
  box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  margin: 15px;
  width: 220px;
  overflow: hidden;
`;

const CardGridDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #efefef;
  padding: 15px;
  width: 100%;
  height: 100%;
`;

const Preview = ({ url }) => (
  <PreviewImg src={url} />
);

const Descriptor = ({ title, description, createdAt, style }) => (
  <DescDiv style={style}>
    <div id='title'>{title}</div>
    <div id='description'>{Utils.cleanse(description)}</div>
    <div id='created-at'>{Utils.formatDate(createdAt)}</div>
  </DescDiv>
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

const AnimatedDescriptor = AnimatedDescriptorOpacity;

const Footer = ({ shot }) => (
  <FooterDiv>
    <FooterItemDiv><Icon name='eye' />{shot.views_count.toLocaleString()}</FooterItemDiv>
    <FooterItemDiv><Icon name='comment' />{shot.comments_count.toLocaleString()}</FooterItemDiv>
    <FooterItemDiv><Icon name='heart' />{shot.likes_count.toLocaleString()}</FooterItemDiv>
  </FooterDiv>
);

const GifTarget = ({ onMouseEnter, onMouseLeave }) => (
  <GifTargetDiv
    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    [ GIF ]
  </GifTargetDiv>
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
      <ContentDiv
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
      </ContentDiv>
    );
  }
}

const Card = ({ shot }) => (
  <CardDiv>
    <Content shot={shot} />
    <Footer shot={shot} />
  </CardDiv>
);

const CardGrid = ({ shots }) => (
  <CardGridDiv>
    {shots.map(shot => (
      <Card shot={shot} />
    ))}
  </CardGridDiv>
);

export default CardGrid;