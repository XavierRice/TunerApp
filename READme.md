WELCOME TO THE TUNER APP!  

This is an app build for 10.1 Pursuit using Express and SQL

I have implemented the following routes: 
#	Action	URL	HTTP Verb	CRUD	Description
1	Index	/songs	GET	Read	Get a list (or index) of all songs
2	Show	/songs/:id	GET	Read	Get an individual view (show one song)
3	Create	/songs	POST	Create	Create a new song
4	Destroy	/songs/:id	DELETE	Delete	Delete a song
5	Update	/songs/:id	PUT	Update	Update a song

I have built a schema.sql for Postgres with the following columns/data types and a seed file to fill the DB: 

name string, required
artist: string, required
album: string
time: string
is_favorite: boolean 


I've added some logic so that if someone goes to an invalid id they will be redirected to the 404 route you had written in the last part.
and added validations so that the required information is correct when entered.

FEEL FREE TO RUN:
npm run dbinit and npm run dbseed

In addition, I've added query searches to the db: 
/songs?order=asc it will organize the songs alphabetically
/songs?order=desc it will organize the songs in reverse alphabetical order
/songs?is_favorite=true it will only show the songs where the value of is_favorite is true
/songs?is_favorite=false it will only show the songs where the value of is_favorite is false
