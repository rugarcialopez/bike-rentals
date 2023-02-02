# Application to manage bike rentals

- The application is a React-based.
- The application perform all user actions via the REST API, including authentication. (https://github.com/rugarcialopez/bike-rentals-api)
- Users must be able to create an account and log in.
- Include at least 2 user roles: Manager and User.

Managers can:
- Create, Read, Edit, and Delete Bikes (including Photo upload)
- Create, Read, Edit, and Delete Users and Managers
- See all the users who reserved a bike, and the period of time they did it
- See all the bikes reserved by a user, and the period of time they did it

Users can:
- See a list of all available bikes for some a specific day
- Filter by color, model, weight, or rate averages
- Display the bikes in a map, according to the location
- Reserve a bike for a specific period of time(Just a day)
- Rate the bikes with a score 1 to 5
- Cancel a reservation

Bikes:
- Each bike will have the following information in the profile: Model, Photo, Color, Weight, Location and a checkbox indicating if the bike is available for rental or not

## Deploy on Vercel

Hosting URL: https://bike-rentals-usd1.vercel.app/

Default manager:
- email:manager01@example.com
- password:manager01
