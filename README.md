# README

Fictionarie_ Is an app for people looking to write off of a prompt that updates daily.

## Versions

* Ruby => 2.7.1

* Rails => 7.0.2

* PostgreSQL => 1.1

* React => 17.0.2

* Bootstrap => 5.1.3

## Starting up the app.

Clone this repo onto your machine and cd into it.
In the terminal run `bundle install`.
Then either run `npm install --prefix client` or cd into client and run `npm install` 

### Backend

To set up the backend open the repo in your code editor and go into the seeds.rb file and change the day_title on one of the prompts to the current date, formated as such => MONTH/DAY/YEAR => 03/15/2022 => 3152022.

Once that's done go ahead and create the database with `rails db:create`, then run `rails db:migrate` and `rails db:seed`. 

To start the backend run `rails s`.

### Frontend

To start the frontend either run `npm s --prefix client` or cd into client and run `npm s`

## Demo(s) 

Fictionarie_ Version 0.1
https://www.youtube.com/watch?v=F4s-y5sUPSs

**Note: This is a WIP App.**
