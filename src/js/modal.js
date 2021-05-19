import refs from './utils/refs';
import apiService from './utils/serviceApi';
import ticketInfo from '../templates/ticket-info.hbs';
import validation from './utils/validation';
import toggleListenerOnForm from './utils/dropdown';

refs.gallery.addEventListener('click', onTicketClick)
refs.btnModalClose.addEventListener('click', closeModal)
refs.ticketModal.addEventListener('click', onBdpClick)
refs.modalMoreInfoBtn.addEventListener('click', onMoreBtnClick)
window.addEventListener('keydown', onEscCloseModal)

let ticketId = 0;
let isCard = null;

function onTicketClick(e) {   
    if (e.target.classList.contains('js-geolocation-btn')) {
        return
    }
    document.removeEventListener('click', toggleListenerOnForm);
    refs.modalPrev.addEventListener('click', onTicketClick)
    refs.modalNext.addEventListener('click', onTicketClick)
    document.addEventListener('keydown', onTicketClick)
    refs.ticketInfoContainer.innerHTML = ''
    let idArr = [];
    document.querySelectorAll('.card-img-div')
        .forEach(item => {
            idArr.push(item.dataset.id)            
        })        

    isCard = e.target.closest('.card-img-div');    
    if (!isCard) { 
        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown'|| e.target.id === 'p') {            
            if (idArr.indexOf(ticketId) !== 0) {                
                ticketId = idArr[idArr.indexOf(ticketId) - 1]                
            } else { ticketId = idArr[idArr.length - 1]}
        }
        if (e.code === 'ArrowRight' || e.code === 'ArrowUp'|| e.target.id === 'n') {             
            if (idArr.indexOf(ticketId) !== idArr.length - 1) {                
                ticketId = idArr[idArr.indexOf(ticketId) + 1]                
            } else { ticketId = idArr[0]}
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
        
        validation.modalInfoCheking()
        validation.authorLinksFilter(r)
        
        validation.moreInfoLink(r, refs)
        
        if (!r.priceRanges || !r.priceRanges[1]) {
        document.querySelector('.vip').style.pointerEvents = 'none'
        }        
        if (!r.priceRanges) {
        document.querySelector('.std').style.pointerEvents = 'none'
        }
        
        return r;
    }).catch(console.log);
    refs.ticketModal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
}

function onMoreBtnClick(e) {
    refs.modalMoreInfo.classList.toggle('is-hidden')
}

function closeModal() {
    document.addEventListener('click', toggleListenerOnForm);
    document.removeEventListener('keydown', onTicketClick)
    refs.modalPrev.removeEventListener('click', onTicketClick)
    refs.modalNext.removeEventListener('click', onTicketClick)
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
    if (e.target.classList.contains('modal-wrapper') || e.target.classList.contains('backdrop')) {
        closeModal();
    }
    
}

function onEscCloseModal(e) {    
    if (e.code === 'Escape') {
        closeModal();
        validation.closeFormMenu();
    }
}
