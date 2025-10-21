# DevTinderWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.

- create navbar, profile, footer, login component
- login page
- create login api
- Get the user Data From login api and go to "/" page
- create a feed component and show feed component after login at "/" path
- in utils folder create constant.ts file to have backend api origin url
- update profile photo and user name once user information received from login api.
- If user is logged in , on refresh page stay logged in
- If token not present , redirect to login page
- connections page
- request page
- accept and reject request from request page

# Deployment

- sign up aws
- create EC2 instance
- chmod 400 DevTinder-secret.pem
- ssh -i "DevTinder-secret.pem" ubuntu@ec2-3-110-183-89.ap-south-1.compute.amazonaws.com
- connect to EC2 instance
- install nvm node with same version of local project
- clone git repo
- FrontEnd
    - npm i
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist (build folder) to /var/www/html/
        - sudo scp -r dist/* /var/www/html/
    - enable port :80 of your instance

- BackEnd
    - allowed ec2 instance public ip on mongo db server
    - npm install pm2 -g 
    - pm2 start npm -- start
        - To check pm2 status : pm2 logs
        - To clear the logs : pm2 flush <name>
        - To get list : pm2 list
        - Stop the Application : pm2 stop <name>
        - Delete the process : pm2 delete <name>
        - Custom Name to process : pm2 start npm --name "<name>" -- start
    - nginx config file : sudo nano /etc/nginx/sites-available/default
    - config /api/ to backend port 7777
        -     location /api/ {
                    proxy_pass http://localhost:7777/;  # 👈 Your Node app
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
                }
    - Refresh the nginx : sudo systemctl refresh nginx
    - server name : 3.110.183.89

        frontend => http://3.110.183.89/ 
        
        backend => http://3.110.183.89:7777/ => http://3.110.183.89/api/

        domain name : devtinder.com => 3.110.183.89
        
        frontend => devtinder.com/

        backend => devtinder.com/api





    location /api/ {
            proxy_pass http://localhost:7777/;  # 👈 Your Node app
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

    - change BASE_URL to "/api"