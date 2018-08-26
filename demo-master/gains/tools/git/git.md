# 问题

1.git成型。
1.1上传
1.2更新远程代码。
1.3有冲突。
1.4本地分支和外地分支。

git pull error 
http://blog.csdn.net/byoooy/article/details/52263404


github本身不可以提交空文件夹。那么就需要使空文件夹不为空。
命令行进入工程目录下，输入下面这句话：
find . -type d -empty -exec touch {}/.gitignore \;


---------------------------------git------------------------------------
$ git clone <版本库的网址> <本地目录名>

$ git remote -v

更新
$ git pull <远程主机名> <远程分支名>:<本地分支名>
---------------------------------远程分支是与当前分支合并，则冒号后面的部分可以省略
git pull=git fetch+git merge。
$ git pull origin next
$ git fetch origin
$ git merge origin/next

$ git push <远程主机名> <本地分支名>:<远程分支名>
推送到服务器
git push ssh://example.com/~/www/project.git

更新到指定的url。
git pull http://git.example.com/project.git

新建分支git branch test
切换分支git checkout test	
删除分支git branch -d test
-----------------------------------------------------------------------

Untracked files
Changes not staged for commit
Changes to be committed

-----------------------------------------------------------------------
ssh-keygen -t rsa -C "2500119617@qq.com" 

git config --global user.name "2500119617"
git config --global user.email "2500119617@qq.com"

git clone git@github.com:yuanzihtml/course-webapp.git

cd course-webapp
----------------------------master
git status

git add .

git status

git commit -a -m "innit project"

git status

git push



git branch
git checkout -b (branch name)



  

git remote add origin git@github.com:yuanzihtml/yuanzihtml..github.io.git