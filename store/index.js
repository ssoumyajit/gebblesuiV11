/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import EventService from '@/services/EventService.js'

export const state = () => ({
  artists: [], //array of artists in img community
  learn_obj:null,
  share_obj: null, //object to edit e1t1 data
  editing_obj: null, //object to edit data
  sharing:[], //e1t1 onject
  portfolio: null, //store portfolio data of the logged in user
  bio: null, //store bio data of the logged in user
  fullJourney: null, //store currrently selected journey card
  highlights: [], //store Highlights data of the logged in user
  journey: [], //store Highlights data of the logged in user
  list_of_artists: [],
  personalMessages: [],
  notifications:[],
  share_notifications:[],
  learn_notifications:[],
  notifications_notseen:0,
  hasHighlights: false, //if user has highlights data
  hasJourney: false, 
  hasPortfolio: false, //if user has portfolio data
  hasBio: false, //if user has bio data
  hasPersonalMessages: false,
  img_artists: '', //no. of artist in img community
  share_comments_list: [],
  learning_comments_list:[],
  share_has_love: false,
  share_has_love_id:'',
  learn_has_like: false,
  learn_has_dope: false,
  learn_has_info: false,
  learn_has_like_id: '',
  learn_has_dope_id: '',
  learn_has_info_id: '',
  e1t1:{},
  love: '',
  like:'',
  dope: '',
  info:'',
  learnings:[],
})
export const getters = {
  learn_obj(state){
    return state.learn_obj
  },
  learn_has_like(state){
    return state.learn_has_like
  },
  learn_has_dope(state){
    return state.learn_has_dope
  },
  learn_has_info(state){
    return state.learn_has_info
  },
  learn_has_like_id(state){
    return state.learn_has_like_id
  },
  learn_has_dope_id(state){
    return state.learn_has_dope_id
  },
  learn_has_info_id(state){
    return state.learn_has_info_id
  },
  share_has_love(state){
    return state.share_has_love
  },
  share_has_love_id(state){
    return state.share_has_love_id
  },
  e1t1(state){
    return state.e1t1
  },
  learnings(state){
    return state.learnings
  },
  share_notifications(state){
    return state.share_notifications
  },
 learn_notifications(state){
    return state.learn_notifications
  },
  notifications(state){
    return state.notifications
  },
  notifications_notseen(state){
    return state.notifications_notseen
  },
  fullJourney(state){
    return state.fullJourney
  },
  artists(state) {
    return state.artists
  },
  list_of_artists(state) {
    return state.list_of_artists
  },
  share_obj(state){
    return state.share_obj
  },
  editing_obj(state){
    return state.editing_obj
  },
  sharing(state) {
    return state.sharing
  },
  personalMessages(state){
    return state.personalMessages
  },
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  userHasPortfolio(state){
    return state.hasPortfolio
  },
  usersPortfolio(state){
    return state.portfolio
  },
  userHasBio(state){
    return state.hasBio
  },
  usersBio(state){
    return state.bio
  },
  usersJourney(state){
    return state.journey
  },
  userHasJourney(state){
    return state.hasJourney
  },
  userHasPersonalMessages(state){
    return state.hasPersonalMessages
  },
  usersEvents(state){
    return state.events
  },
  userHasEvents(state){
    return state.hasEvents
  },
  img_artists(state){
    return state.img_artists
  },
  share_comments_list(state){
    return state.share_comments_list
  },
  learning_comments_list(state){
    return state.learning_comments_list
  },
  love(state){
    return state.love
  },
  like(state){
    return state.like
  },
  dope(state){
    return state.dope
  },
  info(state){
    return state.info
  }
}
export const actions = {
  merge_notifications({commit, state}){
    commit('merge_notifications')
    commit('is_not_seen', state.notifications)
  },
  check_e1t1({commit},id){
    EventService.getEach1Teach1(id).then(res =>
    {
      commit('get_e1t1',res.data)
    })
  },
  check_share_notifications({commit, state}){
    if(state.auth.user ){
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + state.auth.user.access_token}
        };
      EventService.getNotificationsSharing(state.auth.user.user.username,config).then(res =>
      {
        commit('check_share_notifications',res.data)
        return;
      })
    }
  },
  check_learn_notifications({commit, state}){
    if(state.auth.user ){
      // console.log("on store notify");
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + state.auth.user.access_token}
        };
      EventService.getNotificationsLearning(state.auth.user.user.username,config).then(res =>
      {
        commit('check_learn_notifications',res.data)
        return;
      })
    }
  },
  check_full_journey({commit, state}, id, username){
    if(state.auth.user ){
      if(state.auth.user.user.username == username){ //check if logged in user is checking its private journey
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + state.auth.user.access_token}
        };
      EventService.getFullJourney(id,config).then(res =>
      {
        commit('fullJourney',res.data)
        return;
      })
    }
  }
  EventService.getFullJourney(id).then(res =>
    {
      commit('fullJourney',res.data)
      return;
    })
  },
  check_share_love({commit}, id){
    EventService.getShareLove(id).then(res =>
      {
        commit('check_share_love',res.data)
      })
  },
  check_share_comments({commit}, id){
    EventService.getShareComments(id).then(res =>
      {
        commit('check_share_comments',res.data)
      })
  },
  check_learn_reactions({commit}, id){
    EventService.getLearnReaction(id).then(res =>
      {
        commit('check_learn_reactions',res.data)
      })
  },
  check_learn_comments({commit}, id){
    EventService.getLearnComments(id).then(res =>
      {
        commit('check_learn_comments',res.data)
      })
  },
  check_share_obj({commit, state}, share_obj){
    if(state.auth.loggedIn) {
    commit('check_share_obj', share_obj)
    }
  },
  check_editing_obj({commit, state}, editing_obj){
    if(state.auth.loggedIn) {
    commit('check_editing_obj', editing_obj)
    }
  },
  check_learn_obj({commit},id){
    EventService.getLearning(id).then(res =>
    {
      commit('check_learn_obj',res.data)
    })
  },
  check_artists({commit}){
    EventService.getArtists().then(res =>
    {
      commit('get_artists',res.data)
      commit('img_community',res.data.length)
    })
  },
  check_sharing({commit},username){
      EventService.getEach1Teach1_user(username).then(res =>
      {
        commit('get_sharing',res.data)
      })
  },
  check_user_portfolio({commit, state}){
      if(state.auth.loggedIn) {
          EventService.getArtist(state.auth.user.user.username).then(res =>
          {
            commit('usersPortfolio',res.data)
          })
        }  
  },
  check_user_bio({commit, state}){
    if(state.auth.loggedIn) {
        EventService.getBio(state.auth.user.user.username).then(res =>
        {
          commit('usersBio',res.data)
        })
      }  
  },
  check_user_highlights({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getHighlights(state.auth.user.user.username).then(res =>
      {
        commit('usersHighlights',res.data)
      })
    }
  },
  check_user_journey({commit, state}){
    if(state.auth.loggedIn) {
      const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + state.auth.user.access_token}
        };
      EventService.getJourney(state.auth.user.user.username,config).then(res =>
      {
        commit('usersJourney',res.data)
      })
    }
  },
  check_personal_room({commit, state}, id)
  {
    if(state.auth.loggedIn) {
      EventService.getPersonalMessages(id).then(res =>
      {
        commit('get_personal_messages',res.data)
      })
    }
  },
  check_learnings({commit},id){
    EventService.getLearnings(id).then(res =>
      {
        commit('get_learnings',res.data)
      })
  },
  remove_portfolio({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearPortfolio')
      }
  },
  remove_bio({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearBio')
      }
  },
  remove_highlights({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearHighlights')
    }
  },
  remove_journey({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearJourney')
    }
  },
  remove_full_journey({commit})
  {
      commit('clearFullJourney')
  },
  remove_artists_sharing({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearArtistsSharing')
    }
  },
  remove_share_obj({commit, state})
  {
    if(state.auth.loggedIn && state.share_obj){
      commit('clear_share_obj',state.share_obj)
    }
  },
  remove_learn_obj({commit, state})
  {
    if(state.auth.loggedIn && state.learn_obj){
      commit('clear_learn_obj',state.learn_obj)
    }
  },
  remove_editing_obj({commit, state})
  {
    if(state.auth.loggedIn && state.editing_obj){
      commit('clear_editing_obj',state.editing_obj)
    }
  },
  remove_learn_reactions({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_learn_reactions')
      commit('clear_learn_comments')
    }
  },
  remove_love({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_love')
      commit('clear_comments')
    }
  },
  remove_notifications({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_notifications')
    }
  },
  remove_personal_messages({commit, state})
  {
    if(state.auth.loggedIn && state.personalMessages){
      commit('clear_personal_messages',state.personalMessages)
    }
  },
  remove_learnings({commit})
  {
      commit('clearLearnings')
  },
}
    // Define Mutations
