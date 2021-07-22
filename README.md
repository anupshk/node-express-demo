# node-express-demo

Demo app using Node, Express

## Run

    $ docker volume create --name=nodeweb_data
    $ docker-compose up
    $ docker-compose exec web sequelize db:migrate
    $ docker-compose exec web sequelize db:seed:all

Browse <http://localhost:10004>