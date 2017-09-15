import moment from 'moment';

export const cleanse = (html) => {
  const htmlTag = /<\/?([^<>])+>/g;
  return html && html.replace(htmlTag, '').replace(/&amp;/g, '&');
};

export const formatDate = (dateStr) => moment(dateStr).format('ll');