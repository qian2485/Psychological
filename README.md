# Psychological
这是一个心理咨询平台设计

数据库设计

专家（学生）账户设计   t_user

​	用户id：user_id

​	用户账户：user_account

​	用户密码：user_password

用户信息设计 t_user_mes

​	用户id：user_id

​	用户昵称：user_nickname

​	用户简介：user_intro

​	用户性别：user_sex

​	用户专业：user_spe

​	用户电话：user_phone

​    用户头像：user_avatar

​	【用户标签】：user_tag

​	用户联系方式：user_phone

管理员信息设计： admin

​	管理员id：admin_id

​	管理员账户：admin_account

​	管理员密码：admin_password

​	管理员名字：admin_nickname

​	管理员头像：admin_avatar

留言板模块：message

​	留言板id：mes_id

​	留言板标题：mes_title

​	留言板作者：mes_author

​	留言板内容：mes_content

公告管理模块：notice

​	公告id：notice_id

​	公告标题：notice_title

​	公告内容：notice_content

​	公告创建时间：notice_time

文章管理模块：article

​	文章id：art_id    主键

​	文章标题：art_title

​	文章头像：art_avatar

​	文章发布时间：art_create

​	文章内容：art_content

​	文章封面：art_cover

​	文章分类表（下拉框）：art_id    art_sort

心理测评管理：test

​	心理测试表单id：test_id

​	心理测试人姓名：test_name

​	心理测试成绩：test_result

​	心理测试结果（建议）：test_advise

心理咨询表：

​	专家id：

​	咨询者id：

​	专家昵称：

​	咨询者昵称：

​	聊天信息内容：



​	



​	

​	

​	

​	

​	

​	



​	









大概设计

### 一、沟通交流模板

增，删，改，查【专家列表，专家详细信息】，可以线上沟通

### 二、留言板模板

增加，删除，修改，查找，置顶

### 三、公告模板

增加，删除，修改，查找，发布，置顶

### 四、文章模板

增加，删除，修改，分类获取文章，发布【只有发布前台才能看到】，最近文章，比较受欢迎的文章，

### 五、专家团队管理

登录/注册，游客，增加，删除，修改，查找，获取用户详细信息，重置密码

### 六、心理测评管理

增加，删除，修改，查找，学生进行心理测试，查看测试结果

### 八、待完成

有关心理健康新闻

校园心理健康活动

常见问题：增加，删除，修改，查找

摘要
新世纪信息时代的来临，带来了生活压力的骤增，紧随而来的是生活节奏加快，竞争压力的增大和人际关系的紧张。每个人也面临着来自各个方面的挑战与压迫，于这种情况而引起的心理健康问题也越来越多。身处于象牙塔的大学生有着自己的独特的思想和行为，希望获取一定的成就，但可能面对问题往往考虑的过于片面，
或者不能很好的平衡生活的各个方面，很大可能引起一些偏激的行为和思想，更甚者引起严重的无法承担的后果。此文首先围绕大学生心理咨询的有关资料进行研究，以黄淮学院学生为研究对象，结合国内外的现状进行了操作可行性、技术可行性、法律可行性和经济可行性的分析与研究，然后对平台的需求进行了规划和思考，分为了几大模块：心理在线咨询、留言板、用户信息、文章、公告、心理测试、常见问题等7大模块，采用前后端分离的技术对平台的进行相关的实现和设计。该平台不同于传统意义上的心理咨询，使用面向对象的方式，采用线上心理沟通和咨询，在一定程度上避免了心理负担和线下时间冲突等问题，同时保证用户使用的安全性，让大学生在心理上得到一定的安全感，营造黄淮学院健康的心理氛围。

关键词：心理咨询；大学生；心理测试；React

**Abstract**
The advent of the information age in the new century has brought about a sudden increase in the pressure of life, followed by an accelerated pace of life, increased competitive pressure and interpersonal tension. Everyone is also faced with challenges and oppression from all sides, and the mental health problems caused by this situation are increasing. University students in the ivory tower have their own unique thoughts and behaviors, hoping to achieve certain achievements, but they may be too one-sided to consider the problems, or can not balance all aspects of life well, it is very likely to lead to some extreme behavior and thought, even more serious consequences can not afford. In this paper, first of all, based on the relevant data of psychological counseling for college students, huang-huai college students as the research object, based on the current situation at home and abroad, the operational feasibility, technical feasibility, legal feasibility and economic feasibility are analyzed and studied, and then the requirements of the platform are planned and considered, it is divided into seven modules: psychological online consultation, Message Board, user information, articles, announcements, psychological testing, common problems and so on. This platform is different from the traditional psychological consultation. It uses the object-oriented method and adopts the online psychological communication and consultation, which to a certain extent avoids the problems of psychological burden and offline time conflict, at the same time to ensure the safety of users, so that college students get a certain sense of psychological security, create a healthy psychological atmosphere huanghuai college.

Keywords: College students,psychological counseling, psychological testing,SQL Server

第一章 绪论

1.1选题意义（研究背景）

1.2国内外研究现状

​	1.2.1国内研究现状

​	1.2.2国外研究现状

1.3本文工作（研究主要内容）

1.4论文结构

第二章 系统需求分析

2.1系统概述与方式分析

​	2.1.1系统概述

​	2.1.2传统心理咨询方式分析

​	2.1.3传统心理咨询的不足

2.2可行性分析

​	2.2.1经济可行性

黄淮学院有专门设计的

​	2.2.2操作可行性

​	2.2.3技术可行性

2.3功能需求

​	2.3.1用户角色分析

​	2.3.2业务功能分析

​	2.3.3系统总用例

2.4非功能性需求

​	2.4.1环境需求

​	2.4.2性能需求

​	2.4.3安全需求

2.5本章小结

第三章 系统设计

3.1系统设计目标

3.2总体设计

3.3功能模块设计

​	3.3.1系统管理

​	3.3.2分类信息管理

​	3.3.1系统管理

​	3.3.2培训课程管理

​	3.3.3心理老师管理

​	3.3.4网上预约管理

​	3.3.5心里在线咨询

3.4数据库设计

3.5本章小结

第四章 系统实现

4.1系统前台界面实现

4.2后台登录界面实现

系统子功能实现 

4.3.1 系统管理实现

4.3.2 分类信息管理实现

4.3.3 培训课程管理实现

4.3.4 心理老师管理实现 

4.3.5 网上预约实现

4.3.6 心理在线咨询实现 

4.4本章小结

第五章 系统测试

5.1 测试原则

5.2 测试方法 

5.3 测试用例与结果 

5.4 本章小结 

第六章 总结与展望

6.1 总结

6.2 展望 

参考文献 

致 谢





 