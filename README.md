My Bookshelf
=======
This tiny application allows you to search the google books API and remove/add books to your favourite tab.

To start the application you need to have google API CLIENT ID and API KEY. This can be acquired in google api console (https://code.google.com/apis/console) in APis & Auth -> Credentials. You also need to have google books API enabled in APis & Auth -> APIs tab.


Clone this repo and create "local_settings.json" file in the project root, put inside the following code:
```
{
        "apiKey": "your_apiKey",
        "clientId": "your_client_id",
        "scope": [
            "https://www.googleapis.com/auth/books"
        ],
        "bookshelfId": 0
}
```

Install all node dependencies
```
npm install
```

Install bower packages
```
bower install
```

Serve the application with ANY server.
```
sudo python -m SimpleHTTPServer 80
```

Make sure you have the domain you are hosting on (it may be "http://localhost") added to your allowed javascript origins in google OAuth settings (Apis & Auth -> Credentials -> OAuth -> Javascript Origins).
