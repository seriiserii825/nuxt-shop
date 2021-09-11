[remote "heroku"]
	url = https://git.heroku.com/nuxt-bludelego.git
	fetch = +refs/heads/*:refs/remotes/heroku/*
[branch "master"]
	remote = heroku
	merge = refs/heads/master
