TRUNCATE TABLE app."Category" RESTART IDENTITY;

INSERT INTO app."Category"("Name")
VALUES 
('Amazon Instant Video'),
('Appliances'),
('Apps and Games'),
('Arts, Crafts and Sewing'),
('Automotive'),
('Baby'),
('Beauty'),
('Books'),
('CDs and Vinyl'),
('Clothing, Shoes and Jewelry'),
('Cell Phones and Accessories'),
('Collectibles and Fine Art'),
('Computers'),
('Credit and Payment Cards'),
('Digital Music'),
('Electronics'),
('Gift Cards'),
('Grocery and Gourmet Food'),
('Health and Personal Care'),
('Home and Kitchen'),
('Industrial and Scientific'),
('Kindle Store'),
('Luggage and Travel Gear'),
('Magazine Subscriptions'),
('Movies and TV'),
('Musical Instruments'),
('Office Products'),
('Patio, Lawn and Garden'),
('Pet Supplies'),
('Prime Pantry'),
('Software'),
('Sports and Outdoors'),
('Tools and Home Improvement'),
('Toys and Games'),
('Video Games'),
('Wine');


INSERT INTO app."Category"("Name", "ParentCategoryId")
VALUES 
('Women', 10),
('Men', 10),
('Girls', 10),
('Boys', 10),
('Baby', 10);

