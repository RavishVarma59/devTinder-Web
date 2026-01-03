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
    - rm -rf node_module package-lock.json
    - git pull origin main
    - npm i
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist (build folder) to /var/www/html/
        - sudo scp -r dist/* /var/www/html/

    - sudo nginx -t
    - sudo systemctl reload nginx
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
        - Restart the Process : pm2 restart <name>
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
    - Refresh the nginx : sudo systemctl restart nginx | sudo systemctl reload nginx
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

# Domain name =>
    - sign up godaddy
    - buy any domain name
    - sign up cloud flare
    - copy two nameserver value from cloudflare and past in nameserver of godaddy
    - now check in cloudflare is domain name is verified
    - DNS records: namastedev.in = 3.110.183.89
    - enable ssl for website

# AWS Sending Mail via SES
    
    - Create IAM user
    - Give access to amazoneSESFullACCESS
    - Amazon SES : create identity ( domain, email)
    - verify your domain name
    - verify your email
    - Install aws sdk v3 
    - code example : https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses
    - setup SES Client
    - Access Credentials should be created in IAM under securityCredentials Tab
    - Write Code for SESClient
    - Write Code for Sending Email Address
    - Make the email dynamic by passing more param to run function

# Create env file

    - install donenv package : npm install dotenv --save
    - create .env file
    - add secret key in .env file like :
        - JWT_TOKEN = '<token>'
    - add : require('dotenv').config()  in app.js file only once
    - access env variable in any file like : process.env.JWT_TOKEN

# Cron jobs 

    - install cron-node package : npm install cron-node --save
    - schedule a job in cron ( add require(../utils/cronjob.js) in app.js file)
    - install the date-fns package : npm install date-fns --save
    - find all the email Id who recieve friend request yesterda
    - send email
    - Explore queue machenism to send bulk emails
    - Amazon SES bulk emails
    - Make send Email fun dynamic
    - bee-queue & bull npm package

# Razorpay Payment Gateway Integration

    - 

# Policy pages

    - Created Privacy, Contact us, Terms, Refund, Shipping pages