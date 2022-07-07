#
APIs:

<b>Create User </b><br/>
POST: /api/users/ <br/>
Requires name, email, and password fields.</br>
Example: {name: "Robert Johnson", email: "rjohnson@gmail.com", password: "qwerty"}
</br></br>

<b>Fetch all users in DB</b></br>
GET: /api/users/
</br></br>

<b>Signing In</b></br>
POST: /auth/signin/</br>
Requires email and password.</br>
Example: {name: "Robert Johnson", password: "qwerty"}
</br></br>

<b>Fetch a single users</b></br>
Requires "authorization" header with valid token after "Bearer".</br>
GET: /api/users/${id}</br>

