import refs from './utils/refs';
import apiService from './utils/serviceApi';
import ticketInfo from '../templates/ticket-info.hbs';
// import moreInfo from '../templates/more-info-list.hbs'
import validation from './utils/validation';

refs.gallery.addEventListener('click', onTicketClick)
refs.btnModalClose.addEventListener('click', closeModal)
refs.ticketModal.addEventListener('click', onBdpClick)
refs.modalMoreInfoBtn.addEventListener('click', onMoreBtnClick)
window.addEventListener('keydown', onEscCloseModal)

refs.modalPrev.addEventListener('click', onTicketClick)
refs.modalNext.addEventListener('click', onTicketClick)

let ticketId = 0;
let isCard = null;


function onTicketClick(e) {
    let idArr = []
    document.querySelectorAll('.card-img-div')
        .forEach(item => {
            idArr.push(item.dataset.id)
            
        })    
    
    refs.ticketInfoContainer.innerHTML = ''
    
    isCard = e.target.closest('.card-img-div');    
    if (!isCard) {
        if (e.target.id === 'p') {
            if (idArr.indexOf(ticketId) !== 0) {
                ticketId = idArr[idArr.indexOf(ticketId) - 1]
            } else { ticketId = idArr[idArr.length - 1] }
        }
        if (e.target.id === 'n') {
            if (idArr.indexOf(ticketId) !== idArr.length - 1) {
                ticketId = idArr[idArr.indexOf(ticketId) + 1]
            } else { ticketId = idArr[0] }
        }
    } else {
        ticketId = isCard.getAttribute('data-id')
    } 
     
    apiService.getEventById(ticketId).then((r) => {
        validation.modalPosterUrl(r)
        validation.eventInfo(r)
        validation.eventPriceRanges(r)
        validation.modalWho(r)

        refs.ticketInfoContainer.innerHTML = ticketInfo(r);
        const elems = {
            info: document.getElementById('info'),
            more: document.getElementById('more'),
            less: document.getElementById('less'),
        }
        if (elems.info.textContent.length > 125) {
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

        validation.authorLinksFilter(r)
        validation.moreInfoLink(r, refs)
        
        if (!r.priceRanges || !r.priceRanges.includes({type: "vip",})) {
            document.querySelector('.vip').style.pointerEvents = 'none'
        }
        // if (!r.priceRanges || !r.priceRanges.includes({type: "standard",})) {
        //     document.querySelector('.std').style.pointerEvents = 'none'
        // }
        
        return r;
    }).catch(console.log);
    refs.ticketModal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
}

function onMoreBtnClick(e) {
    refs.modalMoreInfo.classList.toggle('is-hidden')
}

function closeModal() {
    refs.ticketInfoContainer.innerHTML = ''
    refs.modalMoreInfo.classList.add('is-hidden')
    refs.modalMoreInfo.innerHTML = ''
    const isClosed = refs.ticketModal.classList.contains('is-hidden')
    if (isClosed) {
        return
    }
    document.body.style.overflow = 'visible';
    refs.ticketModal.classList.add('is-hidden')
}

function onBdpClick(e) {
    if (e.target !== refs.ticketModal) {
        return
    }
    closeModal()
}

function onEscCloseModal(evt) {
    if (evt.code === 'Escape') {
       closeModal()
    }
}
