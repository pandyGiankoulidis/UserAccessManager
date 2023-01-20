# UserAccessManager
Basic authentication framework that can be used as a basis for a web application.
It supports all the basic credential management operations, like signup,login,reset password etc. It also supports 
three roles [admin,user,moderator] for the system users and access management for these roles.

### System architecture
The system is build with a back-end implemented in nodejs and a seperated front-end implemented in angularsjs. This means that the back-end can be used as it is and used in a 
web application. The front-end serves mainly illustration purposes and a working use case front-end example for the access maangement system. The front-end can be any framework
since the system is basically an API.

The system implements a Jwt authentication system in nodejs. After login or signup, an access token for accessing the system resources. Based on the role of the user, this token
can give access to specific resources.
### Setup
In order to use and modify this system, some configuration is required.
a) The system uses mongodb for storing user's credentials, therefore you must have mongodb installed and modify the "/app/config/db.config.js" file to your database and port.
b) The system uses a secret to generate the access token after the login. It is suggested to change that secret in the "/app/config/auth.config.js" file.
After these configurations, you can run the back-end component first
~~~
npm install
npm run dev
~~~
This starts the running of a nodejs server in the http://localhost:3080/. The following API calls are supported.

TYPE | url callback     | information  required  | explanation   |
-----|------------------|------------------------|---------------|
POST | /api/auth/signup | Body in JSON format with the keys: {"username","password","email","age","roles"} | Create new user account |
GET  | /api/test/all    | 'x-access-token' Header in request, with a Jwt access token string| Test if the access token is valid |
POST | /api/auth/signin | Body in JSON format with the keys: {"username","password"}| Login to an existing account.It returns an access-token if success.|
GET  | /api/test/mod    | 'x-access-token' Header in request, with a Jwt access token string| Test if the access token belongs to 'moderator' role|
GET  | /api/test/admin  | 'x-access-token' Header in request, with a Jwt access token string| Test if the access token belongs to 'admin' role|

### Example in angular
In the LoginCredentailManage folder, there is an angular app that uses this node system as back-end. Change thw working directory to this diractory and run
~~~
ng serve
~~~
This starts a simple angular app in the http://localhost:4200/. This is a simple app where you can login, create new account and experiment with the different user roles.


