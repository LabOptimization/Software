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
    
    npm run protractor