export const mutations = {
  check_learn_obj(state,learn_obj){
    state.learn_obj = learn_obj
  },
  merge_notifications(state){
    state.notifications = state.learn_notifications.concat(state.share_notifications)

    //changing format of date shown
    // const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // for(var i=0; i<state.notifications.length; i++) {
    //   let date = state.notifications[i].time;
    //   console.log(date);
    //   let datetype= date.slice(8, 10);
    //   let month = date.slice(5, 7);
    //   let yeartpye = date.slice(0, 4)
    //   const regex = new RegExp("^0+(?!$)",'g');
    //   month = month.replaceAll(regex, "");
    //   let monthtype = months[month-1]
    //   state.notifications[i].time = datetype+" "+monthtype +" "+yeartpye;
    // }
    // console.log(state.notifications);
  },
  get_e1t1(state,e1t1){
    state.e1t1 = e1t1;
  },
  get_learnings(state,learnings){
    state.learnings = learnings;
  },
  is_not_seen(state, notifications){
    // console.log("is seen",notifications);

    state.notifications_notseen = notifications.filter(notifications => notifications.is_seen == false);
    // console.log(state.notifications_notseen.length);
  },
  check_share_notifications(state, share_notifications){
    if(share_notifications){
      state.share_notifications = []
      state.share_notifications = share_notifications
    }
  },
  check_learn_notifications(state, learn_notifications){
    if(learn_notifications){
      state.learn_notifications = []
      state.learn_notifications = learn_notifications
    }
  },
  check_share_love(state, love){
    if(love){
      state.love = love
      if(state.auth.loggedIn){
      state.share_has_love = false
      state.share_has_love_id = ''
        let check_love = love.filter(love => love.username == state.auth.user.user.username);
        if(check_love[0]){
          state.share_has_love_id = check_love[0].id
        }
        if(check_love.length>0){
          state.share_has_love = true
        }
      }
    }
  },
  check_share_comments(state, share_comments_list){
    if(share_comments_list){
      state.share_comments_list = share_comments_list
    }
  },
  check_learn_reactions(state, react){
    if(react){
      state.like = react.filter(react => react.like_type == "LO");
      state.dope = react.filter(react => react.like_type == "FI");
      state.info = react.filter(react => react.like_type == "DE");
    }
    if(state.auth.loggedIn){
      let like = state.like
      let dope = state.dope
      let info = state.info
      state.learn_has_like = false
      state.learn_has_dope = false
      state.learn_has_info = false
      state.learn_has_like_id = ''
      state.learn_has_dope_id = ''
      state.learn_has_info_id = ''
      let check_like = like.filter(like => like.username == state.auth.user.user.username);
      let check_dope = dope.filter(dope => dope.username == state.auth.user.user.username);
      let check_info = info.filter(info => info.username == state.auth.user.user.username);
      if(check_like[0]){
        state.learn_has_like_id = check_like[0].id
      }
      if(check_like.length>0){
        state.learn_has_like = true
      }
      if(check_dope[0]){
        state.learn_has_dope_id = check_dope[0].id
      }
      if(check_dope.length>0){
        state.learn_has_dope = true
      }
      if(check_info[0]){
        state.learn_has_info_id = check_info[0].id
      }
      if(check_info.length>0){
        state.learn_has_info = true
      }
      }
  },
  check_learn_comments(state, learning_comments_list){
    if(learning_comments_list){
      state.learning_comments_list = learning_comments_list
    }
  },
  check_share_obj(state, share_obj){
    if(share_obj){
      state.share_obj = null
      state.share_obj = share_obj
    }
  },
  clear_learn_obj(state, learn_obj){
    if(learn_obj){
      state.learn_obj = null}
  },
  clear_share_obj(state, share_obj){
    if(share_obj){
      state.share_obj = null}
  },
  check_editing_obj(state, editing_obj){
    if(editing_obj){
      state.editing_obj = null
      state.editing_obj = editing_obj
    }
  },
  clear_editing_obj(state, editing_obj){
    if(editing_obj){
      state.editing_obj = null}
  },
  clear_comments(state) //if user has portfolio change state to true
  {
    state.share_comments_list =[]
  },
  get_artists(state, artists) 
  {
    if(artists)
    {state.artists = artists}
  },
  get_sharing(state, sharing) 
  {
    if(sharing)
    {state.sharing = sharing}
  },
  usersPortfolio(state, artist)
  {
    if(artist)
    {
      state.portfolio = artist
      state.hasPortfolio = true
    }
  },
  usersBio(state, bio)
  {
    if(bio)
    {
      state.bio = bio
      state.hasBio = true
    }
  },
  usersJourney(state, journey)
  {
    if(journey.length)
    {
      state.journey = journey
      state.hasJourney = true}
  },
  fullJourney(state, fullJourney){
    if(fullJourney)
    {
      state.fullJourney = fullJourney}
  },
  get_personal_messages(state, personalMessages)
  {
    state.personalMessages = personalMessages
    state.hasPersonalMessages = true
  },
  clear_notifications(state){
    state.notifications = []
    state.share_notifications =[]
    state.learn_notifications = []
  },
  clearLearnings(state){
    state.learnings = []
  },
  clearPortfolio(state) //if user has portfolio change state to true
  {
    state.portfolio = null
    state.hasPortfolio = false
  },
  clearBio(state) //if user has portfolio change state to true
  {
    state.bio = null
    state.hasBio = false
  },
  clearHighlights(state) //if user has portfolio change state to true
  {
    state.highlights =[]
    state.hasHighlights = false
  },
  clearJourney(state) //if user has portfolio change state to true
  {
    state.journey =[]
    state.hasJourney = false
  },
  clearFullJourney(state) //if user has portfolio change state to true
  {
    state.fullJourney =null
  },
  img_community(state, length) //if user has portfolio change state to true
  {
    state.img_artists = length
  },
  clearArtistsSharing(state) //if user has portfolio change state to true
  {
    state.artists = null
    state.sharing = null
    state.list_of_artists = null
  },
  clear_personal_messages(state)
  {
    state.personalMessages = []
    state.hasPersonalMessages = false
  },
  clear_love(state)
  {
    state.love = ''
    state.share_has_love = false
    state.share_has_love_id =''
  },
  clear_learn_reactions(state)
  {
    state.like = ''
    state.dope = ''
    state.info = ''
    state.learn_has_like = false
    state.learn_has_dope= false
    state.learn_has_info= false
    state.learn_has_like_id= ''
    state.learn_has_dope_id=''
    state.learn_has_info_id= ''
  },
  clear_learn_comments(state)
  {
    state.learning_comments_list = []
  },
}