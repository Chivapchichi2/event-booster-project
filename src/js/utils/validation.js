import refs from "./refs";

export default {
  imageUrl(data) {
    data.map(item => {
      item.images = item.images.find(item => item.ratio === '4_3');
    });
    return data;
  },  
  transformCountriesNameIntoCode(name, data) {
    let code = "";
    data.forEach(i => {
      if (i.name === name) {
        code = i.code;
        return;
      }
    });
    return code;
  },
  transformGenreIntoId(name, data) {
    let id = "";
    data.forEach(i => {
      if (i.name === name) {
        id = i.id;
        return;
      }
    });
    return id;
  },
  modalPosterUrl(data) {    
    data.images[0].url = data.images.find(item => item.width === 1024 && item.height === 683).url;
    data.images[1].url = data.images.find(item => item.width === 205 && item.height === 115).url;    
    return data;
  },
  eventInfo(data) {
    data.info ? data.info = data.info : data.info = 'To more information please call to administrate'
    return data
  },
  eventPriceRanges(data) {
    data.sMassage = ''
    data.vMassage = ''
    if (!data.priceRanges) {
      data.sMassage = 'prices will be announced later'
      data.vMassage = 'prices will be announced later'
      return data
    }
    if (!data.priceRanges.includes({ type: 'vip' })) {
      data.vMassage = 'seats are not provided'
    }
    data.priceRanges[0] = data.priceRanges.find(item => item.type === 'standard incluses fees' || item.type === 'standard')
    data.priceRanges[1] = data.priceRanges.find(item => item.type === 'vip')    
    return data
  },
  noData() {
    refs.pagination.innerHTML = '';
    refs.gallery.innerHTML = '<li><p class="message">Sorry, no events in this country &#9785</p></li>';
  }
  // moreInfo(data) {
  //   if (!data._embedded.attractions[0].externalLinks) {
  //     data._embedded.attractions[0].message = `<a> try to find more in Google</a>`
  //   }refs.modalMoreInfo.innerHTML = moreInfo(r)
  // }
};
