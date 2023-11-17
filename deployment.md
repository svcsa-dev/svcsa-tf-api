# How to deploy to azure

### Rebuild the docker image

```
docker build --tag svcsa-tf-api .
```

For apple silicon
```
docker buildx build --platform linux/amd64 --tag svcsa-tf-api .
```

### Retag the docker image name

```
docker tag svcsa-tf-api svcbavideoacr.azurecr.io/svcsa-tf-api:latest
```

### Push to Azure image server

```
docker push svcbavideoacr.azurecr.io/svcsa-tf-api:latest
```

### Remove the running container

```
az container delete -n svcsa-tf-api-container -g svcsa-deploy-aci
```

### Create new container

```
az container create  --resource-group svcsa-deploy-aci --name svcsa-tf-api-container --image svcbavideoacr.azurecr.io/svcsa-tf-api:latest --dns-name-label svcsa-tf-api --ports 3030
```
