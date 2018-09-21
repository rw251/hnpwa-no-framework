import state from './state';

const myFetch = url => fetch(url).then(resp => resp.json());

export default {
  top: {
    count: () => new Promise((resolve) => {
      if (state.top && state.top.count) return resolve(state.top.count);
      return myFetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then((data) => {
          resolve(data.length);
        });
    }),
    list: pageId => new Promise((resolve) => {
      if (state.top && state.top.list) return resolve(state.top.list);
      return myFetch(`https://api.hackerwebapp.com/news?page=${pageId}`).then((data) => {
        resolve(data);
      });
    }),
  },
};
