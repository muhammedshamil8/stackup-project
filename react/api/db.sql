-- Database: `task_managment_app`

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `pronounce` int NOT NULL DEFAULT '0',
  `phonenumber` int DEFAULT NULL,
  `profession` varchar(50) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `task_name` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `task_type` varchar(100) NOT NULL,
  `priority` int NOT NULL,
  `description` text NOT NULL,
  `task_progress` int NOT NULL DEFAULT '0',
  `task_done` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_project_userid` (`user_id`),
  KEY `fk_event_project` (`project_id`),
  CONSTRAINT `fk_event_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `fk_project_userid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_event` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `user_id` int NOT NULL,
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(50) NOT NULL,
  `project_description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

--
-- Table structure for table `project_user_association`
--

CREATE TABLE `project_user_association` (
  `association_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `role` int DEFAULT '0',
  `other_association_details` text,
  PRIMARY KEY (`association_id`),
  KEY `project_id` (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `project_user_association_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `project_user_association_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);



