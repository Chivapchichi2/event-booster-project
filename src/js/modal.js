import refs from './utils/refs';
import apiService from './utils/serviceApi';
import ticketInfo from '../templates/ticket-info.hbs';


refs.gallery.addEventListener('click', onTicketClick)
refs.btnModalClose.addEventListener('click', closeModal)
refs.ticketModal.addEventListener('click', onBdpClick)
window.addEventListener('keydown', onEscCloseModal)

let ticketId = null;
let isCard = null;



function onTicketClick(e) {
    refs.ticketInfoContainer.innerHTML = ''
    isCard = e.target.closest('.card-item');
    if (!isCard) {
        return
    }
    ticketId = isCard.getAttribute('data-id')
    apiService.getEventById(ticketId).then((r) => {        
        r.images[3].url = r.images.find(item => item.width === 1024 && item.height === 683).url
        r.info ? r.info = r.info : r.info = 'To more information please call to administrate'
        r.priceRanges ? r.massage = '' : r.massage ='prices will be announced later'
        refs.ticketInfoContainer.innerHTML = ticketInfo(r);        
        return r;
    }).catch(console.log);
    refs.ticketModal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
        const isClosed = refs.ticketModal.classList.contains('is-hidden')
        if (isClosed) {
            return
      }
        document.body.style.overflow = 'visible';
        return refs.ticketModal.classList.add('is-hidden')
    }

function onBdpClick(e) {
        if (e.target !== refs.ticketModal) {
            return
        }
        closeModal()
    }

function onEscCloseModal(evt) {
        if (evt.code === 'Escape') {
            return closeModal()
        }
    }
