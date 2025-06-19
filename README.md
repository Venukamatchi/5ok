```
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo docker run -d --name mongodb -p 27017:27017 mongo:5.0
sudo docker exec -it mongodb mongosh
```

```
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

sudo docker run -d --name mongodb -p 27017:27017 mongo:5.0

sudo docker cp ~/Desktop/py/chunks mongodb:/chunks

sudo docker exec -it mongodb bash

ls /chunks

1. mongoimport --db securin --collection recipes --jsonArray --file /chunks/chunk_1.json
2. for f in /chunks/chunk_*.json; do
  echo "📤 Importing $f"
  mongoimport --db securin --collection recipes --jsonArray --file "$f"
done


mongosh
use securin
db.recipes.count()
db.recipes.find().limit(3).pretty()
db.recipes.drop()


 
```
