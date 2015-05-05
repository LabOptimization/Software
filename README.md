# Software
All things software related

### Setup Golang Server

    Install Go
    
    cd go-server && source exports.sh
    
    cd src/main && go get
    
    go build && ./main

### Set up client testing environment

    cd <project-root>/go-server
    
    sudo npm install
    
    npm run update-webdriver
   
#### End to end tests

    npm run protractor

#### Unit tests

    npm run test
