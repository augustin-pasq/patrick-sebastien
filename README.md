# Patrick Sébastien

## Birthday features

- When today is the birthday of someone, the bot wish a happy birthday

- Show all birthdays of the server

    `/birthdays`

- Show the next birthday of the server

    `/next-birthday`

- Show the birthday, the age and the number of days before the next birthday of @someone

    `/birthday-info @someone`

## Voice features

Users must be in the voice channel to use theses features

- Join a voice channel

    `/join`

- When someone join a voice channel, a custom song is played (the bos must be in the voice channel before)

- Leave a voice channel

    `/leave`

## Run by yourself

- Create a `config.json` file :
    
    ```
    {
        "clientId": "<your bot id>",
        "guildId": "<your server id>",
        "token": "<your bot token>",
        "channelId": "<the id of channel to send the birthday message>",
        "voiceChannelId": <the id of the voice channel where the bot must connect to>
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
            "year": <the year of the birthdate (int, not string)>,
            "intro": <the path to the sound.ogg>
        }
    ]
    ```

    Add as many JSON objects as there are memebers to wish the birthday

## Author

© Augustin Pasquier
