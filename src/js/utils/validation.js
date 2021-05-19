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
    data.info ? data.info = data.info : data.info = 'To get information about this event, contact the administrator using the links in contacts'
    return data
  },
  eventPriceRanges(data) {
    data.sMessage = ''
    data.vMessage = ''
    if (!data.priceRanges) {
      data.sMessage = 'prices will be announced later'
      data.vMessage = 'prices will be announced later'
      return data
    }
    if (!data.priceRanges.includes({ type: 'vip' })) {
      data.vMessage = 'seats are not provided'
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
    if (r?._embedded?.attractions) { 
           if (r.name.length > r._embedded?.attractions[0]?.name.length) {
            r.name =  r._embedded?.attractions[0]?.name
              }
        }
  },
  authorLinksFilter(r) {
    if (r?._embedded?.attractions) { r._embedded.attractions = r._embedded.attractions.map(item => {
                if (item.externalLinks) {
                    return item
                }
            }).filter(item => item !== undefined)   
        }
  },
  moreInfoLink(r, refs) {   
    if (!r?._embedded?.attractions || r?._embedded?.attractions?.length === 0) {
      r._embedded.attractions = [{
        externalLinks: {
          google: [{
            url: `https://www.google.com/search?q=${r.name}`
          }]          
        },
        name: r.name,
      }]
      refs.modalMoreInfo.innerHTML = moreInfo(r)
    } else if (!r._embedded.attractions[0].externalLinks) {
      r._embedded.attractions = [{
        externalLinks: {
          google: [{
            url: `https://www.google.com/search?q=${r.name}`
          }]          
        },
        name: r._embedded.attractions[0].name,
      }]
      refs.modalMoreInfo.innerHTML = moreInfo(r)
    } else if (!r._embedded.attractions[0].externalLinks.google) {
       r._embedded.attractions[0].externalLinks.google = [{
      url: `https://www.google.com/search?q=${r.name}`
      }]
      refs.modalMoreInfo.innerHTML = moreInfo(r)
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
    const label = e.target.textContent + `<svg class="icon-down" width="15" height="10">
              <use href="./images/sprite.svg#icon-down-btn"></use>
            </svg>`;
    if (this.checkTargetParent(e)) {
      refs.countryBtn.innerHTML = label;
      return
  }
    refs.categoryBtn.innerHTML = label;
  },
  toggleListenerOnForm(e) {
    if (e.target.classList.contains('buybtn') || e.target.classList.contains('name')) {
      return
    }
    if (e.target.classList.contains('img')) {
      return
    }
    e.preventDefault();
    if (e.target.name === 'country') {
        refs.countriesList.classList.toggle('show');
        refs.genresList.classList.remove('show');
        return;
    }

    if (e.target.name === 'category') {
        refs.genresList.classList.toggle('show');
        refs.countriesList.classList.remove('show');
        return;
    }
    this.closeFormMenu();
  },
   closeFormMenu() {
    refs.countriesList.classList.remove('show');
    refs.genresList.classList.remove('show');
  }, 
  modalInfoCheking() {
     const elems = {
            info: document.getElementById('info'),
            more: document.getElementById('more'),
            less: document.getElementById('less'),
        }
    if (elems.info.textContent.length > 90) {          
            elems.more.classList.remove('is-hidden')
        }
        elems.more.addEventListener('click', () => {
            elems.info.classList.remove('info')            
            elems.more.classList.add('is-hidden')
            elems.less.classList.remove('is-hidden')
        })
        elems.less.addEventListener('click', () => {
            elems.info.classList.add('info')
            elems.less.classList.add('is-hidden')
            elems.more.classList.remove('is-hidden')
        })
  },
  heroTitleAnimation() {
    setInterval(() => {
      document.querySelector('h1').classList.toggle('animate__flash');
     },3000)
   },
};
