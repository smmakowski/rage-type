# RageType

RageType is an game application I created for my MVP project at Hack Reactor. The MVP project is an open-ended two day solo project created from scratch. It is intended to be a quick, and mindless game, in the the sole purpose is to quickly relieve coding stress, while making it appear a distance that one is still doing work.

RageType is a button-mashing game where you have 10 seconds to type as much as you can in the fake in-game BASH terminal's input. It does not really matter what you type into the terminal, since what is displayed is fake minified jscript code (kind of like a simpler version of hacker-typer, which was one the inspirations for this game (http://hackertyper.com/). 

The game is initiated when you click the start button. Points are given at the end of each game and your score and username is posted to the database. Users can choose what the want their name to be when the application, as well as change it whenever they want with a button (ex. if your friend sees you playing and wants to try).

RageType is a MERN stack app. It uses a series of callbacks to handle game flow, allowing for some transition between pre-game setup, game execution, and post game phases, as well as handle the use of setTimeout. 

### Front End

I used Reactjs for the front end, because of it's dynamic rendering and the abilit to modularize my components. Additionally, since all the information was passed from the top of the application down to it's subcomponents, using react made even more sense because of it's ability to pass down props. Jquery is also used to control the display of certain components.

### Back End

I used express for my server, and mongodb for my database. Since my database only required one table and was non-relational, mongodb was the obvious choice. I used express to further simplify my server routing.
