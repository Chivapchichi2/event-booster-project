import refs from "./refs";
import moreInfo from '../../templates/more-info-list.hbs';

export default {
  imageUrl(data) {
    data.map(item => {
      item.images = item.images.find(item => item.ratio === '4_3');
    });
    return data;
  },
  location(data) {
    data = data.map(item => {
      if (!item._embedded.venues[0].name) {
        item._embedded.venues[0].name = 'No-Info'
      }
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
  },
  modalWho(r) {
    if (r._embedded.attractions) { 
           if (r.name.length > r._embedded.attractions[0].name.length) {
            r.name =  r._embedded.attractions[0].name
              }
        }
  },
  authorLinksFilter(r) {
    if (r._embedded.attractions) { r._embedded.attractions = r._embedded.attractions.map(item => {
                if (item.externalLinks) {
                    return item
                }
            }).filter(item => item !== undefined)
        }
  },
  moreInfoLink(r, refs) {
    if (!r._embedded.attractions || r._embedded.attractions.length === 0) {
      refs.modalMoreInfo.innerHTML = `<a href="https://www.google.com/search?q=${r.name}"
            class = "more-err-link"
            target="_blank">
            try to find more about
            ${r.name}
            in Google</a>`
    } else if (!r._embedded.attractions[0].externalLinks) {
      refs.modalMoreInfo.innerHTML = `<a href="https://www.google.com/search?q=${r._embedded.attractions[0].name}"
            class = "more-err-link"
            target="_blank">
            try to find more about
            ${r._embedded.attractions[0].name}
            in Google</a>`
    } else {
      refs.modalMoreInfo.innerHTML = moreInfo(r)
    }
  },
  checkChangePerPage(obj, page) {
    return obj.perPage === page;
  },
  galleryRender(data, clb) {
    this.location(data);
    this.imageUrl(data);
    refs.gallery.innerHTML = clb(data);
  },
  checkTargetNodeName(e) { return e.target.nodeName === 'A' },
  checkTargetParent(e) { return refs.countriesList === e.target.parentNode },
  changeBtnText(e) {
    if (this.checkTargetParent(e)) {
      refs.countryBtn.textContent = e.target.textContent;
      return
  }
    refs.categoryBtn.textContent = e.target.textContent;
  },
  toggleListenerOnForm (e) {
    e.preventDefault();
    if (e.target.name === 'country') {
        refs.countryMenu.classList.toggle('show');
        refs.categoryMenu.classList.remove('show');
        return;
    }

    if (e.target.name === 'category') {
        refs.categoryMenu.classList.toggle('show');
        refs.countryMenu.classList.remove('show');
        return;
    }
    this.closeFormMenu();
  },
   closeFormMenu() {
    refs.countryMenu.classList.remove('show');
    refs.categoryMenu.classList.remove('show');
}
};
