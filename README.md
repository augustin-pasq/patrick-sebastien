# Patrick Sébastien

## How to use the bot

Nothing to do, the day of your birthday, the bot wish you a happy birthday.

## Special command

- Show all birthdays of the server

    `/birthdays`

- Show the next birthday of the server

    `/next-birthday`

- Show the birthday, the age and the number of days before the next birthday of @someone

    `/birthday-info @someone`

## Run by yourself

- Create a `config.json` file :
    
    ```
    {
        "clientId": "<your bot id>",
        "guildId": "<your server id>",
        "token": "<your bot token>",
        "channel" : "<the channel to send the birthday message>"
    }
    ```

- Create a `data.json` file :

    ```
    [
        {
            "name": "<the name of the member>",
            "id": "@<the id of the memberwith before>",
            "day": <the day of the birthdate (int, not string)>,
            "month": <the month of the birthdate (int, not string)>,
            "year": <the year of the birthdate (int, not string)>
        }
    ]
    ```

    Add as many JSON objects as there are memebers to wish the birthday

## Author

© Augustin Pasquier
