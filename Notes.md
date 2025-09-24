# Some notes

## Passing values when redirecting

If you want to pass values such as email and role to the destination page, you have a few options:

1. ***URL Parameters***: You can pass the values as URL parameters. However, this will expose the data in the URL, which might not be desirable for sensitive data like email.

2. ***Cookies***: You can set the values in cookies, and then read the cookies on the destination page. This is a common way to persist data across requests, but it requires handling cookies on the server and client.

3. ***Session***: You can store the values in a session, which is stored on the server and persists across multiple requests. This is a secure way to store data, but it requires setting up session handling on your server.

4. ***Local Storage***: You can store the values in local storage on the client side. This data will persist even when the browser is closed and reopened, but it's only available on the client side and not secure for sensitive data.

Here's an example of how you can pass the values using URL parameters:

In your connexion.js file, you can append the email and role to the URL:

```js

res.json({ redirect: '/candidat/accueilCandidat?email=' + encodeURIComponent(email) + '&role=Candidat' });

```

Then, on the client-side, you can use the URL parameters to set the values:

```js

fetch('/connexion', {
    method: "POST",
    headers: {
        "content-Type": "application/json",
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    if (data.redirect) {
        // If the server responded with a redirect URL, redirect the to this URL
        window.location.href = data.redirect;
    }
})
.catch((error) => {
    console.log('Error:', error);
    alert('Erreur lors de la connexion.');
});

```

On the destination page, you can use JavaScript to get the URL parameters and use them:

```js

var urlParams = new URLSearchParams(window.location.search);
var email = urlParams.get('email');
var role = urlParams.get('role');

```

Remember, this method exposes the email and role in the URL, which might not be desirable for sensitive data. You might want to consider using a more secure method like cookies or sessions.
