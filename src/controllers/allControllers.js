import Template from 'rw-templater';
import state from '../state';
import api from '../api';

const updateActive = (id) => {
  const activeLinks = document.querySelector('a.active');
  if (activeLinks) activeLinks.classList.remove('active');

  document.querySelector(`#${id}`).classList.add('active');
};

const top = (callback, pageId) => {
  // always start a progress bar if there is any async
  // behaviour loading the content.
  window.Progress.start();
  state.latestPageRequestId = Math.random();
  const localPageRequestId = state.latestPageRequestId;

  Promise.all([
    api.top.count(),
    api.top.list(pageId || 1),
  ]).then(([totalNoOfItems, pageItems]) => {
    if (state.latestPageRequestId === localPageRequestId) {
      window.Progress.done();
      updateActive('tab-top');

      document.getElementById('main').innerHTML = Template.it('top', { totalNoOfItems, pageItems });
    }

    if (callback) return callback();
    return true;
  });
};

const about = (callback) => {
  window.Progress.done();

  document.getElementById('main').innerHTML = Template.it('about');
  updateActive('tab-about');

  if (callback) return callback();
  return true;
};

export { top, about };
