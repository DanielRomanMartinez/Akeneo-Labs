# Akeneo installation

Requires to have installed Docker

## Clone the repository

You can use your own repository where is located the project or start to do it with the Akeneo repository

```
git clone https://github.com/akeneo/pim-community-standard.git
```

## Set Port

Once cloned the project, you will see "**docker-compose.yml**", is a docker file prepared by Akeneo

, the port is determined by the variable DOCKER_PORT_HTTP. You can, therefore, set the chosen port with the command:

* In Linux / Mac
```
export DOCKER_PORT_HTTP=80
```

* In Windows

```
SET DOCKER_PORT_HTTP=80
```

## Take Remote Images

Then you take remote pictures of the docker using the command:

```
docker-compose pull
```
## Create Akeneo configuration

Now you have to take care of basic configuration options for our PIM. Copy the file with Symfony configuration:

```
cp app/config/parameters.yml.dist app/config/parameters.yml
```

Edit the file and change the parameter **index_hosts**

```
index_hosts: 'elasticsearch: 9200'
```

## Start Container

Now you can start your containers:

```
docker-compose up -d
```

## Install dependencies and initialize

After all, execute the scripts:

```
bin/docker/pim-dependencies.sh
bin/docker/pim-initialize.sh
```

## Akeneo Running

And you will see Akeneo running

![first-module.png](https://i.imgur.com/RpilyuN.png)

The credentials are: admin / admin