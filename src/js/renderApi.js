
import apiService from './serviceApi'

apiService.getWorldUpcomingEvents().then(console.log)
apiService.getEventById("vv1AaZAqAGkdPWfSB").then(console.log)