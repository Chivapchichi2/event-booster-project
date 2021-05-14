import refs from './utils/refs';
import apiService from './utils/serviceApi';
import ticketInfo from '../templates/ticket-info.hbs';
import moreInfo from '../templates/more-info-list.hbs'
import validation from './utils/validation';
import toggleListenerOnForm from './utils/dropdown';

refs.gallery.addEventListener('click', onTicketClick)
refs.btnModalClose.addEventListener('click', closeModal)
refs.ticketModal.addEventListener('click', onBdpClick)
refs.modalMoreInfoBtn.addEventListener('click', onMoreBtnClick)
window.addEventListener('keydown', onEscCloseModal)

let ticketId = null;
let isCard = null;



function onTicketClick(e) {
    refs.ticketInfoContainer.innerHTML = ''
    isCard = e.target.closest('.card-img-div');
    if (!isCard) {
        return
    }
    ticketId = isCard.getAttribute('data-id')
    apiService.getEventById(ticketId).then((r) => {
        validation.modalPosterUrl(r)
        validation.eventInfo(r)
        validation.eventPriceRanges(r)
        validation.modalWho(r)
        
        refs.ticketInfoContainer.innerHTML = ticketInfo(r);

        validation.authorLinksFilter(r)
        validation.moreInfoLink(r, refs)
        if (!r.priceRanges || !r.priceRanges.includes({ type: "vip" })) {
            document.querySelector('.tckt-buy-button.vip').style.pointerEvents = 'none'
        }
        return r;
    }).catch(console.log);
    refs.ticketModal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    window.removeEventListener('click', toggleListenerOnForm);
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
    window.addEventListener('click', toggleListenerOnForm);
    return refs.ticketModal.classList.add('is-hidden')
}

function onBdpClick(e) {
    if (e.target !== refs.ticketModal) {
        return
    }
    closeModal()
}

function onEscCloseModal(e) {
    if (e.code === 'Escape') {
        return closeModal()
    }
}
