# RisingArjun

A) Preconditions (Software to be installed):

1. JDK 12
2. Eclipse IDE
3. Install JHipster plugin in eclispe for JDL design
4. Install gpaphviz 2.38 version for display of ER diagrams of JDL. Higher versions of graphviz has compatability issues.
   graphviz-2.38.msi for can be installed from

https://www.softpedia.com/get/Others/Miscellaneous/Graphviz.shtml#download
Go over https://www.youtube.com/watch?v=LERTahPqVjo for eclipse JHispter plugin installation and usage.
Set environment variable GRAPHVIZ_HOT to point to dot.exe eg C:\Program Files (x86)\Graphviz2.38\bin\dot.exe
Also update PATH variable to point to Graphviz bin folder eg C:\Program Files (x86)\Graphviz2.38\bin\

5. maven for build
6. node
7. Git client for code checkin/pull from Github
8. Project uses Mariadb. So install it with user name and password set as root, root.Create database with name RisingArjun
   DB should be up and running on 3306.

B)Additional Steps

Refer below sites for creating dev environment

1. https://www.jhipster.tech/video-tutorial/

2. https://www.jhipster.tech/creating-an-app/

3) https://github.com/mraible/jhipster6-demo/blob/master/demo.adoc
