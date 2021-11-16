/*
 This script uses javascript axios module to communicate with the backend API 
 baseURL is as the name suggests, it is the baseURL where our api OPENS its endpoints 
 All other branches starts from this root path i.e: http://localhost:8000/api/v1 
 getArtists() function fetches the data available at baseURL/portfolio and 
 getartist() {a single artist's data}, fetches from baseURL/portfolio/id 
*/
import axios from 'axios'

const apiClient1 = axios.create({
    baseURL: 'https://2t580xq9u5.execute-api.us-east-2.amazonaws.com/dev/api/v1',  //3000 earlier
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', // double quote and single quotes r 
        //important in json 
    }
})

export default {
    getArtists() {
        return apiClient1.get('/artist/portfolios/list/')
    },
    getArtist(username) {
        // return apiClient1.get('/artist/portfolios/' + username)
        return apiClient1.get('/artist/portfolios/' + username)
    },
    getBio(username){
        return apiClient1.get('/artist/bios/' + username)
    },
    getJourney(username,config) {
        return apiClient1.get('/artist/journey/list/?username=' + username, config)
    },
    getFullJourney(id,config) {
        return apiClient1.get('/artist/journey/' + id, config)
    },
    getUpcomingEvents(username,config) {
        return apiClient1.get('/artist/journey/upcomingevents/?username=' + username, config)
    },
    getEach1Teach1(id) {
        return apiClient1.get('/e1t1/sharing/' + id)
    },
    getEach1Teach1s(){
        return apiClient1.get('/e1t1/sharing/')
    },
    getPersonalMessages(id){
        return apiClient1.get('/e1t1/qna/?shareid=' + id)
    },
    getEach1Teach1_user(username) {
        return apiClient1.get('/e1t1/sharing/?username=' + username)
    },
    getShareLove(id){
        return apiClient1.get('/e1t1/sharing/love/?shareidobj=' + id)
    },
    getShareComments(id){
        return apiClient1.get('/e1t1/sharing/comments/?shareidobj=' + id)
    },
    getLearnReaction(id){
        return apiClient1.get('/e1t1/learnings/likes/?learningidobj=' + id)
    },
    getLearnComments(id){
        return apiClient1.get('/e1t1/learnings/comments/?learningidobj=' + id)
    },
    getNotificationsSharing(username,config){
        return apiClient1.get('/notifications/e1t1/?receiver=' + username, config)
    },
    getNotificationsLearning(username,config){
        return apiClient1.get('/notifications/e1t1/learnings/?receiver=' + username, config)
    },
    getLearnings(id){
        return apiClient1.get('/e1t1/learnings/list/?shareidobj=' + id)
    },
    getLearning(id){
        return apiClient1.get('/e1t1/learnings/' + id)
    }
}