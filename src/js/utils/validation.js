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
    data.map(item => {
      item.images = item.images.find(item => item.width === 1024 && item.height === 683);
    });
    return data;
  }
};
