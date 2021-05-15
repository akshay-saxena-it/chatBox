# chatBox
Real time chat application using nodeJs and socket.io



# Create database
CREATE DATABASE chat

# For using database
use chat
 
# Create a table
CREATE TABLE `chat`.`chat_users` (
  `user_id` INT NOT NULL,
  `user_name` VARCHAR(45) NULL,
  `user_full_name` VARCHAR(45) NULL,
  `user_image` VARCHAR(45) NULL,
  `user_password` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `chat_userscol_UNIQUE` (`user_name` ASC) VISIBLE)

# Insert users data
INSERT INTO `chat`.`chat_users` (`user_id`, `user_name`, `user_full_name`, `user_image`) VALUES ('3', 'user3', 'user3', 'user.jpg')
INSERT INTO `chat`.`chat_users` (`user_id`, `user_name`, `user_full_name`, `user_image`, `user_password`) VALUES ('1', 'user1', 'user1', 'user.jpg', '123')
INSERT INTO `chat`.`chat_users` (`user_id`, `user_name`, `user_full_name`, `user_image`, `user_password`) VALUES ('2', 'user2', 'user2', 'user.jpg', '123')
