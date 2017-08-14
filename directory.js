// Client ID and API key from the Developer Console
var userlist = [{name: "placeholder"}]
      var CLIENT_ID = '870607351135-6gpqhneibup84op6n2o5dq19gutauaqo.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/admin/directory_v1/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/admin.directory.user.readonly';

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listUsers();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the first 10 users in the domain.
       */
      function listUsers() {
        gapi.client.directory.users.list({
          'customer': 'my_customer',
          'maxResults': 100,
          'orderBy': 'email',
          'viewType': "domain_public"
        }).then(function(response) {
            var users = response.result.users;
            var menu = document.getElementById('menu-main');
            menu.className += " show-toggle";
          //appendPre('Directory Loaded, you may now Show Directory <a href="link"> test </a>');
          if (users && users.length > 0) {
            for (i = 0; i < users.length; i++) {
                //console.log(user);
              var user = users[i];
              userlist.push(user)
              /*appendPre('-' + user.primaryEmail + ' (' + user.name.fullName + ')');
              if (user.organizations){
                  appendPre(user.organizations[0].title);
              };
              if (user.thumbnailPhotoUrl){
                  appendPre(user.thumbnailPhotoUrl)
              }*/
            }
          } else {
            appendPre('No users found.');
          }
        });
      }

var app = angular.module('MyApp', []);
app.controller('AppController', function ($scope, $http){      
    $scope.msg = "don't give up!"
    $scope.userlist = userlist
    $scope.newUserList = {}
    $scope.logger = function(){
        console.log(userlist)
        $http({
            method: 'GET',
            url: 'https://www.googleapis.com/admin/directory/v1/users'
        }).then(function(response) {
            $scope.newUserList = response.data;
        }).then(function(){
            console.log($scope.newUserList)
        })
    }

    $scope.$watch('userlist', function(){
        console.log($scope.userlist);
    })

    
    
})