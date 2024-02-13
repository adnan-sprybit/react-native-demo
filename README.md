
# React Native Test App

Step-by-Step Guide to Setup the Project
This guide will walk you through the process of setting up the project on a new device.

Node.js

First requirement will be to install node.js, if you dont have node.js or npm installed we need to isntall that first. 

Once you download the zip file from the github link, you need to setup db in mockoon. Click on open db in mockon, choose the db file from project named "testdb.json'

Once Db is running, you need to put setting URL in the project app setting.

Below is step to deployment. 

## Deployment

For basic setup

```bash
  npm i 
  npm run web // for web
  npm run android // for android
```
or

```bash
  yarn 
  yarn web // for web
  yarn android // for android
```


## Login
User below credentials
Admin :   
UN: admin@gmail.com
PW: admin@123 

User: 
UN: user@gmail.com
PW: user@123

You can find this in the mockoon , login and admin logins

## CRUD Operation
You can use the form to add, update, delete any items 
You can click on the item to see the details, you can click on photo to see photo on flexbox.
You can filter using the top text box 

## Role Assignment

We have two roles, 

Admin:
1. if you login with admin role, you will get option with Add, Update, Delete

User
1. If you login with user role, you will not get option to Add, Update and Delete, still you can see data and see details of the data.

## Higher order function

If you turn of the internet it will show strip of internet not available on any page. 

## GPS feature
To show the feature of GPS for phone capabilities, we kept a button on the login page when you click on "Show Location" it will show the current lat long of the location

-- Librarys like Axios not working with Mockoon Tool, so we used a basic method to work with API. We majorly use Axios for api works. 