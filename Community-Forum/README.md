
# Vue 3 + Vite + Firebase API

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Dependencies needed
- npm install (always do this before start the project to install latest version)
- npm install firebase (install firebaseSDK)
- npm install pinia @pinia/nuxt
- npm install date-fns (install this for data calculations)

## Firebase setup
1. Create firebase project namely: Community Forum
2. Create a cloud firebase databse (select test database, note: all data will be deleted in 30days)
3. Select to create a web app namely: CommForum(also have selections for IOS or Andriod)
4. Once complete with the setup copy the database config and paste it in "/stores/auth.js"

## Key Notes
1. Use Pinia store for authentication
2. At the begining test and fetch in local database with json file type
3. Created a script "/src/utils/seedFirestore.js" to fetch in local json file to Firebase
   - modify the script as it missing out some elements (e.g. author, ..)
   - meanwhile go to the cloud firebase rules, make some changes to allow the entry 

## Files structure
src/
   - Component folder
     - auth folder (login and register form files)
     - threads folder (threads form - use to create, edit threads)
   - router folder
     - index.js (keep all the routes)
   - stores folder
     - auth.js (use to authenticate user log in, log out)
   - utils folder
     - dateUtils.js (use to calculate date and generate date)
     - seedFirestoe.js (**temporarily used script** to lodge local json data to firebase)
   - views folder
     - about.vue (about page)
     - home.vue (home page)
     - threads.vue (threads page)
   - App.vue 
   - firebase.js (keeps all the **firebase config**)
   - main.js
