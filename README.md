# Musico

## Project Description
Musico provides a platform for music enthusiasts to meet and interact with one another by integrating genre-based playlists with group chats. Users can join virtual rooms, in which each room plays a certain genre of music, request new songs to be played, and upvote or downvote songs on the queue.

## Project Goals and Requirements

### Minimal Requirements
✔️ Rooms that automatically play a specific genre of music when users join   
✔️ Either from the queue of song requests or from a default playlist if the queue is empty  
✔️ A group chat for each room  
✔️ A registration and login system for users  

### Standard Requirements:  
✔️ Each user has a profile with the following information:  
* Username 
* Profile picture
* Favourite music genres 
* Songs the user previously requested and liked  

✔️ Song request queues will be linked to the YouTube API   
✔️ Develop a system that can check if a song is of a particular genre  

### Stretch Goals:
✔️ Integrate user voting system on song queues  
❌ Add additional sources of music (Soundcloud or Spotify)  
✔️ Users will be able to view other users’ profiles to learn about their favourite genres/songs and find common ground  

----

## Technology Stack

### Unit 1 - HTML, CSS, JS
* HTML is used within TSX to render React components.
* CSS is used for styling React components.
* JavaScript is used for implementing client-side and server-side logic, but for the frontend, we chose to use TypeScript instead to make the code easier to understand, to debug, and to take advantage of static checking.

### Unit 2 - React & Redux
* React is used to create components to build the frontend.
* Redux is used to store and organize the application’s state.
     * Redux stores and manages the entire state of the application in one place, optimizing UI performance and React Redux makes it easy to get the two working together seamlessly.

### Unit 3 - MongoDB
* MongoDB is used to store the bulk of our data including songs, queues, default playlists, user profiles, and chat messages.
     * Since MongoDB is a non-relational, document oriented database management system, it’s significantly faster and easier to use than a traditional database system. MongoDB Atlas also provides a simple and easy alternative to using the command line to access the database.

### Unit 4 - Node & Express
* Node.js is used for backend API services and server-side logic.
* Express provides server-side logic through routing, request handling, and endpoints.
     * Node.js and Express easily integrate with MongoDB with Mongoose to provide a backend for our app.

### Unit 5 - Release Engineering
* Musico is deployed on Heroku with continuous integration enabled.
     * Used Heroku’s student plan to deploy it on a Hobby Dyno for a more stable and reliable website experience
     
### Other
* JSON Web Tokens and JS browser cookies for authentication
* Socket.io for real-time chat, queue syncing and currently playing song syncing
* YouTube API to find songs and categorize them into relevant genres

## Above and Beyond Functionality
* Real-time syncing using web sockets (Socket.io)
     * Enables a fully real-time group chat experience across all genres
     * Keeps currently playing music in sync, using socket messages to manage currently playing songs
     * Enables real-time updates in queue functionality, including adding a song, upvoting/downvoting
* YouTube Data API for music
     * YouTube API allows users to find relevant music from within our app
     * Used metadata in video information obtained from the API to display and filter music videos by genre
     * For every song, we use the API to obtain the duration, thumbnail, and other relevant information for the song, which we store in our database
* A custom authentication solution using JSON Web Tokens
     * The sign up endpoint hashes the password for the database and sends back an authentication token that is then stored in a browser cookie
     * All our endpoints are protected, and API requests need to send this auth token in the header to validate the user
* UI Design using Sketch & Figma
     * In the planning phase of the app, we designed lo-fidelity and hi-fidelity prototypes of the app UI and defined a colour scheme
     * Sketch Cloud enabled us to share these designs with each other and obtain CSS for certain components

## Next Steps
* Implement ability for users to see other users’ full profiles instead of just their favourite genres
* Introduce more genres and allow users to add genres to increase music variety
* Enable new music sources such as Spotify or SoundCloud

## Contributions

**Adi**
* Implemented an authentication system using JSON web tokens and password hashing
* Developed the chat backend systems as well as real-time syncing of queues and currently playing songs using Socket.io
* Helped design the app using Sketch and made a high-fidelity UI designs

**Breanne**
* Set up MongoDB with Jen
* Helped with Express routing to handle requests
* Created React components for the music sidebar including the vote buttons and song queue and implemented functionality to retrieve data from MongoDB to populate song queues
* Implemented sidebar with functionality to enter different rooms
* Used Figma to design login page and logo

**Jen**
* Implemented the dashboard display, profile page and other React components
* Implemented functionality to retrieve queue data for displaying upcoming songs
* Implemented ability to retrieve and update user profile data
* Set up MongoDB with Breanne
* Helped with Express routes and keeping the Redux store in sync as requests are processed

**Perry**
* Implemented app navigation using reactstrap
* Queried for songs using the YouTube API and uploaded into respective genres in MongoDB
* Set up abstract Component/Container structure which all ReactNodes in the app are based on
* Designed & Created Chat UI

## References
* Link to Musico: musico-436i.herokuapp.com/
* JavaScript Cookies: https://www.w3schools.com/js/js_cookies.asp
* JS Authentication: https://www.youtube.com/watch?v=2jqok-WgelI
* Implementing Chat using Socket.io: https://www.youtube.com/watch?v=jD7FnbI76Hg
