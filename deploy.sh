echo 'Deploy Start !' &&
cd /home/winter/remix-blog/ &&
git pull &&
docker-compose up -d --build &&
echo 'Deploy Succeed !'

